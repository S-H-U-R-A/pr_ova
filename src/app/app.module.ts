import { NgModule, ErrorHandler }     from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule }           from '@angular/common/http';
import { MyApp }                      from './app.component';

/*PLUGINS NATIVOS */
import { StatusBar }                  from '@ionic-native/status-bar';
import { SplashScreen }               from '@ionic-native/splash-screen';
import { IonicStorageModule }         from '@ionic/storage';

/*MENU TABS DE LA APP */
import { TabsPage }                   from '../pages/tabs/tabs';
/*LAYOUTS DE LA APP */
import { 
          LoginPage, 
          RegisterPage, 
          HomeStudentPage,
          ProfileStudentPage,
          HomeTeacherPage,
          ProfileTeacherPage
} from '../pages/index.pages';


/*PROVIDER */
import { AuthServiceProvider }        from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage, 
    RegisterPage, 
    HomeStudentPage,
    ProfileStudentPage,
    HomeTeacherPage,
    ProfileTeacherPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      tabsPlacement: 'bottom',
      platforms: {
          android: {
            tabsPlacement: 'top'
          }
      },
      backButtonText: '',
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage, 
    RegisterPage, 
    HomeStudentPage,
    ProfileStudentPage,
    HomeTeacherPage,
    ProfileTeacherPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
