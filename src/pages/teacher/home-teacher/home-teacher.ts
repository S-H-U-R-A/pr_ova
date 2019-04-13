import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*PROVIDERS */
import { UtilitiesProvider } from '../../../providers/utilities/utilities';
import { TeacherOperationsProvider } from '../../../providers/teacher-operations/teacher-operations';
/*MODELOS */
import { ModelProblemas } from '../../../assets/models/model-problemas';
import { MostrarInformePage } from '../../index.pages';

@IonicPage()
@Component({
  selector: 'page-home-teacher',
  templateUrl: 'home-teacher.html',
})
export class HomeTeacherPage {
  /*Objeto con problemas propuestos */
  public problemas:ModelProblemas;
  /*Bandera para mostrar Contenido */
  public showContent:boolean  = false;
  /* Mostrar msj de que no hay problemas */
  public showError:boolean    = false;

  constructor(
              public  navCtrl:            NavController, 
              public  navParams:          NavParams,
              public  utilitiesProvider:  UtilitiesProvider,
              public  teacher:            TeacherOperationsProvider
  ) {
      // //SE MUESTRA GIF DE CARGANDO
      // this.utilitiesProvider.presentLoading('Cargando...');
      // /*Se consultan los problemas propuestos */
      // this.teacher.getProblemsTeacher(localStorage.getItem('userId')).then((data)=>{
      //   if(data){
      //     //SE CIERRA EL GIF DE CARGANDO
      //     this.utilitiesProvider.closePresentLoading();
      //     this.problemas = this.teacher.getLocalProblemsTeacher();

      //     if(this.problemas.problemas.length > 0){
      //       //Se muestra el contenido
      //       this.showContent = true;
      //     }else{
      //       this.showError  = true;
      //     }

      //   }else{
      //     //SE CIERRA EL GIF DE CARGANDO
      //     this.utilitiesProvider.closePresentLoading();
      //   }
      // })
  }

  public mostrarInforme(id_problema:any, observaciones:any){
    this.navCtrl.push(MostrarInformePage, {id_problema:id_problema, observaciones:observaciones})
  }

  public ionViewWillEnter(){
    //SE MUESTRA GIF DE CARGANDO
    this.utilitiesProvider.presentLoading('Cargando...');
    /*Se consultan los problemas propuestos */
    this.teacher.getProblemsTeacher(localStorage.getItem('userId')).then((data)=>{
      if(data){
        //SE CIERRA EL GIF DE CARGANDO
        this.utilitiesProvider.closePresentLoading();
        this.problemas = this.teacher.getLocalProblemsTeacher();

        if(this.problemas.problemas.length > 0){
          //Se muestra el contenido
          this.showContent = true;
        }else{
          this.showError  = true;
        }

      }else{
        //SE CIERRA EL GIF DE CARGANDO
        this.utilitiesProvider.closePresentLoading();
      }
    })
  }

}
