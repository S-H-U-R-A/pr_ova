import { Component } from '@angular/core';
import { Storage }      from '@ionic/storage';

import { App } from 'ionic-angular';
/*LAYOUTS APP */
import { HomeStudentPage, HomeTeacherPage, ProfileStudentPage, ProfileTeacherPage, LoginPage} from '../index.pages';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  public tab1Root;
  public tab2Root;

  constructor( 
              public  app:        App,
              public  storage:    Storage,
  ) {

      this.storage.get('typeUSer').then((value)=>{

        if( value != undefined && value != null ){
          
          if(value === 'PROFESOR'){

            this.tab1Root = HomeTeacherPage;
            this.tab2Root = ProfileTeacherPage;

          }else if( value === 'ESTUDIANTE' ){

            this.tab1Root = HomeStudentPage;
            this.tab2Root = ProfileStudentPage;

          }

        }else{
          console.log('NO EXISTE SESSION');
          let nav = this.app.getRootNav();
          nav.setRoot(LoginPage);
        }

      })

  }
}
