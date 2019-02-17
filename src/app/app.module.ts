import { NgModule, ErrorHandler }     from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule }           from '@angular/common/http';
import { MyApp }                      from './app.component';

/*PLUGINS NATIVOS */
import { StatusBar }                  from '@ionic-native/status-bar';
import { SplashScreen }               from '@ionic-native/splash-screen';
import { IonicStorageModule }         from '@ionic/storage';

/*PLUGIN TERCEROS */
import { Camera } from '@ionic-native/camera';

/*MENU TABS DE LA APP */
import { TabsPage }                   from '../pages/tabs/tabs';
/*LAYOUTS DE LA APP */
import { 
          LoginPage, 
          RegisterPage, 
          HomeStudentPage,
          HomeTeacherPage,
          TeacherProblemPage,
          StudentProblemPage,
          ProfilePage,
          ModalAvatarPage,
          ModalUpdateUserPage
} from '../pages/index.pages';


/*PROVIDER */
import { AuthServiceProvider }        from '../providers/auth-service/auth-service';
import { UtilitiesProvider } from '../providers/utilities/utilities';

@NgModule({
  declarations: [
    MyApp,
    LoginPage, 
    RegisterPage, 
    HomeStudentPage,
    HomeTeacherPage,
    TeacherProblemPage,
    StudentProblemPage,
    ProfilePage,
    ModalAvatarPage,
    ModalUpdateUserPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      platforms: {
          android: {
            tabsPlacement: 'top'
          }
      },
      //backButtonText: '',
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage, 
    RegisterPage, 
    HomeStudentPage,
    HomeTeacherPage,
    TeacherProblemPage,
    StudentProblemPage,
    ProfilePage,
    ModalAvatarPage,
    ModalUpdateUserPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    UtilitiesProvider
  ]
})
export class AppModule {}
