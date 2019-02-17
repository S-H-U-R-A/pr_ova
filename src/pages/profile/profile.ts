import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { ModalUpdateUserPage, LoginPage } from '../index.pages';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public nombres:string   = '';
  public apellidos:string = '';
  public photo:any        = '';

  constructor(
              public navCtrl:   NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public app:       App
  ) {

    /*se cargan los datos del Usuario */
    this.nombres    = localStorage.getItem('name');
    this.apellidos  = localStorage.getItem('lastName');

    if( localStorage.getItem('imageUser') == '' || localStorage.getItem('imageUser') == undefined){
      this.photo      = '../../assets/imgs/user.jpg'
    }else{
      this.photo      = "data:image/png;base64,"+localStorage.getItem('imageUser');
    }

  }

  public updateDataUser(){
    /*Se crea el objeto modal */
    let modal = this.modalCtrl.create( ModalUpdateUserPage );
    modal.onDidDismiss(()=>{
      /*se cargan los datos del Usuario */
      this.nombres    = localStorage.getItem('name');
      this.apellidos  = localStorage.getItem('lastName');
  
      if( localStorage.getItem('imageUser') == '' || localStorage.getItem('imageUser') == undefined){
        this.photo      = '../../assets/imgs/user.jpg'
      }else{
        this.photo      = "data:image/png;base64,"+localStorage.getItem('imageUser');
      }
    });
    /*se muestra el objeto */
    modal.present();
  }

  public cerrarSession(){
    localStorage.clear();
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
