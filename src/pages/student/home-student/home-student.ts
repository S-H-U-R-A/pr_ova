import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  constructor(
              public navCtrl:       NavController, 
              public navParams:     NavParams,
              private domSanitizer: DomSanitizer
  ) {

    /*SE evitan agujeros de seguridad en los video*/
    this.videoAyudasOne   = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/MCbKYBUeE3U');
    this.videoAyudasTwo   = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/qeKEA066OSs');
    this.videoAyudasThree = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/yWAAzjLkJYo');
    this.videoAyudasFour  = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/0pUnHF1FJ2s');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeStudentPage');
  }

}
