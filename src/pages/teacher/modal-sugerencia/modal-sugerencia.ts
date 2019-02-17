import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
/*Libreria de formularios */
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/*Provider de adicion profesor */
import { TeacherOperationsProvider } from '../../../providers/teacher-operations/teacher-operations';

@IonicPage()
@Component({
  selector: 'page-modal-sugerencia',
  templateUrl: 'modal-sugerencia.html',
})
export class ModalSugerenciaPage {

  /*Objeto formulario */
  public addSug : FormGroup;

  constructor(
      public  navCtrl:      NavController, 
      public  navParams:    NavParams,
      private formBuilder:  FormBuilder,
      public  viewCtrl:     ViewController,
      public  teach:        TeacherOperationsProvider
  ) {
      /*Objeto del formulario */
      this.addSug = this.formBuilder.group({
        descripcion:['', Validators.compose(
          [
            Validators.required
          ]
        )]     
      });
  }

  public cerrarModal(){
    this.viewCtrl.dismiss();
  }

  public agregarSugerencia(){
    this.teach.agregarSugerencia(this.addSug.value.descripcion).then(()=>{
      this.viewCtrl.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalSugerenciaPage');
  }

}
