import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Http, HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { MyService } from '../providers/my-service';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { TabsPage } from '../pages/tabs/tabs';
import { AddEventPage } from '../pages/add-event/add-event';
import { EditReminderPage } from '../pages/edit-reminder/edit-reminder';
import { ReminderListPage } from '../pages/reminder-list/reminder-list';
import { CalendarPage } from '../pages/calendar/calendar';
import { TodolistPage } from '../pages/todolist/todolist';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { SettingsPage } from '../pages/settings/settings';
import { NgCalendarModule } from "ionic2-calendar";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MainPage,
    TabsPage,
    AddEventPage,    
    EditReminderPage,
    ReminderListPage,
    CalendarPage,
    TodolistPage,
    ResetPasswordPage,
    PrivacyPolicyPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,    
    CommonModule, 
    NgCalendarModule,  
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MainPage,
    TabsPage,
    AddEventPage,    
    EditReminderPage,
    ReminderListPage,
    CalendarPage,
    PrivacyPolicyPage,
    TodolistPage,
    ResetPasswordPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MyService,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
