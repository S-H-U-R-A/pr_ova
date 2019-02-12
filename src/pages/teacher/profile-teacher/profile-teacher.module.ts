import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileTeacherPage } from './profile-teacher';

@NgModule({
  declarations: [
    ProfileTeacherPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileTeacherPage),
  ],
})
export class ProfileTeacherPageModule {}
