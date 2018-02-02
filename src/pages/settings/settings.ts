import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, ToastController } from 'ionic-angular';

import {SQLite} from '@ionic-native/sqlite';
import {FormBuilder,  Validators, AbstractControl } from '@angular/forms';
//import {CustomValidators} from '../../providers/customvalidators';
import {AddEventPage} from '../add-event/add-event';
import {ReminderListPage} from '../reminder-list/reminder-list';
import { HomePage } from '../home/home';
import {TabsPage} from '../tabs/tabs';
import {MyService, User} from '../../providers/my-service';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Moment } from 'moment';
import 'rxjs/Rx';

/*
  Generated class for the Settings page.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  newdata: any;
  userdata: any;
  settingsData = [];
  userInfo = [];
  userCarriers = [];
  userTimezones = [];
  userCountry = [];
  password: any;
  confirmPassword: any;
  newSettings: any;  
  returnValues: any;
  userID: any;
  user: any;
  firstName: string; lastName: string; username: string; phoneNumber: string; userEmail: string;
  carrier: string; timezone: string; country: string; email: string; message: string; position: string;
  validLogin: boolean=false; blankPassword: boolean=false; validInfo: boolean;
  isAndroid: boolean = false;
  i: number;

  constructor(public navController: NavController, params: NavParams,
             public alertCtrl: AlertController, public http: Http, 
             public mySvc: MyService, fb: FormBuilder, private platform: Platform,
             private toastCtrl: ToastController) {

  
   
   this.http = http;
   this.userdata = {};
   
   this.newdata = {};
   this.userdata.country = "United States";
   this.userdata.username = "";
   this.userdata.password = "";
   this.userdata.confirmPassword = "";
   this.userdata.firstname = "";
   this.userdata.lastname = "";     
   this.userdata.phoneNumber = "";
   this.userdata.userEmail = "";
   this.userdata.phoneNumber = "";
   this.userdata.userCarrier = "none";
   this.userdata.userTimezone = "";
   this.userdata.userCountry = "";
   this.userdata.message = "";
   this.validInfo = true;

   this.userCarriers = [
      
      {id: 'message.alltel.com', name: 'Alltel', selected: false},
      {id: 'txt.att.net', name: 'AT&T', selected: false},
      {id: 'mmode.com', name: 'AT&T Free2Go', selected: false},
      {id: 'mobile.att.net', name: 'AT&T PCS', selected: false},
      {id: 'sms.bellsouth.com', name: 'Bell South', selected: false},
      {id: 'myboostmobile.com', name: 'Boost', selected: false},
      {id: 'cingularme.com', name: 'Cingular', selected: false},
      {id: 'sms.mycricket.com', name: 'Cricket', selected: false},
      {id: 'cricketaio', name: 'Cricket (AIO)', selected: false},
      {id: 'mymetropcs.com', name: 'Metro PCS', selected: false},
      {id: 'messaging.nextel.com', name: 'Nextel', selected: false},
      {id: 'ptel.net', name: 'Powertel', selected: false},
      {id: 'messaging.sprintpcs.com', name: 'Sprint', selected: false},
      {id: 'tms.suncom.com', name: 'SumCom', selected: false},
      {id: 'tmomail.net', name: 'T-Mobile', selected: false},
      {id: 't-mobile.uk.net', name: 'T-Mobile UK', selected: false},
      {id: 'email.uscc.net', name: 'US Cellular', selected: false},
      {id: 'vtext.com', name: 'Verizon', selected: false},
      {id: 'vmobl.com', name: 'Virgin Mobile', selected: false}
   ]    

   this.userTimezones = [
     {id: 'America\/Honolulu', name: '(GMT-10:00) Hawaii-Aleutian Time', checked: "false"},
     {id: 'America\/Anchorage', name: '(GMT-9:00) Alaska Time', checked: "false"},
     {id: 'America\/Los_Angeles', name: '(GMT-8:00) Pacific Time (US & Canada)', checked: "false"},
     {id: 'America\/Phoenix', name: '(GMT-7:00) Arizona Time', checked: "false"},
     {id: 'America\/Denver', name: '(GMT-7:00) Mountain Time (US & Canada)', checked: "false"},
     {id: 'America\/Chicago', name: '(GMT-6:00) Central Time (US & Canada)', checked: "false"},
     {id: 'America\/New_York', name: '(GMT-5:00) Eastern Time (US & Canada)', checked: "true"}

   ]

   this.userCountry = [
     {id: 'none', name: 'Select Country', checked: "false"},
     {id: 'Canada', name: 'Canada', checked: "false"},
     {id: 'United Kingdom', name: 'United Kingdom', checked: "false"},
     {id: 'United States', name: 'United States', checked: "true"},
     {id: 'Virgin Islands', name: 'Virgin Islands', checked: "false"}
   ]
   


}

  ngAfterViewInit() {
    this.userID = this.mySvc.getUserID();
    this.mySvc.getUsername().then((username) => {
        this.newdata.username = username;
        //console.log("Username is: " + this.newdata.username);
      });

    this.mySvc.loadUserSettings(this.userID)
      .subscribe(
      (details) => {         
          
          this.userdata = details;    
          this.newdata.email = this.userdata[0].email;
          this.newdata.phone = this.userdata[0].phone;
          this.newdata.firstName = this.userdata[0].firstName;
          this.newdata.lastName = this.userdata[0].lastName;
          this.newdata.carrier = this.userdata[0].carrier;
          this.newdata.country = this.userdata[0].country;
          this.newdata.timezone = this.userdata[0].user_timezone;
          console.log("Settings: " + JSON.stringify(this.userdata));

         
       }, (error) => {             
          console.log("ERROR: ", error);  
      }); 
  };

  Logout() {
    this.navController.push(HomePage, {userLoggedIn: false});
  }

  updateUserSettings() {
    this.userID = this.mySvc.getUserID();
    this.firstName = this.newdata.firstName;
    this.lastName = this.newdata.lastName;
    this.username = this.newdata.username; 
    this.password = this.newdata.password;
    this.confirmPassword = this.newdata.confirmPassword;   
    this.phoneNumber = this.newdata.phone;
    this.email = this.newdata.email;
    this.carrier = this.newdata.carrier;
    this.timezone = this.newdata.timezone;
    this.country = this.newdata.country;

    let firstName = this.newdata.firstName;
    let lastName = this.newdata.lastName;
    let username = this.newdata.username;
    let password = this.newdata.password;
    let confirmPassword = this.newdata.confirmPassword;    
    let phoneNumber = this.newdata.phone;
    
    let userEmail = this.newdata.email;
    let userCarrier = this.newdata.carrier;
    let userTimezone = this.newdata.timezone;
    let userCountry = this.newdata.country;
   
    //console.log(this.userID, this.firstName, this.lastName, this.username, this.email, this.phoneNumber, this.carrier,
    //                this.timezone, this.country);
    this.newdata.message = "";
    this.newdata.invalidPassword = "";
    this.newdata.invalidEmail = "";
    if (password != confirmPassword) {
      this.message = "Confirm password does not match password entered!";
      this.newdata.invalidPassword = this.message;
      this.validInfo = false;
      console.log(this.message);    
      this.showToast(this.message);
    }
    
    if (!this.mySvc.validateEmail(this.newdata.email)) {
      this.newdata.invalidEmail = "Email entered is invalid";
      this.validInfo = false;
      console.log("Invalid Email!");
      this.showToast("Invalid Email address!");
    }

    if (this.newdata.timezone = ""){
      console.log("Blank timezone!");
      this.showToast("Blank timezone!");
    }

   
    if (this.validInfo) {
      this.mySvc.updateUser(this.userID, this.firstName, this.lastName, this.username, this.password, this.email, this.phoneNumber, this.carrier,
                    this.timezone, this.country)
        .subscribe(
          (response) => {
               
              console.log("Update settings Response: " + response);
              this.settingsData = response;
             // this.user = "login";
             
             
            // this.navController.push(AddEventPage);
            //this.showToast("Settings Updated!");
            this.mySvc.loadUserSettings(this.userID)
                .subscribe(
                  (details) => {         
              
                    this.userdata = details;    
                    this.newdata.email = this.userdata[0].email;
                    this.newdata.phone = this.userdata[0].phone;
                    this.newdata.firstName = this.userdata[0].firstName;
                    this.newdata.lastName = this.userdata[0].lastName;
                    this.newdata.carrier = this.userdata[0].carrier;
                    this.newdata.country = this.userdata[0].country;
                    this.newdata.timezone = this.userdata[0].user_timezone;
                    this.showAlert();
                    this.navController.setRoot(TabsPage);
                }, (error) => {             
                    console.log("ERROR: ", error);  
                });   // end of subscribe for loadUserSettings
          }, (error) => {             
                console.log("ERROR: ", error); 
          });  //  end of subscribe for updateUser
       
      }

  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Settings Updated!',
            buttons: ['OK']
    });
    alert.present();
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'center'
    });
    
    console.log("Toast Msg=" + message);
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
   
  }

}
