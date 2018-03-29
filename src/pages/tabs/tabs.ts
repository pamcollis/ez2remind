import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MainPage } from '../main/main';
import { AddEventPage } from '../add-event/add-event';
import { ReminderListPage } from '../reminder-list/reminder-list';
import { TodolistPage } from '../todolist/todolist';
import { SettingsPage } from '../settings/settings';

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MainPage;
  tab2Root: any = ReminderListPage;
  tab3Root: any = AddEventPage;  
  tab4Root: any = TodolistPage; 
  tab5Root: any = SettingsPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }


  
}
