import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostrarInformePage } from './mostrar-informe';

@NgModule({
  declarations: [
    MostrarInformePage,
  ],
  imports: [
    IonicPageModule.forChild(MostrarInformePage),
  ],
})
export class MostrarInformePageModule {}
