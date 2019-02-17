import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherProblemPage } from './teacher-problem';

@NgModule({
  declarations: [
    TeacherProblemPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherProblemPage),
  ],
})
export class TeacherProblemPageModule {}
