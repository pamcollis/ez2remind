import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MyService} from '../../providers/my-service';
import {ReminderListPage} from '../reminder-list/reminder-list';
import moment from 'moment';
import { MultiPickerModule } from 'ion2-datetime-picker';
/*
  Generated class for the EditReminder page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-reminder',
  templateUrl: 'edit-reminder.html'
})

export class EditReminderPage {
  
  eventData: any;
  returnedData = [];
  categoryList = [];
  itemCategory: string;
  eventItems: string;
  userInfo= [];
  users = [];
  //userInfo: User[];
  remindList = []; repeatList=[]; 
  remindTimes: string;
  repeatItem: string;
  repeatType: string;
  repeatID: string;
  whenString: string;
  remData: any;
  setReminderTimes: any;
  //remName: any; remDesc: string; remWhen: any; rStartDate = new Date(); remTime = new Date();
  username: string;
  userId: any;
  getUser: string;
  data: string;
  eventId: any;
  eventName: string; eventDesc: string; category: string;  remindWhen: any; repeat: any;
  eventTime: any;
  startDate: string;
  endDate: string;
  emailConfirmed: boolean;
  phoneConfirmed: boolean;
  emailReminder: any;
  textReminder: any;
  returnValues: any;
  shouldHide: boolean = true;
  i: number; idx: number;
   //calendar variables
  eventSource;
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public mySvc: MyService) {

    
    this.eventId = navParams.get('eventID');
    console.log("EventID: " + this.eventId);
   // this.startDate = navParams.get('startDate');
    this.eventData = {}; 
    this.remData = {};       
    this.eventData.userId = 0;
    this.eventData.eventName = "";
    this.remData.eventName = "";
    this.remData.eventDesc = "";
    this.remData.startDate = new Date();
    this.remData.endDate = "";
    this.remData.email = "test";
    this.remData.phone = "1234";
    this.eventData.eventDescription = "";       
    this.eventData.remindWhen = "";
    this.eventData.repeat = "none";
    this.eventData.repeatType = "";
    this.userId = this.mySvc.getUserID();
    this.calendar.currentDate = new Date();
    
    this.categoryList = [
      {id: 'general', title: 'General', selected: true},
      {id: 'todo', title: 'To Do', selected: false},
      {id: 'appt', title: 'Appointments', selected: false},
      {id: 'birthday', title: 'Birthdays', selected: false},
      {id: 'special', title: 'Special (Anniversay etc)', selected: false}
    ]

    this.remindList = [
      {id: 'none', title: 'No Reminder', selected: false},
      {id: '0M', title: 'At Event Time', selected: false},
      {id: '15M', title: '15 Minutes Before', selected: false},
      {id: '30M', title: '30 Minutes Before', selected: true},
      {id: '1H', title: 'One Hour Before', selected: false},
      {id: '2H', title: 'Two Hours Before', selected: false},
      {id: '3H', title: 'Three Hours Before', selected: false},
      {id: '4H', title: 'Four Hours Before', selected: false},
      {id: '1D', title: 'One Day Before', selected: false},
      {id: '2D', title: 'Two Days Before', selected: false},
      {id: '3D', title: 'Three Days Before', selected: false},
      {id: '4D', title: 'Four Days Before', selected: false},
      {id: '1W', title: 'One Week Before', selected: false},
      {id: '2W', title: 'Two Weeks Before', selected: false},
      {id: '3W', title: 'Three Weeks Before', selected: false}
    ]
    
    this.repeatList = [
      {id: 'none', name:'N', title: 'No Repeat', selected:true},
      {id: 'daily', name: 'D', title: 'Daily', selected: false},
      {id: 'weekly', name: 'W', title: 'Weekly', selected: false},
      {id: 'monthly', name: 'M', title: 'Monthly', selected: false},
      {id: 'yearly', name: 'Y', title: 'Yearly', selected: false}
    ]

    
  }  // end of constructor

  ionViewDidLoad() {
    
    this.userId = this.mySvc.getUserID();    

    //console.log("PreLoad Info = " + this.userId + ", " + this.eventId);
    this.mySvc.loadReminder(this.eventId, this.userId)
      .subscribe(
      (details) => {         
          console.log("DB reminder Details: " + JSON.stringify(details));
          this.eventData = details;    
          this.remData.email = this.eventData[0].email;
          this.remData.phone = this.eventData[0].phone;
          this.remData.eventName = this.eventData[0].eventName;
          this.remData.eventDesc = this.eventData[0].eventDesc;
          this.remData.category = this.eventData[0].category;
          this.remData.startDate = this.eventData[0].startDate;          
          this.remData.startDate = new Date(this.remData.startDate).toISOString();  
          
          if (this.eventData[0].endDate != null) {
            this.remData.endDate = this.eventData[0].endDate;
            this.remData.endDate = new Date(this.remData.endDate).toISOString();
          }
          //this.remData.endData = this.remData.endDate;
          //set time
          this.remData.eventTime = this.eventData[0].startDate;
          this.remData.eventTime = new Date(this.remData.startDate).toISOString();         
          this.remData.eventTime = moment(this.remData.eventTime).format();
         
          this.textReminder = this.eventData[0].text_self;
          this.emailReminder = this.eventData[0].email_self;
         
          
          if (this.emailReminder != "Y") {
            this.emailConfirmed = false;
          } else {
            this.emailConfirmed = true;
          }
          if (this.textReminder != "Y") {
            this.phoneConfirmed = false;
          } else {
            this.phoneConfirmed = true;
          }
        
          this.itemCategory = JSON.stringify(this.eventData[0].category); 
          this.remindTimes = JSON.stringify(this.eventData[0].interval); 
          this.repeatItem = this.eventData[0].repeatType;
          
                  
          this.remData.remindWhen = this.eventData[0].interval;
          this.remData.repeat = this.eventData[0].repeatType;
         
         //  Set item category as selected

         for(this.i = 0; this.i < this.categoryList.length; this.i++) {   
            if(this.itemCategory.indexOf(this.categoryList[this.i].id) > -1) {
              this.categoryList[this.i].selected = "true";
              console.log(this.categoryList[this.i].title + " selected");
            }
          }
          //  Set item Remind option as selected
          for(this.i = 0; this.i < this.remindList.length; this.i++) { 
            if(this.remindTimes.indexOf(this.remindList[this.i].id) > -1) {
              this.remindList[this.i].selected = "true";              
              console.log(this.remindList[this.i].title + " selected");
            }
          }

          //  Set item Repeat option as selected
          for(this.i = 0; this.i < this.repeatList.length; this.i++) { 
            if(this.repeatItem.indexOf(this.repeatList[this.i].name) > -1) {
              this.repeatList[this.i].selected = "true";
              this.remData.repeat = this.repeatList[this.i].id;
              console.log(this.repeatList[this.i].title + " selected");
            }
          }
          if (this.repeat == 'N') { this.repeat = "none"};
          if (this.repeat == 'n') { this.repeat = "none"};

      }, (error) => {             
          console.log("ERROR: ", error);  
      });    
  }  // end of ionViewDidLoad

  onChangeEndDate() {
    this.shouldHide = false;
  }
  clearEndDate() {    
    this.shouldHide = true;
    this.remData.endDate = "";
  }

   //******************************************************************************************************
  // calendar functions
  loadEvents() {
        this.eventSource = this.createRandomEvents();
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }
    changeMode(mode) {
        this.calendar.mode = mode;
    }
    today() {
        this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }
    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
        this.remData.startDate = event.toISOString();
        console.log("Change Start Date=" + this.remData.startDate);
    }
    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }
    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }
    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };
    //********************************************************************************************
  
  
  onSubmit() {
    if (this.remData.repeat == "") { this.remData.repeat = "none"; };
    this.userId = this.mySvc.getUserID();
    this.eventName = this.remData.eventName;
    this.eventDesc = this.remData.eventDesc;
    this.category = this.remData.category;
    this.startDate = this.remData.startDate;
    this.startDate = moment(this.startDate).format("MM/DD/YYYY");
    this.endDate = this.remData.endData;
    if (this.remData.endDate != "") {
      this.endDate = moment(this.remData.endDate).format("MM/DD/YYYY");
    }
    this.eventTime = this.remData.eventTime;
    this.eventTime = moment(this.eventTime).format("hh:mm A");
    this.remindWhen = this.remData.remindWhen;
    //this.repeat = this.remData.repeat;
    this.repeat = this.remData.repeat;
    
    if (this.emailConfirmed = true) {
      this.emailReminder = "Y";
    } else {
      this.emailReminder = "N";
    };
    if (this.phoneConfirmed = true) {
      this.textReminder = "Y";
    } else {
      this.textReminder = "N";
    };
    
    let userId = this.remData.userId;
    let eventName = this.remData.eventName;
    let eventDescription = this.remData.eventDesc;
    let startDate = this.startDate;
    let endDate = this.endDate;
    let eventTime = this.remData.eventTime;
    let remindWhen = this.remData.remindWhen;    
    let repeat = this.remData.repeat;
    console.log("PreUpload-remData.repeat=" + this.repeat);
    
    
    this.mySvc.updateReminder(this.eventId, this.eventName, this.userId, this.eventDesc, this.category, this.startDate, this.endDate, this.eventTime, this.remData.remindWhen, this.remData.repeat, this.emailReminder, this.textReminder)
 
      .subscribe(
        (response) => {   
          console.log("Update reminder Details: " + JSON.stringify(response));
          this.returnedData = response;    
          this.navCtrl.push(ReminderListPage);
      }, (error) => {             
          console.log("ERROR: ", error);  
      });   

  };   // end of onSubmit

  

};  // end of class
