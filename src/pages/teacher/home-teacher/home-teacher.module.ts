import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeTeacherPage } from './home-teacher';

@NgModule({
  declarations: [
    HomeTeacherPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeTeacherPage),
  ],
})
export class HomeTeacherPageModule {}
