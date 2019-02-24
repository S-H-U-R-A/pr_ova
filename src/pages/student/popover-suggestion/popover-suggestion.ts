import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/*PROVIDERS */
import { UtilitiesProvider } from '../../../providers/utilities/utilities';

@IonicPage()
@Component({
  selector: 'page-popover-suggestion',
  templateUrl: 'popover-suggestion.html',
})
export class PopoverSuggestionPage {

  public arraySugerencias:any;

  constructor(
              public  navCtrl:            NavController, 
              public  navParams:          NavParams,
              public  viewCtrl:           ViewController,
              public  utilitiesProvider:  UtilitiesProvider,
  ) {
    /*Se recuperan las sugerencias */
    this.arraySugerencias = this.navParams.get('data');
  }

  public mostrarSugerencias(suggestion:any, index:any){

    //SE RETORNA EL INDICE DE LA SUGERENCIA SELECCIONADA
    if( index == 1){
      this.viewCtrl.dismiss({data:1});
    }else if( index == 2 ){
      this.viewCtrl.dismiss({data:2});
    }else if( index == 3){
      this.viewCtrl.dismiss({data:3});
    }
    //SE MUESTRA UN MENSAJE TOAST CON LA SUGERENCIA
    this.utilitiesProvider.presentToast(suggestion, 10000, true);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverSuggestionPage');
  }

}
