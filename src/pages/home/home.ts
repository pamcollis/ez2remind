import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, ToastController } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';
import {FormBuilder,  Validators, AbstractControl } from '@angular/forms';
//import {CustomValidators} from '../../providers/customvalidators';
import {AddEventPage} from '../add-event/add-event';
import {ReminderListPage} from '../reminder-list/reminder-list';
import {ResetPasswordPage} from '../reset-password/reset-password';
import {PrivacyPolicyPage} from '../privacy-policy/privacy-policy';
import {MyService, User} from '../../providers/my-service';
import {TabsPage} from '../tabs/tabs';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Moment } from 'moment';
import 'rxjs/Rx';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [IonicStorageModule]
  
})

@Injectable()

export class HomePage {   

  tabBarElement: any;
  password: any;

  response: string;
  data: any;
  json: any;
  userData: any[] = [];
  userInfo = [];
  userCarriers = [];
  userTimezones = [];
  userCountry = [];
  newdata: any;
  newUser: any;
  returnValues: any;
  userID: any;
  user: any;
  authorize: string;
  firstName: string; lastName: string; username: string; phoneNumber: string; userEmail: string;
  carrier: string; timezone: string; country: string; email: string; message: string; position: string;
  validLogin: boolean=false; blankPassword: boolean=false; validInfo: boolean;
  isAndroid: boolean = false;
  isUserLoggedIn: boolean = false;
  
  public users: Array<Object>;

