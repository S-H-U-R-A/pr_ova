import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
/*Libreria de formularios */
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/*Provider de adicion profesor */
import { TeacherOperationsProvider } from '../../../providers/teacher-operations/teacher-operations';

@IonicPage()
@Component({
  selector: 'page-modal-respuesta',
  templateUrl: 'modal-respuesta.html',
})
export class ModalRespuestaPage {

  /*Objeto formulario */
  public addRta : FormGroup;

  constructor(
              public  navCtrl:      NavController, 
              public  navParams:    NavParams,
              private formBuilder:  FormBuilder,
              public  viewCtrl:     ViewController,
              public  teach:        TeacherOperationsProvider
  ) {

    /*Objeto del formulario */
    this.addRta = this.formBuilder.group({
      descripcion:['', Validators.compose(
        [
          Validators.required
        ]
      )],
      correcta:['0', Validators.compose(
        [
          Validators.required
        ]
      )]     
    });

  }

  public cerrarModal(){
    this.viewCtrl.dismiss();
  }

  public agregarRespuesta(){
    this.teach.agregarRespuesta(this.addRta.value.descripcion, this.addRta.value.correcta).then(()=>{
      this.viewCtrl.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalRespuestaPage');
  }

}
