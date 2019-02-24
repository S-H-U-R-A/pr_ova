import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
/*PROVIDERS */
import { UtilitiesProvider } from '../../../providers/utilities/utilities';
import { StudentOperationsProvider } from '../../../providers/student-operations/student-operations';
/*PLUGIN CAMERA */
import { Camera, CameraOptions } from '@ionic-native/camera';
/*LAYOUT MODAL AVATAR */
import { ModalPhotoPage } from '../../index.pages';
/*ROOT DE LA APP */
import { TabsPage } from '../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-student-problem-two',
  templateUrl: 'student-problem-two.html',
})
export class StudentProblemTwoPage {

  /*Fotografia opcional */
  public photo:string = '' ;
  /*Saber si se adjunto Photo*/
  public flagPhoto:boolean = false;

  constructor(
              public  navCtrl:            NavController, 
              public  navParams:          NavParams,
              private modalCtrl:          ModalController,
              private camera:             Camera,
              public  utilitiesProvider:  UtilitiesProvider,
              public  student:            StudentOperationsProvider,
              public  app:                App
  ) {
    console.log(this.navParams);
  }

  public takePhoto(){
    this.utilitiesProvider.presentActionSheetReporteConexion('Adjunta una fotografia como evidencia').then((data)=>{
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
      targetWidth:        1920,
      targetHeight:       1080,
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
      targetWidth:        1920,
      targetHeight:       1080,
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

  public registrarRespuesta(){
    //GIF DE CARGANDO
    this.utilitiesProvider.presentLoading('Un momento por favor');
    //SE REGISTRA LA RESPUESTA
    this.student.registerAnswerStudent(
      this.navParams.get('id_user'),
      this.navParams.get('id_problema'),
      this.navParams.get('respuesta'),
      this.navParams.get('cantidaSugerencias'),
      this.photo
    ).then((data)=>{
      if(data['error'] == '1'){
        this.utilitiesProvider.presentToast('Ha ocurrido un error interno.', 1500);
      }else{
        //SE OCULTA EL GIF DE CARGANDO
        this.utilitiesProvider.closePresentLoading();
        this.utilitiesProvider.presentToast('Registro exitoso.', 1500);
        //REDIRECCIONAR AL HOME
        let nav = this.app.getRootNav();
        nav.setRoot(TabsPage);
      }
    })
  }

}
