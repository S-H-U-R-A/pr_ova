import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-photo',
  templateUrl: 'modal-photo.html',
})
export class ModalPhotoPage {

  public photo:string;

  constructor(
    public navCtrl:   NavController, 
    public navParams: NavParams,
    public viewCtrl:  ViewController
  ) {
  /*Se obtiene el parametro de la foto */
  this.photo = "data:image/jpeg;base64,"+this.navParams.get('photo');
  }

  public cerrarModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPhotoPage');
  }

}
