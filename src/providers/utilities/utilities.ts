import { Injectable } from '@angular/core';
import { LoadingController, Platform,  AlertController, ToastController, ActionSheetController  } from 'ionic-angular';

@Injectable()
export class UtilitiesProvider {

  public loading: any;
  public alert:   any;
  public toast:   any;

  constructor(
              public  loadingCtrl:              LoadingController,
              public  alertCtrl:                AlertController,
              public  toastCtrl:                ToastController,
              public  actionSheetCtrl:          ActionSheetController,
              private platform:                 Platform,
  ) {
    console.log('Hello UtilitiesProvider Provider');
  }

  /*Metodo que muestra el cargador de espera */
  public presentLoading(message:string){
    /*Observable para la accion de volver atras boton fisico */
    let subscription:any;
    /*Se crea el loading */
    this.loading = this.loadingCtrl.create({
      content: message,
    })
    /*Se detecta cuando el loading ha sido creado */
    this.loading.willEnter.subscribe(() => {
      subscription = this.platform.registerBackButtonAction(() => {
        console.log('Se evita que pueda volver LOADING');
      }, 10);
    });
    /*Se invoca cuando la alerta va a desaparercer */
    this.loading.onDidDismiss(() => {
      subscription();
    });
    /*Se muestra la alerta */
    this.loading.present();

  }
  /*Metodo que cierra el cargador de espera */
  public closePresentLoading(){
    this.loading.dismiss();
  }
  /*Metodo que muestra una alerta basica y retorna una promesa que se resuelve al hacer click en el boton */
  public showAlertBasic(tittle:string, subtitle:string, button?:string ){

    let promesa = new Promise( (resolve) =>{
      this.alert = this.alertCtrl.create({
        title: tittle,
        subTitle: subtitle,
        buttons: [{
          text: button,
          handler: () => {
            resolve(true);
          }
        }],
      });
      this.alert.present();
    });

    return promesa;
    
  }
  /*Metodo que muestra un mensaje toast */
  public presentToast(message:string, duration:number){
    /*Se crea una promesa para saber cuando termina de mostrarse el toast */
    let promesa = new Promise((resolve)=>{
      /*Observable para la accion de volver atras boton fisico */
      let subscription:any;
      /*Se crea el toast */
      this.toast = this.toastCtrl.create({
        message:  message,
        duration: duration
      })
      /*Se detecta cuando el toast ha sido creado */
      this.toast.willEnter.subscribe(()=>{
        subscription = this.platform.registerBackButtonAction(() => {
          console.log('Se evita que pueda volver TOAST');
        }, 10);
      })
      /*Se presenta el mensaje toast */
      this.toast.present();
      this.toast.onDidDismiss(() => {
        subscription();
        resolve(true);
      });
    });

    return promesa;
  }



}
