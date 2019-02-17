import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
/*Libreria de formularios */
import { AbstractControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
/*PROVIDERS */
import { UtilitiesProvider } from '../../../providers/utilities/utilities';
/* Provider de atutenticacion */
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
/*PLUGIN CAMERA */
import { Camera, CameraOptions } from '@ionic-native/camera';
/*LAYOUT MODAL AVATAR */
import { ModalAvatarPage, LoginPage } from '../../index.pages';

/*Validar el password */
function passwordConfirming(c: AbstractControl): any {
  if(!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd= c.parent.get('passwordConfirmed')

  if(!pwd || !cpwd) return ;
  if (pwd.value !== cpwd.value) {
      return { invalid: true };
  }
}

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  /*Objeto formulario */
  public formularioRegister : FormGroup;
  /* Propiedad que retorna el valor del password confirmado */
  public form: FormGroup;
  get cpwd() {
      return this.form.get('passwordConfirmed');
  }
  /* Arreglo de tipo de usuario */
  public typeUSer:any;
  /*Fotografia opcional */
  public photo:string = '' ;
  /*Saber si se adjunto Photo*/
  public flagPhoto:boolean = false;

  constructor(
              public  navCtrl:            NavController, 
              public  navParams:          NavParams,
              private formBuilder:        FormBuilder,
              private modalCtrl:          ModalController,
              public  utilitiesProvider:  UtilitiesProvider,
              public  auth:               AuthServiceProvider,
              private camera:             Camera,
              public  app:                App
  ) {

    /* Se carga los tipos de usuarios validos */
    this.auth.getTypeUser().then( (data) =>{
      this.typeUSer = data;
    });

    /*Objeto del formulario */
    this.formularioRegister = this.formBuilder.group({
      typeUser:['', Validators.compose(
        [
          Validators.required
        ]
      )],
      nombres: ['', Validators.compose(
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$')
        ]
      )],
      apellidos: ['', Validators.compose(
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ-\\s]*$')
        ]
      )],
      email:['', Validators.compose(
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        ]
      )],
      password:['', Validators.compose(
        [
          Validators.required,
          // Validar mayusculas caracteres especiales numeros y minimo 8 y maximo 30
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&=])[A-Za-z\d$@$!%*?&].{8,30}')
        ]
      )],
      passwordConfirmed:['', Validators.compose(
        [
          Validators.required,
          passwordConfirming
        ]
      )],
             
    });

  }

  public takePhoto(){
    this.utilitiesProvider.presentActionSheetReporteConexion('Adjunta una fotografia como avatar').then((data)=>{
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
      targetWidth:        500,
      targetHeight:       500,
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
      targetWidth:        500,
      targetHeight:       500,
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
    let modal = this.modalCtrl.create( ModalAvatarPage,  { photo: this.photo }  );
    modal.present();
  }

  public registrarse(){

    this.auth.register(
      this.formularioRegister.value.typeUser,
      this.formularioRegister.value.nombres,
      this.formularioRegister.value.apellidos,
      this.formularioRegister.value.email,
      this.formularioRegister.value.password,
      this.photo
    ).then( ( dataRegister )=>{
      /*Se limpian los campos del formulario */
      this.formularioRegister.reset();
      if( dataRegister['error'] == '1'){
        this.utilitiesProvider.presentToast('El usuario ya esta registrado', 1500);
      }else{
        this.utilitiesProvider.presentToast('Registro exitoso.', 1500);
        let nav = this.app.getRootNav();
        nav.setRoot(LoginPage);
      }
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
