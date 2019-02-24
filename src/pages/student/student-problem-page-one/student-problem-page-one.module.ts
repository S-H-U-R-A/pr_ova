import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentProblemPageOnePage } from './student-problem-page-one';

@NgModule({
  declarations: [
    StudentProblemPageOnePage,
  ],
  imports: [
    IonicPageModule.forChild(StudentProblemPageOnePage),
  ],
})
export class StudentProblemPageOnePageModule {}
