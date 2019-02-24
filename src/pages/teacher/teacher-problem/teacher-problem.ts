import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
/*Libreria de formularios */
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/*PROVIDERS */
import { UtilitiesProvider } from '../../../providers/utilities/utilities';
import { TeacherOperationsProvider } from '../../../providers/teacher-operations/teacher-operations';
/*PLUGIN CAMERA */
import { Camera, CameraOptions } from '@ionic-native/camera';
/*LAYOUT MODAL AVATAR */
import { ModalPhotoPage, ModalRespuestaPage, ModalSugerenciaPage } from '../../index.pages';
import { TabsPage } from '../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-teacher-problem',
  templateUrl: 'teacher-problem.html',
})
export class TeacherProblemPage {

  /*Objeto formulario */
  public RegisterProblem : FormGroup;
  /*Fotografia opcional */
  public photo:string = '' ;
  /*Saber si se adjunto Photo*/
  public flagPhoto:boolean = false;
  /*Formulario valido o invalido */
  public invalidForm:any = true;
  /*Variables de cantidad de respuestas y sugerencias */
  public cantidadRespuestas:number  = 0;
  public cantidadSugerencias:number = 0;

  constructor(
              public  navCtrl:            NavController, 
              public  navParams:          NavParams,
              private formBuilder:        FormBuilder,
              private modalCtrl:          ModalController,
              public  utilitiesProvider:  UtilitiesProvider,
              public  teach:              TeacherOperationsProvider,
              private camera:             Camera,
              public  app:                App
  ) {

    /*Objeto del formulario */
    this.RegisterProblem = this.formBuilder.group({
      titulo:['', Validators.compose(
        [
          Validators.required
        ]
      )],
      descripcion:['', Validators.compose(
        [
          Validators.required
        ]
      )],
      pregunta:['', Validators.compose(
        [
          Validators.required
        ]
      )]
             
    });

  }

  public takePhoto(){
    this.utilitiesProvider.presentActionSheetReporteConexion('Adjunta una fotografia del problema').then((data)=>{
      if(data == 'foto'){
        this.capturePhoto();
      }else{
        this.choosePhoto();
      }
    })
  }

  public capturePhoto(){
    /*Opciones de la captura de la foto */
    const options: CameraOptions = {
      quality:            100,
      destinationType:    this.camera.DestinationType.DATA_URL,
      encodingType:       this.camera.EncodingType.JPEG,
      sourceType:         this.camera.PictureSourceType.CAMERA,
      mediaType:          this.camera.MediaType.PICTURE,
      targetWidth:        1200,
      targetHeight:       1200,
      allowEdit:          false,
      correctOrientation: true
    }

    /*Metodo de captura de imagenes */
    this.camera.getPicture(options).then( (imageData) => {
      this.flagPhoto = false;
      /*Se guarada la foto */
      this.photo = imageData;
      /*Se hace saber que si se anexo una foto */
      if( this.photo != '' && this.photo != undefined ){
        this.flagPhoto = true;
      }
    }, ( err ) => {
        this.utilitiesProvider.presentToast('No se tomo ninguna fotografía', 1500);
    });

  }

  public choosePhoto(){
    /*Opciones de la captura de la foto */
    const options: CameraOptions = {
      quality:            100,
      destinationType:    this.camera.DestinationType.DATA_URL,
      encodingType:       this.camera.EncodingType.JPEG,
      sourceType:         this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType:          this.camera.MediaType.PICTURE,
      targetWidth:        1200,
      targetHeight:       1200,
      allowEdit:          false,
      correctOrientation: true
    }

    /*Metodo de captura de imagenes */
    this.camera.getPicture(options).then((imageData) => {
      this.flagPhoto = false;
      /*Se guarada la foto */
      this.photo = imageData;
      /*Se hace saber que si se anexo una foto */
      if(this.photo != '' && this.photo != undefined){
        this.flagPhoto = true;
      }
    }, (err) => {
        this.utilitiesProvider.presentToast('No se seleccionó una imagen', 1500);
    });

  }

  public showPhoto(){
    let modal = this.modalCtrl.create( ModalPhotoPage,  { photo: this.photo }  );
    modal.present();
  }

