import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MyService} from '../../providers/my-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import moment from 'moment';
import 'moment-timezone';
import { HomePage } from '../home/home';
//import * as moment from 'moment';

/*
  Generated class for the Main page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  data: any;
  currDate: any;
  userId: any;
  username: string;
  category: string;
  subheading: string;
  evList = [];


  constructor(public navCtrl: NavController, public mySvc: MyService) {
    this.currDate = moment(new Date()).format();
    this.evList = [];
    this.subheading = '';    
  }

  ionViewDidLoad() {
    this.currDate = moment(new Date().toISOString()).format('MMMM DD, YYYY');  
    this.evList = [];
    
    //this.currDate.tz('America/New_York').format('MM/DD/YYYY h:mm a');
   // moment(this.currDate, 'America/New_York').format('MM/DD/YYYY h:mm a');  
   moment().locale('en');
   
    this.userId = this.mySvc.getUserID();
    
    console.log("Main ionViewDidLoad");

    this.mySvc.getCurrentReminders(this.userId)
        .subscribe(
            (response) => {      
                       
                this.evList = response;  
                if (this.evList.length == 0) {
                   this.subheading = "No Reminders Found for Today";
                   //this.evList.push(this.subheading);
                   console.log(this.subheading);
                } else {
                  this.subheading = '';
                  console.log("Current Reminders: " + JSON.stringify(response));
                }
            }, (error) => {             
                console.log("ERROR: ", error);
      });   
  };

  ionViewDidEnter() {
    this.currDate = moment(new Date().toISOString()).format('MMMM DD, YYYY');  
    this.evList = [];
    
    //this.currDate.tz('America/New_York').format('MM/DD/YYYY h:mm a');
    // moment(this.currDate, 'America/New_York').format('MM/DD/YYYY h:mm a');  
    moment().locale('en');
   
    this.userId = this.mySvc.getUserID();
    
    console.log("Main - onPageWillEnter");

    this.mySvc.getCurrentReminders(this.userId)
        .subscribe(
            (response) => {      
                       
                this.evList = response;  
                if (this.evList.length == 0) {
                   this.subheading = "No Reminders Found for Today";
                   //this.evList.push(this.subheading);
                   console.log(this.subheading);
                } else {
                  this.subheading = '';
                  console.log("Current Reminders: " + JSON.stringify(response));
                }
            }, (error) => {             
                console.log("ERROR: ", error);
      }); 
  }

  Logout() {
    this.navCtrl.push(HomePage, {userLoggedIn: false});
  }

}