 constructor(public navController: NavController, params: NavParams,
             public alertCtrl: AlertController, public http: Http, 
             public mySvc: MyService, fb: FormBuilder, private platform: Platform, 
             public storage: IonicStorageModule, private toastCtrl: ToastController) {   

   //this.isUserLoggedIn = true;
   this.isUserLoggedIn = params.get('userLoggedIn');             
    this.authorize = "login";
   let sel = params.get('sel');
    if(sel == 'register'){
        this.authorize= "register";
    }else if(sel == 'login'){
        this.authorize= "login";
    }
  // this.authorize = "login";

   this.tabBarElement = document.querySelector('ion-tabbar');
   this.storage = storage;
   this.user = "login";
   this.http = http;
   this.data = {};
   
   this.newdata = {};
   this.newdata.country = "United States";
   this.newdata.username = "";
   this.newdata.firstname = "";
   this.newdata.lastname = "";
   this.newdata.password = "";
   this.newdata.confirmPassword = "";
   this.newdata.phoneNumber = "";
   this.newdata.userEmail = "";
   this.newdata.phoneNumber = "";
   this.newdata.userCarrier = "none";
   this.newdata.userZone = "";
   this.newdata.userCountry = "";
   this.newdata.message = "";
   this.validInfo = true;

   this.userCarriers = [
      
      {id: 'alltel', name: 'Alltel'},
      {id: 'att', name: 'AT&T'},
      {id: 'attfree', name: 'AT&T Free2Go'},
      {id: 'attpcs', name: 'AT&T PCS'},
      {id: 'bellsouth', name: 'Bell South'},
      {id: 'boost', name: 'Boost'},
      {id: 'cingular', name: 'Cingular'},
      {id: 'cricket', name: 'Cricket'},
      {id: 'cricketaio', name: 'Cricket (AIO)'},
      {id: 'metropcs', name: 'Metro PCS'},
      {id: 'nextel', name: 'Nextel'},
      {id: 'powertel', name: 'Powertel'},
      {id: 'sprint', name: 'Sprint'},
      {id: 'suncom', name: 'SumCom'},
      {id: 'tmobile', name: 'T-Mobile'},
      {id: 'tmobileuk', name: 'T-Mobile UK'},
      {id: 'uscc', name: 'US Cellular'},
      {id: 'verizon', name: 'Verizon'},
      {id: 'virgin', name: 'Virgin Mobile'},
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

  ionViewWillEnter() {
    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = 'none';
    }
     this.mySvc.getUsername().then((username) => {
        this.data.username = username;
        console.log("Username is: " + this.data.username);
      });
    
    
  }
 
  ionViewWillLeave() {
    let elem = <HTMLElement>document.querySelector(".tabbar");
    if (elem != null) {
      elem.style.display = 'flex';
    }
  }

  ngAfterViewInit() {
      console.log("AfterViewInit");
      this.mySvc.getUsername().then((username) => {
        this.data.username = username;
        console.log("Username is: " + this.data.username);
      });
     // this.mySvc.getDbUser().then((users) => {
     //       this.user = users;
        this.user = this.mySvc.getDbUser();
            console.log("user: " + this.user);
            //this.data.username = this.user.username;
            //this.data.password = this.user.password;
      //};  

      
      
      if (this.isUserLoggedIn) {
        this.data.password = this.user.password;
      } else {
        this.data.password = "";
      }
  
    if (this.data.username = '') {
      this.mySvc.getMyDetails().then((details) => {
        let savedDetails: any = false;

        if(details && typeof(details) != "undefined"){
          savedDetails = JSON.parse(details);
        }      
        this.data.username = savedDetails[0].username;
      
      //console.log("SavedDetails:" + this.data.username );
      });
    }
    //this.data.username = this.user.username;
    
  }

   showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Required',
      subTitle: "Please fill in Required fields: " + message,
      buttons: ['OK']
    });
    alert.present();
  }

  submit(): void {
    this.data.message = "";
    let username = this.data.username;
    let password = this.data.password;
    // check for blank username
    if (this.data.username == "") {     
      this.data.message = "Username cannot be blank";
      this.showAlert(this.data.message);
    } 
    // check for blank password
    if (this.data.password == "") {   
      if (this.data.message = ""){  
        this.data.message = "Password cannot be blank!"; 
        this.showAlert(this.data.message);
      } else {
        this.data.message =  "Username and Password cannot be blank!";    
        this.showAlert(this.data.message);   
      }
    }

    console.log("Msg= " + this.data.message);
    if (this.data.message == "") {
      this.mySvc.username = username;

      this.mySvc.submitLogin(username, password)
        .subscribe(
          (response) => {
            
            this.userData = response; 
            this.returnValues = JSON.stringify(response);
            console.log("Login response: " + this.returnValues);
            this.userID = this.userData[0].user_id;
            this.email = this.userData[0].email;
            this.phoneNumber = this.userData[0].phone;
            this.mySvc.setUserID(this.userData[0].user_id);
            this.mySvc.setUsername(this.data.username);
            this.mySvc.setEmail(this.userData[0].email);
            this.mySvc.setPhoneNumber(this.userData[0].phone);
           //  console.log("Login UserID= " + this.userData[0].user_id);
         
           this.mySvc.setMyDetails(response);
           if (this.user == '') {
              this.mySvc.create(username, password, this.userID);
           } 
           this.mySvc.create(username, password, this.userID);
           this.isUserLoggedIn = true;   
           this.navController.setRoot(TabsPage);
          //this.navController.push(ReminderListPage);
        }, (error) => {             
            console.log("ERROR: ", error);
             this.data.message =  "Username or Password is not correct. Please try again.";    
        this.showAlert(this.data.message);  
        });   
    };
  }     

  

  registerUser() {
    this.firstName = this.newdata.firstName;
    this.lastName = this.newdata.lastName;
    this.username = this.newdata.username;
    this.password = this.newdata.password;
    this.phoneNumber = this.newdata.phoneNumber;
    this.email = this.newdata.email;
    this.carrier = this.newdata.carrier;
    this.timezone = this.newdata.userZone;
    this.country = this.newdata.country;

    let firstName = this.newdata.firstName;
    let lastName = this.newdata.lastName;
    let username = this.newdata.username;
    let password = this.newdata.password;
    let confirmPassword = this.newdata.confirmPassword;
    let phoneNumber = this.newdata.phoneNumber;
    
    let userEmail = this.newdata.userEmail;
    let userCarrier = this.newdata.userCarriers;
    let userTimezone = this.newdata.userZone;
    let userCountry = this.newdata.userCountry;
   // console.log("Carrier=" + this.carrier + "; Timezone=" + this.timezone + "; Country=" + this.country);
    console.log(this.firstName, this.lastName, this.username, this.password, this.email, this.phoneNumber, this.carrier,
                    this.newdata.userZone, this.country);
    this.newdata.message = "";
    this.newdata.invalidPassword = "";
    this.newdata.invalidEmail = "";
    this.validInfo = true;
    this.message = "";

    if (this.newdata.firstName == "") {
      this.message = "First Name; ";
      this.validInfo = false;
    }
    if (this.newdata.lastName == "" ) {
      this.message += "Last Name; \n";
      this.validInfo = false;
    }
    if (this.newdata.username == "") {
      this.message += "username; \n";
      this.validInfo = false;
    }
    if (this.newdata.password == undefined) {
      this.message += "password; ";
      this.validInfo = false;
    }
    
    if (password !== confirmPassword) {
      this.message += "Confirm password does not match password entered!";
      this.newdata.invalidPassword = this.message;
      this.validInfo = false;
      //console.log(this.message);    
      //this.showAlert(this.message);
    }
    if (this.validInfo == false) {
      this.showAlert(this.message);
    }
    if (!this.mySvc.validateEmail(this.newdata.email)) {
      this.newdata.invalidEmail = "Email entered is invalid";
      this.validInfo = false;
      console.log("Invalid Email!");
      this.showAlert("Invalid Email address!");
    }

    console.log("Timezone=" + this.newdata.userZone);
    if (this.newdata.userZone == ""){
      this.validInfo = false;
      this.message = "Timezone!";
      console.log("Blank timezone!");
      this.showAlert(this.message);
    }

    //if (!this.firstName || !this.lastName || !this.username || !this.password
    //    || !this.userEmail || !this.phoneNumber || !this.carrier || !this.timezone || !this.country) {
   //      // this.validInfo = false;
   //       this.newdata.message = "***Please complete all Required fields!***";
   //       console.log("Required fields not all filled in.");
  //        this.showToast("Required fields not all filled in.");
   //     }

    if (this.validInfo) {
      this.mySvc.registerUser(this.firstName, this.lastName, this.username, this.password, this.email, this.phoneNumber, this.carrier,
                    this.newdata.timezone, this.newdata.country)
        .subscribe(
          (response) => {
              this.newUser = response;
              console.log("NewUser: " + response);
             // this.user = "login";
             this.userData = response; 
             this.mySvc.setUserID(this.userData[0].user_id);
            this.mySvc.setUsername(this.username);
            this.mySvc.setEmail(this.email);
            this.mySvc.setPhoneNumber(this.phoneNumber);
             this.navController.push(TabsPage);
          }
        )
      }

  }

  resetPassword() {
    this.navController.push(ResetPasswordPage);
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

  privacyPolicy() {
    this.navController.push(PrivacyPolicyPage);
  }
        
       
        
  


}