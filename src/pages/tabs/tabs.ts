import { Component } from '@angular/core';
import { App, NavParams } from 'ionic-angular';
/*LAYOUTS APP */
import { HomeStudentPage, HomeTeacherPage, TeacherProblemPage, StudentProblemPage, ProfilePage} from '../index.pages';
/*PROVIDERS */
import { UtilitiesProvider } from '../../providers/utilities/utilities';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  public tabs: any[] = [
    { title: "Problemas", root: StudentProblemPage, icon: "ios-thunderstorm-outline" },
    { title: "Inicio",    root: HomeStudentPage, icon: "home" },
    { title: "Perfil",    root: ProfilePage,     icon: "contact" },

  ];

  constructor( 
              public  app:                App,
              public  navParams:          NavParams,
              public  utilitiesProvider:  UtilitiesProvider
  ) { 
      
      if( localStorage.getItem('typeUSer') == 'ESTUDIANTE' ){
        this.tabs[0].root = StudentProblemPage;
        this.tabs[1].root = HomeStudentPage;
      }else {
        this.tabs[0].root = TeacherProblemPage;
        this.tabs[1].root = HomeTeacherPage;
      }


  }

}
