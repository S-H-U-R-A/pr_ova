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
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { IonicImageViewerModule } from 'ionic-img-viewer';


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
          StudentProblemPageOnePage,
          StudentProblemTwoPage,
          PopoverSuggestionPage,
          ProfilePage,
          ModalAvatarPage,
          ModalPhotoPage,
          ModalUpdateUserPage,
          ModalRespuestaPage,
          ModalSugerenciaPage, 
          MostrarInformePage,
          DetalleInformePage
} from '../pages/index.pages';


/*PROVIDER */
import { AuthServiceProvider }        from '../providers/auth-service/auth-service';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { TeacherOperationsProvider } from '../providers/teacher-operations/teacher-operations';
import { StudentOperationsProvider } from '../providers/student-operations/student-operations';

@NgModule({
  declarations: [
    MyApp,
    LoginPage, 
    RegisterPage, 
    HomeStudentPage,
    HomeTeacherPage,
    TeacherProblemPage,
    StudentProblemPage,
    StudentProblemPageOnePage,
    StudentProblemTwoPage,
    PopoverSuggestionPage,
    ProfilePage,
    ModalAvatarPage,
    ModalPhotoPage,
    ModalUpdateUserPage,
    ModalRespuestaPage,
    ModalSugerenciaPage,
    MostrarInformePage,
    DetalleInformePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageViewerModule,
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
    StudentProblemPageOnePage,
    StudentProblemTwoPage,
    PopoverSuggestionPage,
    ProfilePage,
    ModalAvatarPage,
    ModalPhotoPage,
    ModalUpdateUserPage,
    ModalRespuestaPage,
    ModalSugerenciaPage,
    MostrarInformePage,
    DetalleInformePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    UtilitiesProvider,
    TeacherOperationsProvider,
    StudentOperationsProvider
  ]
})
export class AppModule {}
