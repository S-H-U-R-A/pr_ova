import { Component } from '@angular/core';
import { timer }        from 'rxjs/observable/timer';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
/*PROVIDERS */
import { UtilitiesProvider } from '../../../providers/utilities/utilities';

@IonicPage()
@Component({
  selector: 'page-home-student',
  templateUrl: 'home-student.html',
})
export class HomeStudentPage {

  public videoAyudasOne:SafeResourceUrl;
  public videoAyudasTwo:SafeResourceUrl;
  public videoAyudasThree:SafeResourceUrl;
  public videoAyudasFour:SafeResourceUrl;

  /*Bandera para mostrar Contenido */
  public showContent:boolean = false;
  /*Variable bandera de clase */
  public claseOculta:string = 'oculto';

  constructor(
              public navCtrl:             NavController, 
              public navParams:           NavParams,
              public  utilitiesProvider:  UtilitiesProvider,
              private domSanitizer:       DomSanitizer
  ) {
    //SE MUESTRA GIF DE CARGANDO
    this.utilitiesProvider.presentLoading('Cargando...');
    /*SE evitan agujeros de seguridad en los video*/
    this.videoAyudasOne   = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/MCbKYBUeE3U');
    this.videoAyudasTwo   = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/qeKEA066OSs');
    this.videoAyudasThree = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/yWAAzjLkJYo');
    this.videoAyudasFour  = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/0pUnHF1FJ2s');

    timer(3500).subscribe( () => {
      //Se muestra el contenido
      this.showContent = true;
      //Se muestra el contenido oculto por la clase
      this.claseOculta = 'mostrar';
      /*Se limpian los campos del formulario */
      this.utilitiesProvider.closePresentLoading();
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeStudentPage');
  }

}
