import { Component }    from '@angular/core';
import { Platform }     from 'ionic-angular';
import { StatusBar }    from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
              public  platform:             Platform, 
              public  statusBar:            StatusBar, 
              public  splashScreen:         SplashScreen
  ) {

    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      if( localStorage.getItem('sesion') == 'true'){
        this.rootPage = TabsPage;
      }else{
        this.rootPage = LoginPage;
      }



    });
  }

}
