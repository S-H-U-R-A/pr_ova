import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*Libreria de formularios */
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/*PROVIDERS */
import { UtilitiesProvider } from '../../../providers/utilities/utilities';
import { StudentOperationsProvider } from '../../../providers/student-operations/student-operations';
/*Se incluyen las paginas d la app*/
import { StudentProblemPageOnePage } from '../../index.pages';

@IonicPage()
@Component({
  selector: 'page-student-problem',
  templateUrl: 'student-problem.html',
})
export class StudentProblemPage {

  /*Objeto formulario */
  public getProblemForm : FormGroup;

  constructor(
            public  navCtrl:            NavController, 
            public  navParams:          NavParams,
            private formBuilder:        FormBuilder,
            public  utilitiesProvider:  UtilitiesProvider,
            public  student:            StudentOperationsProvider
  ) {

      /*Objeto del formulario */
      this.getProblemForm = this.formBuilder.group({
          pin: ['', Validators.compose(
            [
              Validators.required, 
              Validators.pattern(/^[0-9]+$/)
            ]
          )]       
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentProblemPage');
  }

  public getProblem(){
    /*Se muestra el gif de carga */
    this.utilitiesProvider.presentLoading('Un momento por favor');

    this.student.getProblema(this.getProblemForm.value.pin).then( (dataProblem) => {

      if( dataProblem['error'] == '1'){
        /*Se limpian los campos del formulario */
        this.utilitiesProvider.closePresentLoading();
        this.getProblemForm.reset();
        this.utilitiesProvider.presentToast('Ha ocurrido un error interno.', 1500);
      }else if( dataProblem['error'] == '2' ){
        this.utilitiesProvider.closePresentLoading();
        this.getProblemForm.reset();
        this.utilitiesProvider.presentToast('El pin que ingreso no es valido.', 2000);
      }else{
        //SE REALIZA LA PETICION DE VALIDAR RESPUESTAS PREVIAS AL PROBLEMA POR PARTE DEL USUARIO
        this.student.getValidateRtaProblema( localStorage.getItem('userId') ,dataProblem[0].ID).then((data)=>{
          //SI RETORNA MAS DE 0 ES QUE YA LO RESPONDIO
          if(data[0].EXISTE > 0){
            //SE CIERRA EL GIF Y SE LIMPIA EL FORMULARIO
            this.utilitiesProvider.closePresentLoading();
            this.getProblemForm.reset();
            this.utilitiesProvider.presentToast('Ya respondiste el problema asociado al pin ingresado.', 2500);
          }else{
            /*Se limpian los campos del formulario */
            this.utilitiesProvider.closePresentLoading();
            this.getProblemForm.reset();
            this.navCtrl.push(StudentProblemPageOnePage, {data: dataProblem});
          }
        })

      }

    })
  }

}
