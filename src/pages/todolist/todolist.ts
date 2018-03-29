import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray, AlertController } from 'ionic-angular';
import {MyService} from '../../providers/my-service';
import { HomePage } from '../home/home';
import {AddEventPage} from '../add-event/add-event';
import {EditReminderPage} from '../edit-reminder/edit-reminder';


/**
 * Generated class for the TodolistPage page.
 *
 * lists any reminders set with the category type of todo
 * users can change the order of their to do items as well as remove
 *  or mark as completed
 */

@IonicPage()
@Component({
  selector: 'page-todolist',
  templateUrl: 'todolist.html',
})
export class TodolistPage {

  checkList = [];
  eventID: any;
  eventList: string;
  eventData: any;
  eventName: string;
  eventDescription: string;
  category: string;
  username: string;
  userId: string;
  todoCompleted: string;
  message: string;
  noItems: boolean = true;
  complete: boolean = false;
  itemChecked: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public mySvc: MyService) {
      this.eventData = {};
      this.eventData.eventName = "";
      this.eventData.eventDescription = "";     
      this.eventList = "";

  }


  ionViewDidEnter() {
     //******************************************************
        // Reload ToDo List 
         
         // this.checkList = [];   
         
          this.eventData.eventName = "";
           this.eventData.eventDescription = "";
           this.eventData.startDate = "";
           this.eventData.complete = false;
          this.eventList = "";
          this.category = "todo";
         // this.username = this.mySvc.getUsername();
         this.mySvc.getUsername().then((username) => {
          this.username = username;          
        });
         if (this.checkList.length == 0 ) {
          this.userId = this.mySvc.getUserID();
          //this.category = "all";
         console.log("ReminderList onPageWillEnter");
          this.mySvc.getEvents(this.username, this.userId, this.category)
              .subscribe(
                  (response) => {                 
                      this.checkList = response;                   
                      console.log("ToDoList: " + JSON.stringify(response));
                      this.complete = false;
                     
                      this.noItems = false;
                  }, (error) => {             
                      console.log("ERROR: ", error);   
            });   
        //*****************************************************************
         }
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodolistPage');
  }

  Logout() {
    this.navCtrl.push(HomePage, {userLoggedIn: false});
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Update',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  doneItem(eventID, isChecked) {
    //console.log("Done button clicked!");
    if (isChecked) {
        this.eventID = eventID;    
        this.complete = true;    
    
        this.userId = this.mySvc.getUserID(); 
        this.mySvc.getUsername().then((username) => {
          this.username = username;          
        });
        this.mySvc.todoItemDone(this.eventID, this.userId)
          .subscribe(
          (response) => { 
            console.log("ToDo Item Marked completed!");
            //******************************************************
            // Reload reminders  
            this.eventData = {}; 
            this.checkList = [];             
            this.eventData.eventName = "";
            this.eventData.eventDescription = "";
            this.eventData.startDate = "";
            this.eventList = "";
         
            this.userId = this.mySvc.getUserID();
            this.category = "todo";
        
            this.mySvc.getEvents(this.username, this.userId, this.category)
              .subscribe(
                  (response) => {                 
                      this.checkList = response;                   
                      //console.log("Reminders: " + JSON.stringify(response));
                      this.showAlert("Todo Item marked completed!")
                  }, (error) => {             
                      console.log("ERROR: ", error);   
                  });   
            //*****************************************************************
            }, (error) => {             
                console.log("ERROR: ", error);   
            }); 
    }
  }

  reorderItems(indexes){
        this.checkList = reorderArray(this.checkList, indexes);
    }


  getItemsCount(): number {
        let count= 0;
        this.checkList.forEach((item) => {
            if(item.checked){
                count++;
            }
        });
        return count;
    }

  removeItem(eventID) {
    this.eventID = eventID;
    console.log("Remove EventID: " + this.eventID);
    this.userId = this.mySvc.getUserID(); 
    this.mySvc.getUsername().then((username) => {
          this.username = username;          
      });
    this.mySvc.removeReminder(this.eventID, this.userId)
      .subscribe(
      (response) => { 
        console.log("Reminder Deleted!");
        //******************************************************
        // Reload reminders  
          this.eventData = {}; 
          this.checkList = [];             
          this.eventData.eventName = "";
           this.eventData.eventDescription = "";
           this.eventData.startDate = "";
          this.eventList = "";
         
          this.userId = this.mySvc.getUserID();
          //this.category = "all";
        
          this.mySvc.getEvents(this.username, this.userId, this.category)
              .subscribe(
                  (response) => {                 
                      this.checkList = response;                   
                      //console.log("Reminders: " + JSON.stringify(response));
                      
                  }, (error) => {             
                      console.log("ERROR: ", error);   
            });   
        //*****************************************************************
      }, (error) => {             
          console.log("ERROR: ", error);   
      }); 
    
  }

  removeItems(eventID) {
    this.eventID = eventID;
    console.log("Remove EventID: " + this.eventID);
    this.userId = this.mySvc.getUserID(); 
    this.mySvc.getUsername().then((username) => {
          this.username = username;          
      });
    this.mySvc.removeReminder(this.eventID, this.userId)
      .subscribe(
      (response) => { 
        console.log("Reminder Deleted!");
        //******************************************************
        // Reload reminders  
          this.eventData = {}; 
          this.checkList = [];             
          this.eventData.eventName = "";
           this.eventData.eventDescription = "";
           this.eventData.startDate = "";
          this.eventList = "";
         
          this.userId = this.mySvc.getUserID();
          //this.category = "all";
        
          this.mySvc.getEvents(this.username, this.userId, this.category)
              .subscribe(
                  (response) => {                 
                      this.checkList = response;                   
                      //console.log("Reminders: " + JSON.stringify(response));
                      
                  }, (error) => {             
                      console.log("ERROR: ", error);   
            });   
        //*****************************************************************
      }, (error) => {             
          console.log("ERROR: ", error);   
      }); 
    
  }

}
