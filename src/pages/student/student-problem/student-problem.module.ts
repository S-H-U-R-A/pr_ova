import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentProblemPage } from './student-problem';

@NgModule({
  declarations: [
    StudentProblemPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentProblemPage),
  ],
})
export class StudentProblemPageModule {}
