import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleInformePage } from './detalle-informe';

@NgModule({
  declarations: [
    DetalleInformePage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleInformePage),
  ],
})
export class DetalleInformePageModule {}
