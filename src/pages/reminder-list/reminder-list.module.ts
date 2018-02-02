import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReminderListPage } from './reminder-list';

@NgModule({
  declarations: [
    ReminderListPage,
  ],
  imports: [
    IonicPageModule.forChild(ReminderListPage),
  ],
})
export class ReminderListPageModule {}