  public addRtaSug(){

    this.utilitiesProvider.presentActionSheetRespuestasSugerencia('Selecciona').then((data)=>{

      let modal = null;

      if(data == 'rta'){

        if( this.cantidadRespuestas < 4 ){

          modal = this.modalCtrl.create( ModalRespuestaPage);
          modal.onDidDismiss(()=>{
            if( this.teach.getRespuestas() != undefined){
              let rta = this.teach.getRespuestas();
              this.cantidadRespuestas = rta.respuestas.length;
              if( this.cantidadRespuestas >= 4 && this.cantidadSugerencias >= 3){
                this.invalidForm = false;
              }
            }
          });  

          modal.present();

        }else{
          this.utilitiesProvider.presentToast('Ya se adicionaron las respuestas permitidas', 1500);
        }

      }else{
        
        if( this.cantidadSugerencias < 3 ){

          modal = this.modalCtrl.create( ModalSugerenciaPage );

          modal.onDidDismiss(()=>{

            if(this.teach.getSugerencias() != undefined){
              let sug = this.teach.getSugerencias();
              this.cantidadSugerencias = sug.sugerencias.length;
              if( this.cantidadRespuestas >= 4 && this.cantidadSugerencias >= 3){
                this.invalidForm = false;
              }
            }

          });  
          modal.present();
        }else{
          this.utilitiesProvider.presentToast('Ya se adicionaron las sugerencias permitidas', 1500);
        }

      }
    })
  }

  public registerProblem(){
    //SE MUESTRA UN LOADING DE ESPERE
    this.utilitiesProvider.presentLoading('Un momento por favor');
    //SE CONSULTA EL PROVIDER
    this.teach.registrarProblema(
      this.RegisterProblem.value.titulo,
      this.RegisterProblem.value.descripcion,
      this.RegisterProblem.value.pregunta,
      this.photo
    ).then( (data)=>{
      //SE VERIFICA SI HAY UN ERROR
      if(data['error'] == '1'){
        /*Se limpian los campos del formulario */
        this.RegisterProblem.reset();
        this.utilitiesProvider.presentToast('Ha ocurrido un error interno.', 1500);
      }else{
        //SI NO HAY ERROR SE CARGAN LAS RESPUESTAS
        let rta = this.teach.getRespuestas();
        //SE RECORRE EL ARREGLO DE RESPUESTAS
        for (let index = 0; index < this.cantidadRespuestas ; index++) {
          //SE LLAMA EL PROVIDER 
          this.teach.registrarRespuestas(rta.respuestas[index].descripcion, rta.respuestas[index].correcta, data['id'] ).then((dataAnswer)=>{
            //SI ES LA ULTIMA RESPUESTA SE INSERTAN LAS SUGERENCIAS
            if( index == this.cantidadRespuestas-1){
              //SE CARGAN LAS SUGERENCIAS
              let sug = this.teach.getSugerencias();
              //SE RECORRE EL ARREGLO DE SUGERENCIAS
              for (let j = 0; j < this.cantidadSugerencias ; j++) {
                //SE LLAMA EL PROVIDER
                this.teach.registrarSugerencia(sug.sugerencias[j].descripcion, data['id']).then((dataSug)=>{
                    //SI ES LA ULTIMA SUGERENCIA ENVIADA
                    if( j == this.cantidadSugerencias-1 ){
                      //SE CIERRA EÑ LOADING DE ESPERE 
                      this.utilitiesProvider.closePresentLoading();
                      //SE LIMPIAN LOS CAMPOS DEL FORMULARIO
                      this.RegisterProblem.reset();
                      //SE MUESTRA UNA ALERTA CON EL PIN DEL PROBLEMA
                      this.utilitiesProvider.showAlertBasic('PIN', data['pin'], 'Hecho').then(()=>{
                        //Se resetean los objetos
                        this.teach.resetRespuestas();
                        this.teach.resetSugerencias();
                        //REDIRECCIONAR AL HOME
                        let nav = this.app.getRootNav();
                        nav.setRoot(TabsPage);
                      })

                    }

                });   

              }

            }

          })

        }

      }
    })
  }


}
