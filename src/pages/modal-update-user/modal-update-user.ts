import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
/*PROVIDERS */
import { UtilitiesProvider } from '../../providers/utilities/utilities';
/*Libreria de formularios */
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/* Provider de atutenticacion */
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/*PLUGIN CAMERA */
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-modal-update-user',
  templateUrl: 'modal-update-user.html',
})
export class ModalUpdateUserPage {

  /*Objeto formulario */
  public formularioUpdateUser : FormGroup;

  /*Data precargada */
  public nombres:string   = '';
  public apellidos:string = '';
  public photo:any        = '';

  /*variable de mensaje de tomar foto */
  public titlePhoto:string = 'Adjunta una foto';

  constructor(
              public navCtrl:           NavController, 
              public navParams:         NavParams,
              public formBuilder:       FormBuilder,
              public viewCtrl:          ViewController,
              public utilitiesProvider: UtilitiesProvider,
              public auth:              AuthServiceProvider,
              public camera:            Camera
  ) {

    /*se cargan los datos del Usuario */
    this.nombres    = localStorage.getItem('name');

    this.apellidos  = localStorage.getItem('lastName');

    if( localStorage.getItem('imageUser') == '' || localStorage.getItem('imageUser') == undefined){
      this.photo      = '';
    }else{
      this.photo      = localStorage.getItem('imageUser');
    }

    /*Objeto del formulario */
    this.formularioUpdateUser = this.formBuilder.group({
      nombres: [this.nombres, Validators.compose(
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$')
        ]
      )],
      apellidos: [this.apellidos, Validators.compose(
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$')
        ]
      )]       
    });

  }

  public cerrarModal(){
    this.viewCtrl.dismiss();
  }

  public takePhoto(){
    this.utilitiesProvider.presentActionSheetReporteConexion('Adjunta una fotografia como avatar').then( (data)=>{
      if( data == 'foto'){
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
      targetWidth:        500,
      targetHeight:       500,
      allowEdit:          false,
      correctOrientation: true
    }

    /*Metodo de captura de imagenes */
    this.camera.getPicture(options).then( (imageData) => {
      /*Se guarada la foto */
      this.photo = imageData;
      /*Se cambia el mensaje porque la foto ya se actualizo */
      this.titlePhoto = 'Avatar modificado'; 
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
      targetWidth:        500,
      targetHeight:       500,
      allowEdit:          false,
      correctOrientation: true
    }

    /*Metodo de captura de imagenes */
    this.camera.getPicture(options).then((imageData) => {
      /*Se guarada la foto */
      this.photo = imageData;
      /*Se cambia el mensaje porque la foto ya se actualizo */
      this.titlePhoto = 'Avatar modificado'; 
    }, (err) => {
        this.utilitiesProvider.presentToast('No se seleccionó una imagen', 1500);
    });

  }

  public updateUser(){
      //SE MUESTRA EL GIF DE CARGANDO
      this.utilitiesProvider.presentLoading('Un momento por favor');
      this.auth.update(
        this.formularioUpdateUser.value.nombres,
        this.formularioUpdateUser.value.apellidos,
        this.photo,
        localStorage.getItem('userId')
      ).then((data)=>{
        if( data['error'] == '1'){
          /*Se limpian los campos del formulario */
          this.formularioUpdateUser.reset();
          //SE OCULTA EL GIF DE CARGANDO
          this.utilitiesProvider.closePresentLoading();
          this.utilitiesProvider.presentToast('Ha ocurrido un error interno', 1500);
        }else{
          this.utilitiesProvider.presentToast('Actualización exitosa.', 1500);
          localStorage.setItem('name',      this.formularioUpdateUser.value.nombres );
          localStorage.setItem('lastName',  this.formularioUpdateUser.value.apellidos );
          localStorage.setItem('imageUser', this.photo);
          /*Se limpian los campos del formulario */
          this.formularioUpdateUser.reset();
          //SE OCULTA EL GIF DE CARGANDO
          this.utilitiesProvider.closePresentLoading();
          this.viewCtrl.dismiss();
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalUpdateUserPage');
  }

}
