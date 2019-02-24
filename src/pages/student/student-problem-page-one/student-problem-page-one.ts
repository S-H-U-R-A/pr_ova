import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController  } from 'ionic-angular';
/*Libreria de formularios */
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/*PROVIDERS */
import { UtilitiesProvider } from '../../../providers/utilities/utilities';
import { StudentOperationsProvider } from '../../../providers/student-operations/student-operations';
/* LAYOUT DE SUGERENCIAS */
import { PopoverSuggestionPage, StudentProblemTwoPage } from '../../index.pages';

@IonicPage()
@Component({
  selector: 'page-student-problem-page-one',
  templateUrl: 'student-problem-page-one.html',
})

export class StudentProblemPageOnePage {

  /*Sugerencias */
  public cantidadSugerenciasOne:   number = 0;
  public cantidadSugerenciasTwo:   number = 0;
  public cantidadSugerenciasThree: number = 0;
  /* Cantidad de sugerencias */
  public cantidadSugerencias:number = 0;
  /* Datos para el usuario */
  public titulo:string;
  public photo:string;
  public descripcion:string;
  public pregunta:string;
  /* Mostrar Preguntas */
  public mostrarPregunta:number = 0;
  /* Bandera de saber si se muestra las preguntas*/
  public preguntas:any = false;
  /* Arreglo de preguntas */
  public arrayRespuestas:any;
  /*Objeto formulario */
  public selectRespuesta : FormGroup;

  constructor(
              public  navCtrl:            NavController, 
              public  navParams:          NavParams,
              private formBuilder:        FormBuilder,
              public  popoverCtrl:        PopoverController,
              public  utilitiesProvider:  UtilitiesProvider,
              public  student:            StudentOperationsProvider
            ) 
  {
    /* Se cargan las sugerencias */
    this.student.getSuggestions( this.navParams.get('data')[0].ID );
    /*Se cargan las preguntas */
    this.student.getAnswers( this.navParams.get('data')[0].ID ).then((data)=>{
      this.arrayRespuestas = this.student.getLocalAnswer();
    })
    /*Se cargan los datos del usuario */
    this.titulo       = this.navParams.get('data')[0].TITULO;
    this.descripcion  = this.navParams.get('data')[0].DESCRIPCION;
    this.pregunta     = this.navParams.get('data')[0].PREGUNTA;
    //SE VALIDA LA EXISTENCIA DE LA FOTO 
    if( this.navParams.get('data')[0].IMAGEN == '' || this.navParams.get('data')[0].IMAGEN ){
      this.photo  = 'assets/imgs/landscape.png';
    }else{
      this.photo  = "data:image/jpeg;base64,"+this.navParams.get('data')[0].IMAGEN;
    }

    /*Objeto del formulario */
    this.selectRespuesta = this.formBuilder.group({
      respuestasProblema: ['', Validators.compose(
        [
          Validators.required
        ]
      )]       
    });

  }

  public presentRadioPopover() {

    const popover = this.popoverCtrl.create(PopoverSuggestionPage, { data: this.student.getLocalSuggestion() });
    popover.onDidDismiss( (dataSug)=>{
      /*Se compara la respuesta de cual sugerencia se escogio para ir llevando un contador de cada uno y del total de sugerencias usadas */
      if(dataSug != null){

        if(dataSug.data == 1 && this.cantidadSugerenciasOne < 1){
          //SE AUMENTA EN UNO EL VALOR DE LAS VARIABLES 
          this.cantidadSugerenciasOne += 1;
          this.cantidadSugerencias    +=   1;
        }else if(dataSug.data == 2 && this.cantidadSugerenciasTwo < 1){
          //SE AUMENTA EN UNO EL VALOR DE LAS VARIABLES 
          this.cantidadSugerenciasTwo += 1;
          this.cantidadSugerencias    += 1;
        }else if(dataSug.data == 3 && this.cantidadSugerenciasThree < 1){
          //SE AUMENTA EN UNO EL VALOR DE LAS VARIABLES 
          this.cantidadSugerenciasThree += 1;
          this.cantidadSugerencias      += 1;
        }else{
          console.log('Se cerro el popover sin seleccionar nada');
        }

      }
      
    });
    //SE MUESTRA EL POPOVER
    popover.present({
      /*Se configura que aprezca el popover en donde el usuario presione */
      ev: event
    });
  }

  public showAnswer(){
    //Se aumenta el valor de la variable bandera de saber cuanta veces se ha leido el problema
    this.mostrarPregunta += 1;
    //se valida si ya se lleyo las dos veces mas
    if( this.mostrarPregunta > 2 ){
      //SE MUESTRAN LAS PREGUNTAS
      this.preguntas = true;
    }else{
      //Si no se ha leido se le recuerda al estudiante que debe hacerlo
      this.utilitiesProvider.presentToast('Recuerda que según el metodo de polya se deben leer minimo dos veces mas el problema',5000, true);
    }

  }

  public evidenceAnswer(){
    this.navCtrl.push(  StudentProblemTwoPage, {
      id_user:            localStorage.getItem('userId'), 
      id_problema:        this.navParams.get('data')[0].ID,
      respuesta:          this.selectRespuesta.value.respuestasProblema, 
      cantidaSugerencias: this.cantidadSugerencias 
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentProblemPageOnePage');
  }

}
