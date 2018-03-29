import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import {MyService} from '../../providers/my-service';
import {ReminderListPage} from '../reminder-list/reminder-list';
import { HomePage } from '../home/home';
import moment from 'moment';


@Component({
  selector: 'page-addevent',
  templateUrl: 'add-event.html'
 
})

export class AddEventPage {
  eventData: any;
  returnedData = [];
  eventItems: string;
  userInfo= [];
  users = [];
  //userInfo: User[];
  remindList = []; repeatList=[]; categoryList = [];
  username: string;
  userId: any;
  getUser: string;
  data: string;
  eventName: string; eventDesc: string; category: string;  remindWhen: any; repeat: any;
  eventTime= new Date();
  startDate: string; 
  endDate: string;
  pickDate: string;
  email: string; phoneNumber: string;
  emailConfirmed: boolean;
  phoneConfirmed: boolean;
  emailReminder: any;
  textReminder: any;
  alerted: boolean;
  shouldHide: boolean = true;
  showCalendar: boolean = false;
  changeEndDate: boolean = false;
  currDate: string;
  preselectedDate: string;
  minDate: string = '';
  maxDateStr: string = '';
  maxDate= new Date();
  
  //calendar variables
  eventSource;
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date()   
  };
  calendar2 = {
    mode: 'month',
    currentEndDate: new Date()    
  };

  constructor(public navController: NavController, public params: NavParams, 
            public alertCtrl: AlertController, public mySvc: MyService, private viewCtrl: ViewController
              ) {
    
    
    this.preselectedDate = moment(this.params.get('selectedDay')).format();

    this.users = this.mySvc.getUserInfo();
    this.eventData = {};    
    
    this.alerted = false;
    this.eventData.eventName = "";
    this.eventData.eventDescription = "";    
    this.eventData.remindWhen = "";
    
    this.eventData.repeat = "";
    this.userId = this.mySvc.getUserID;
    this.eventData.email = "";    
    this.eventData.phoneNumber = "";    
    this.emailConfirmed = true;
    this.phoneConfirmed = true;
    //this.eventData.startDate = new Date().toISOString();
   // this.eventData.endDate = new Date().toISOString();
    this.calendar.currentDate = new Date();
    
    
    this.currDate = new Date().toISOString();
    let today = new Date();
    this.minDate = today.toISOString();
    this.maxDate = today;
    this.maxDate.setFullYear(today.getFullYear()+6);    
    
    this.maxDateStr = "2023-10-25";
    
    this.categoryList = [
      {id: 'general', title: 'General'},
      {id: 'todo', title: 'To Do'},
      {id: 'appt', title: 'Appointments'},
      {id: 'birthday', title: 'Birthdays'},
      {id: 'special', title: 'Special (Anniversay etc)'}
    ]

    this.remindList = [
      {id: 'none', title: 'No Reminder'},
      {id: '0M', title: 'At Event Time'},
      {id: '15M', title: '15 Minutes Before'},
      {id: '30M', title: '30 Minutes Before'},
      {id: '1H', title: 'One Hour Before'},
      {id: '2H', title: 'Two Hours Before'},
      {id: '3H', title: 'Three Hours Before'},
      {id: '4H', title: 'Four Hours Before'},
      {id: '1D', title: 'One Day Before'},
      {id: '2D', title: 'Two Days Before'},
      {id: '3D', title: 'Three Days Before'},
      {id: '4D', title: 'Four Days Before'},
      {id: '1W', title: 'One Week Before'},
      {id: '2W', title: 'Two Weeks Before'},
      {id: '3W', title: 'Three Weeks Before'}
    ]
    
    this.repeatList = [
      {id: 'none', title: 'No Repeat', checked:"true"},
      {id: 'daily', title: 'Daily', checked: 'false'},
      {id: 'weekly', title: 'Weekly', checked: 'false'},
      {id: 'monthly', title: 'Monthly', checked: 'false'},
      {id: 'yearly', title: 'Yearly', checked: 'false'}
    ]


    
  }    /*  end of constructor  */

  
    
  presentAlert(field) {
    let alert = this.alertCtrl.create({
      title: 'Required',
      subTitle: 'Please set a value for this option, ' + field,
      buttons: ['OK']
    });
    alert.present();
  }
  
  onPageWillEnter() {
    this.eventData = {};    
    
    this.eventData.eventName = "";
    this.eventData.eventDescription = "";    
    this.eventData.remindWhen = "";
    this.eventData.repeat = "none";
    this.userId = this.mySvc.getUserID;
    this.eventData.email = "";    
    this.eventData.phoneNumber = "";    
    this.emailConfirmed = true;
    this.phoneConfirmed = true;
    if (this.preselectedDate != "") {
      this.eventData.startDate = this.preselectedDate;
    } else {
      this.eventData.startDate = new Date().toISOString();
    }
    this.pickDate = new Date().toISOString();
    this.eventData.endDate = "";
    this.userId = this.mySvc.getUserID();
    this.eventData.email = this.mySvc.getEmail();    
    this.emailConfirmed = true;
    this.phoneConfirmed = true;
    this.eventData.phoneNumber = this.mySvc.getPhoneNumber();
  }

  //  set initial form field values on page
  ngAfterViewInit() {
    this.eventData = {};    
    
    this.eventData.eventName = "";
    this.eventData.eventDescription = "";    
    this.eventData.remindWhen = "";
    this.eventData.repeat = "";
    this.userId = this.mySvc.getUserID;
    this.eventData.email = "";    
    this.eventData.phoneNumber = "";    
    this.emailConfirmed = true;
    this.phoneConfirmed = true;
    this.eventData.startDate = new Date().toISOString();
    this.eventData.endDate = "";
    this.userId = this.mySvc.getUserID();
    this.eventData.email = this.mySvc.getEmail();    
    this.emailConfirmed = true;
    this.phoneConfirmed = true;
    this.eventData.phoneNumber = this.mySvc.getPhoneNumber();

  }

  Logout() {
    this.navController.push(HomePage, {userLoggedIn: false});
  }

   @ViewChild('datePicker') datePicker;     
     open() {
         this.eventData.endDate = new Date().toISOString();         
         this.datePicker.open();        
    }

   
  onChangeStartDate(event:Date) {
    this.showCalendar = true;
  }
  onChangeEndDate(event:Date) {    
    this.shouldHide = false;
    this.changeEndDate = true;
    
    //this.eventData.endDate = new Date().toISOString();
    
  }
  
  
  clearEndDate() {
    this.eventData.endDate = "";
    this.shouldHide = true;
    this.changeEndDate = false;
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
        if (this.changeEndDate) {
         // this.eventData.endDate = event.toISOString();
          
        } else {
          this.eventData.startDate = event.toISOString();
          console.log("Change Start Date=" + this.eventData.startDate);
        }
    }
    onEndDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
        this.eventData.endDate = event.toISOString();
        console.log("Change End Date=" + this.eventData.endDate);
    }
    
    //  the following code is currently unused by the application
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
 
  //  add new reminder to database; notifications will be set up in server-side code
  onSubmit() {
    if (this.eventData.repeat == "") { this.eventData.repeat = "None"; };
    this.userId = this.mySvc.getUserID();
    this.eventName = this.eventData.eventName;
    this.eventDesc = this.eventData.eventDescription;
    this.category = this.eventData.category;
    this.startDate = this.eventData.startDate;
    this.endDate = this.eventData.endDate;
    this.eventTime = this.eventData.eventTime;
    this.remindWhen = this.eventData.remindWhen;
    this.repeat = this.eventData.repeat;
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
    if (this.remindWhen == "") { this.remindWhen = 'none';}
    this.alerted = false;
    /*let userId = this.eventData.userId;
    let eventName = this.eventData.eventName;
    let eventDescription = this.eventData.eventDescription;
    let category = this.eventData.category;
    let startDate = this.eventData.startDate;
    let endDate = this.eventData.endDate;
    let eventTime = this.eventData.eventTime;
    let remindWhen = this.eventData.remindWhen;    
    let repeat = this.eventData.repeat;  */
    
    // If a recurring reminder type is selected make sure the
    //  user has selected an EndDate
    
    // If repeat is not 'none' then check for End Date value
     if (this.repeat != 'None' && this.endDate == "") {
       //create popup message
       this.presentAlert('End Date');
       this.alerted = true;
       console.log("repeat= " + this.repeat);
     }
     
     //console.log("event time: " + this.eventTime)
     if (this.eventTime == undefined) {
       this.presentAlert('Event Time must be selected');
       this.alerted = true;
     }
    //************************************************************

    //console.log("Email Reminder=" + this.emailReminder);
    if (!this.alerted) {
     this.mySvc.addEvent(this.eventName, this.userId, this.eventDesc, this.category, this.startDate, this.endDate, this.eventTime, this.remindWhen, this.repeat, this.emailReminder, this.textReminder)
    // this.mySvc.addEvent(this.userId, this.eventName)         
        .subscribe(
          (response) => {         
            console.log("AddEvent Response: " + JSON.stringify(response));
            this.returnedData = response;  
            this.eventData = {};    
            
            //  reset form fields
            this.eventData.eventName = "";
            this.eventData.eventDescription = "";    
            this.eventData.remindWhen = "";
            this.eventData.repeat = "";
            this.userId = this.mySvc.getUserID;
            this.eventData.email = "";    
            this.eventData.phoneNumber = "";    
            this.emailConfirmed = true;
            this.phoneConfirmed = true;
            this.eventData.startDate = new Date().toISOString();
            this.eventData.endDate = "";
            this.userId = this.mySvc.getUserID();
            this.eventData.email = this.mySvc.getEmail();    
            this.emailConfirmed = true;
            this.phoneConfirmed = true;
            this.eventData.phoneNumber = this.mySvc.getPhoneNumber();  
            
            //Navigate to Reminder List page
            this.navController.setRoot(ReminderListPage);
            
        }, (error) => {             
            console.log("ERROR: ", error);   
        });   
    };
    
  };

  

}
