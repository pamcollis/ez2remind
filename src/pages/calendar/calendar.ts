import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import moment from 'moment';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  currDate: string;
  minDate: string = '';
  maxDateStr: string = '';
  maxDate= new Date();

  //calendar variables
  eventSource;
  viewTitle;
  isToday: boolean;
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date()   
  };
  calendar2 = {
    mode: 'month',
    currentEndDate: this.selectedDay   
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {


    this.calendar.currentDate = new Date();
    
    
      this.currDate = new Date().toISOString();
      let today = new Date();
      this.minDate = today.toISOString();
      this.maxDate = today;
      this.maxDate.setFullYear(today.getFullYear()+6);
      
      //this.maxDateStr = this.maxDate.toISOString();
      this.maxDateStr = "2023-10-25";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }


  //******************************************************************************************************
  // calendar functions
  
  loadEvents() {
    //this.eventSource = this.createRandomEvents();
}
onViewTitleChanged(title) {
    this.viewTitle = title;
}
onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.startTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['Ok']
    });
    alert.present();

    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
}

changeMode(mode) {
    this.calendar.mode = mode;
}
today() {
    this.calendar.currentDate = new Date();
    
}
onTimeSelected(ev) {
  this.selectedDay = ev.selectedTime;
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
}
onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
    
}




//********************************************************************************************


}
