import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {MyService} from '../../providers/my-service';
import { HomePage } from '../home/home';

/* 
   page displays form fields for user to reset password;
   username and password values are validated and then sent to
   server-side code to be updated in database.
*/

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {

  username: string;
  userId: any;
  password: any;
  confirmPassword: any;
  email: string;
  newdata: any;
  data: any;
  message: string;
  validInfo: boolean;
  usernameErr: string;

  constructor(public navCtrl: NavController, public mySvc: MyService, public alertCtrl: AlertController) {
     this.newdata = {};
     this.newdata.email = "";
     this.newdata.username = "";

  }

  ionViewDidLoad() {
    
    //console.log('Hello ResetPassword Page');
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Email Sent',
      subTitle:  message,
      buttons: ['OK']
    });
    alert.present();
  }

  resetPassword() {
    let username = this.newdata.username;    
    let userEmail = this.newdata.email;

    if (username.strlength > 30) {
				this.usernameErr = "Username too long!";				
		} 
    
    if (!this.mySvc.validateEmail(this.newdata.email)) {
      this.newdata.invalidEmail = "Email entered is invalid";
      this.validInfo = false;
      console.log("Invalid Email!");
      //this.showToast("Invalid Email address!");
    }

    this.mySvc.sendPassword(username, userEmail)       
      .subscribe(
        (response) => {         
         // console.log("Reset Password Response: " + JSON.stringify(response));
          this.message =  "Reset password sent to email.";    
          this.showAlert(this.message);
          this.navCtrl.setRoot(HomePage);
      }, (error) => {             
          console.log("ERROR: ", error);   
      });   

  }


}
