import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Storage, IonicStorageModule} from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {Platform} from 'ionic-angular';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import {ErrorObservable } from 'rxjs/observable/ErrorObservable';

export class User {
  username: string;
  user_id: number;
  constructor(username: string, user_id: number) {
    this.username = username;
    this.user_id = user_id;
  }
}


@Injectable()

export class MyService {
  
  data: any;
  events: any;
  eventItems: any;
  newUser: any;
  logindata= [];
  eventdata= [];
  Login: Array<any> = [];
  user_id: any;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  db: SQLiteObject;
  ready: Promise<void>;
  

  constructor(private http: Http, public storage: Storage, private sqlite: SQLite, private platform: Platform) {
    this.storage = storage;
    this.data = null;    
    this.firstName = 'Blank';
    this.lastName = 'Name';
    this.email = 'user@gmail.com';
    this.phoneNumber = '941-123-4567';
   
    this.ready = this.openDatabase();
    
    
  }

  openDatabase() {
    return this.platform.ready().then(() => {  
      this.sqlite.create({
          name: 'data.db',
          location: 'default'
       })  
      .then((db: SQLiteObject) => {        
        this.db = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS v_users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, userId INTEGER', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));

      })
     .catch(e => console.log(e));
    //return this.db.openDatabase({
    //  name: 'data.db',
    //  location: "default"
    //}).then(() => {      
    //  this.db.executeSql("CREATE TABLE IF NOT EXISTS v_users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, userId INTEGER)", [])
    //    .then((data) => {
    //      console.log('user table created'); }, (error) => { console.log('Unable to create table user'); })        
   //});
    }) 
  }

 /* createTable() {
    let sql = "CREATE TABLE IF NOT EXISTS v_users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, userId INTEGER)";
    //return this.db.executeSql(sql, []);
    return this.db.transaction(tr => { tr.executeSql(sql, []); }).then(d => { console.log('User table created '); }, 
        err => { console.error('unable to create table'); }); 
  }  */

