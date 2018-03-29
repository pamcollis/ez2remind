import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MyService } from '../../providers/my-service';
import { HomePage } from '../home/home';
import { AddEventPage } from '../add-event/add-event';
import { EditReminderPage } from '../edit-reminder/edit-reminder';
import { SettingsPage } from '../settings/settings';


/*
  Generated class for the ReminderListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'reminder-list.html',
})
export class ReminderListPage {
  

  eventData: any;
  eventName: string;
  eventDescription: string;
  eventDate: any;
  evList = [];
  monthData = [];
  yearData = [];
  eventList: string;
  eventID: any;
  //users= [];
  userId: any;
  username: any;
  i: any;
  categoryList = [];
  filterList = [];
  monthList = [];
  yearList = [];
  category: string;
  filter: string;
  selectedCategory = [];

  constructor(private navCtrl: NavController, private params: NavParams, public mySvc: MyService, public alertCtrl: AlertController) {
    
    this.eventData = {};
    
    this.eventData.eventName = "";
    this.eventData.eventDescription = "";
    this.eventData.startDate = "";
    this.eventList = "";
    

    this.categoryList = [      
      {id: 'all', title: 'All'},
      {id: 'general', title: 'General'},
      {id: 'todo', title: 'To Do'},
      {id: 'appt', title: 'Appointments'},
      {id: 'birthday', title: 'Birthdays'},
      {id: 'special', title: 'Special (Anniversay etc)'}
    ]

    this.filterList = [
      {id: 'day', title: 'Day'},
      {id: 'week', title: 'Week'},
      {id: 'month', title: 'Month'}
    ]

    this.monthList = [
      {id: '01', title: 'January'},
      {id: '02', title: 'February'},
      {id: '03', title: 'March'},
      {id: '04', title: 'April'},
      {id: '05', title: 'May'},
      {id: '06', title: 'June'},
      {id: '07', title: 'July'},
      {id: '08', title: 'August'},
      {id: '09', title: 'September'},
      {id: '10', title: 'October'},
      {id: '11', title: 'November'},
      {id: '12', title: 'December'}

    ]
    
    this.yearList = [
      {id: '2017'},
      {id: '2018'},
      {id: '2019'},
      {id: '2020'},
      {id: '2021'},
      {id: '2022'},
      {id: '2023'},
      {id: '2024'},
      {id: '2025'},
      {id: '2026'},
      {id: '2027'},
      {id: '2028'},
      {id: '2029'},
      {id: '2030'},
      {id: '2031'},
      {id: '2032'},
      {id: '2033'},
      {id: '2034'},
      {id: '2035'}

    ]

  }
    
 

  ionViewDidEnter() {
     //******************************************************
        // Reload reminders  
          this.eventData = {};
          this.evList = [];   
          this.monthData = [];
          this.yearData = [];
          this.eventData.eventName = "";
          this.eventData.eventDescription = "";
          this.eventData.startDate = "";
          this.eventList = "";
          this.category = "all";         
          this.mySvc.getUsername().then((username) => {
          this.username = username;          
        });
         
          this.userId = this.mySvc.getUserID();         
          console.log("ReminderList onPageWillEnter");
          this.mySvc.getEvents(this.username, this.userId, this.category)
              .subscribe(
                  (response) => {                 
                      this.evList = response;                   
                      //console.log("Reminders: " + JSON.stringify(response));
                      this.convertData(response); 
                      console.log("After convertData");
                  }, (error) => {             
                      console.log("ERROR: ", error);   
            });   
        //*****************************************************************
  }
  
  

  Logout() {
    this.navCtrl.push(HomePage, {userLoggedIn: false});
  }

  //function invoked when user selects new category from list
  selectCategory(catId: string) {
    this.username = this.mySvc.getUsername();
    this.userId = this.mySvc.getUserID();
    this.category = catId;
    console.log("Cat Chg Parameters: " + this.username + ", " + this.userId + ", " + this.category);
    
    // create arrays for each month for each of the years in the yearList array
    //  the arrays will be used to list reminders by month and year
    for (var i=0; i < this.yearList.length; i++) {
      let yr = this.yearList[i].id;
      
      this.monthData['01' + yr] = [];
      this.monthData['02' + yr] = [];
      this.monthData['03' + yr] = [];
      this.monthData['04' + yr] = [];
      this.monthData['05' + yr] = [];
      this.monthData['06' + yr] = [];
      this.monthData['07' + yr] = [];
      this.monthData['08' + yr] = [];
      this.monthData['09' + yr] = [];
      this.monthData['10' + yr] = [];
      this.monthData['11' + yr] = [];
      this.monthData['12' + yr] = [];
      
    }

    //retrieve reminders from database and then parse each reminder into
    //  appropriate year/month array by calling convertData function
    
    this.mySvc.getEvents(this.username, this.userId, this.category)
        .subscribe(
            (response) => {                 
                this.evList = response;
                this.convertData(response);   
                console.log("Chg Category: " + JSON.stringify(response));
            }, (error) => {             
                console.log("ERROR: ", error);  
      });   
  }

 

  convertData(data) { 
       
    data.forEach( (event) => { 
      let sDate = event.startDate.split('/');
      let monthNumber = sDate[0];
      let yearNumber = sDate[2].substring(0, 4);
      let mnYrNumber = sDate[0] + sDate[2].substring(0, 4);
      //console.log("mnYrNumber= " + mnYrNumber);     
      
      if (this.yearData[yearNumber] == null||undefined ) { 
        this.yearData[yearNumber] = []; 
      } 
      if (this.monthData[mnYrNumber] == null||undefined ) { 
        this.monthData[mnYrNumber] = []; 
      } 
      
      this.monthData[mnYrNumber].push(event); 
      
      //console.log("MonthData=" + JSON.stringify(this.monthData[mnYrNumber]));
    });
  }

  changeFilter(filterId: string) {
    this.username = this.mySvc.getUsername();
    this.userId = this.mySvc.getUserID();
    this.filter = filterId;
  }

  

  AddEvent() {
      this.navCtrl.push(AddEventPage);
    }

  editItem(eventID) {
    
    this.eventID = eventID;    
    this.navCtrl.push(EditReminderPage, {eventID: this.eventID});
  }

  removeItem(eventID) {
    this.eventID = eventID;
    console.log("Remove EventID: " + this.eventID);
    this.userId = this.mySvc.getUserID(); 
    
    this.mySvc.removeReminder(this.eventID, this.userId)
      .subscribe(
      (response) => { 
        console.log("Reminder Deleted!");
        //******************************************************
        // Reload reminders  
          this.eventData = {}; 
          this.evList = [];   
          this.monthData = [];
          this.yearData = [];
          this.eventData.eventName = "";
           this.eventData.eventDescription = "";
           this.eventData.startDate = "";
          this.eventList = "";
          this.username = this.mySvc.getUsername();
          this.userId = this.mySvc.getUserID();
          //this.category = "all";
        
          this.mySvc.getEvents(this.username, this.userId, this.category)
              .subscribe(
                  (response) => {                 
                      this.evList = response;                   
                      //console.log("Reminders: " + JSON.stringify(response));
                      this.convertData(response); 
                      console.log("After convertData");
                  }, (error) => {             
                      console.log("ERROR: ", error);   
            });   
        //*****************************************************************
      }, (error) => {             
          console.log("ERROR: ", error);   
      }); 
    
      
   
  }

}
