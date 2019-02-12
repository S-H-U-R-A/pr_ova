import { Component }    from '@angular/core';
import { Platform }     from 'ionic-angular';
import { StatusBar }    from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage }      from '@ionic/storage';

/*LAYOUT OF AUTH */
import { LoginPage} from '../pages/index.pages';
/*LAYOUTS DE LA APP */
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  public rootPage:any;

  constructor(
              public  platform:     Platform, 
              public  statusBar:    StatusBar, 
              public  splashScreen: SplashScreen,
              public  storage:      Storage, 
  ) {

    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.get('sesion').then((value)=>{
        if( value == true && value != undefined || value != null){
          this.rootPage = TabsPage;
        }else{
          console.log('NO EXISTE SESSION');
          this.rootPage = LoginPage;
        }
      })

    });
  }

}
