import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalUpdateUserPage } from './modal-update-user';

@NgModule({
  declarations: [
    ModalUpdateUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalUpdateUserPage),
  ],
})
export class ModalUpdateUserPageModule {}