  create(username: any, password: any, userId: any) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('INSERT INTO v_users(username, password, userId) VALUES(?,?,?)', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
        })
      .catch(e => console.log(e));
    }
   //let sql = 'INSERT INTO v_users(username, password, userId) VALUES(?,?,?)';
   // return this.db.transaction(tr => { tr.executeSql('INSERT INTO v_users(username, password, userId) VALUES(?,?,?)', [username, password, userId]); 
   //     }).then(d => { console.log('User inserted '); }, 
   //     err => { console.error('unable to insert user data'); }); 
        
        
    //return this.db.executeSql(sql, [username, password, userId]);
  
  

  getDbUser() {
    let sql = "SELECT * FROM v_users";
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {  
        db.executeSql(sql, [])
        .then(response => {
          let users = [];
          for (let index = 0; index < response.rows.length; index++) {
            users.push( response.rows.item(index) );
          }
           
           return users;
        })     
      })
      .catch(e => console.log(e));
  }

  public setUser(firstName, lastName, email, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;

  }
  public setUserInfo(userInfo) {
    this.logindata = userInfo;
  }
  public setMyDetails(data: Object) {
    let newData = JSON.stringify(data);
    this.storage.set('mydetails', newData);
    console.log("setMyDetails: " + newData);
  }
  
  public getMyDetails() {
    return this.storage.get('mydetails');
  }

  public getUserInfo() {
    return this.logindata;
  }

  public setUserID(user_id) {
    this.user_id = user_id;
  }
  
  public getUserID() {
    return this.user_id;
  }

  public setUsername(username) {
    this.username = username;
    this.storage.set('username', this.username);
  }

  public getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  getFirstName() {
    return this.firstName;
  }

  
  setEmail(userEmail) {
    this.email = userEmail;
  }

  getEmail() {
    return this.email;
  }

  setPhoneNumber(userPhone) {
    this.phoneNumber = userPhone;
    console.log("Phone: " + this.phoneNumber);
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  public setEvents(eventList) {
    this.eventdata = eventList;
  }

  getValue(key: string) { 
    return this.storage.get(key); 
  } 
  

  setValue(key: string, value: string) { 
    this.storage.set(key, value); 
  }

  submitLogin(username, password): any  {
   // if (this.logindata) {
  //    return Promise.resolve(this.logindata);
   // }
    let data = JSON.stringify({username, password});
    let link = "https://www.ez2remind.com/api.php";
    console.log("LoginData: " + data);
    return this.http.post(link, data)
        .map(res =>( res.json()))       
        
       .catch(this.handleError);        
 
  }

  validateEmail(email)  {  
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))  {  
           return true;  
        }              
           return false;  
    }  

  registerUser(firstName, lastName, username, password, email, phoneNumber, carrier, timezone, country):  any {
    
    let newUser = JSON.stringify({firstName, lastName, username, password, email, phoneNumber, carrier, timezone, country});
    let link = "https://www.ez2remind.com/appNewUser.php";
    console.log("Add NewUser: " + newUser );
    return this.http.post(link, newUser)
      .map(res =>( res.json()))
      .catch(this.handleError);

  }

  getCurrentReminders(userId) {
    let eventItems = JSON.stringify({userId});
    let link = "https://www.ez2remind.com/appHomeReminders.php";
    return this.http.post(link, eventItems)
      .map(res =>( res.json()))      
      .catch(this.handleError);
  }

  addEvent(eventName, userId, eventDesc, category, startDate, endDate, eventTime, remindWhen, repeat, emailReminder, textReminder):  any {
   //addEvent(eventData) {

    let eventItems = JSON.stringify({eventName, userId, eventDesc, category, startDate, endDate, eventTime, remindWhen, repeat, emailReminder, textReminder });    
    let link = "https://www.ez2remind.com/appAddEvent.php";
    console.log("EventItems: " + eventItems );

    return this.http.post(link, eventItems)
      .map(res =>( res.json()))   

      .catch(this.handleError);
  }

  loadReminder(eventId, userId):  any {
   //addEvent(eventData) {
   
    let eventItems = JSON.stringify({eventId, userId});    
    let link = "https://www.ez2remind.com/appLoadEditForm.php";
    
    return this.http.post(link, eventItems)
      .map(res =>( res.json())) 
     // .map(this.extractData)
      .catch(this.handleError);
  }

  loadUserSettings(userId) {
   // console.log("Load User Settings UserId: "+ userId);
    let eventItems = JSON.stringify({userId});
    let link = "https://www.ez2remind.com/appLoadSettings.php";
    return this.http.post(link, eventItems)
      .map(res =>( res.json()))      
      .catch(this.handleError);
  }

  updateUser(userId, firstName, lastName, username, password, email, phoneNumber, carrier, timezone, country) {
    let userItems = JSON.stringify({userId, firstName, lastName, username, password, email, phoneNumber, carrier, timezone, country});
    let link = "https://www.ez2remind.com/appUpdateSettings.php";
    console.log("Update Settings Items: " + userItems);
    return this.http.post(link, userItems) 
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateReminder(eventId, eventName, userId, eventDesc, category, startDate, endDate, eventTime, remindWhen, repeat, emailReminder, textReminder):  any {
   //addEvent(eventData) {

    let eventItems = JSON.stringify({eventId, eventName, userId, eventDesc, category, startDate, endDate, eventTime, remindWhen, repeat, emailReminder, textReminder});    
    let link = "https://www.ez2remind.com/appEditReminder.php";
    console.log("Update Reminder Items: " + eventItems);

    return this.http.post(link, eventItems)
      .map(res =>( res.json()))     
      .catch(this.handleError);
  }

  removeReminder(eventId, userId):  any {
    
    let params = JSON.stringify({eventId, userId});
    let link = "https://www.ez2remind.com/appDeleteReminder.php";

    //console.log("Delete parameters: " + params);

    return this.http.post(link, params)
      .map(res =>(res.json()))
      .catch(this.handleError);
  }

  todoItemDone(eventId, userId): any {
    let params = JSON.stringify({eventId, userId});
    let link = "https://www.ez2remind.com/appToDoComplete.php";

    console.log("ToDoComplete: " + params);

    return this.http.post(link, params)
      .map(res =>(res.json()))
      .catch(this.handleError);
  }

  getEvents(username, userId, category):  any {
    
    let params = JSON.stringify({username, userId, category});
    let link = "https://www.ez2remind.com/remList.php";
    console.log("GetEventParams: " + params );

    return this.http.post(link, params)
       .map(res =>( res.json()))           
       .catch(this.handleError);
       
  }
  
  sendPassword(username, email):  any {
    let resetItems = JSON.stringify({username, email});    
    let link = "https://www.ez2remind.com/appResetPassword.php";
    console.log("Reset Password Items: " + resetItems);

    return this.http.post(link, resetItems)
      .map(res =>( res.json()))      
      .catch(this.handleError);
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

  
   public getUser() {
   // return this.db.executeSql('SELECT * FROM users');
  }

  public addUser(userID, username){
   // return db.executeSql('INSERT INTO valid_users(user_id, username) VALUES (userID, username');
   
  }

  public removeUser() {
   // return this.db.executeSql('Delete from valid_users');
  }

  
}


