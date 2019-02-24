import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*PROVIDERS */
import { UtilitiesProvider } from '../../../providers/utilities/utilities';
import { TeacherOperationsProvider } from '../../../providers/teacher-operations/teacher-operations';


@IonicPage()
@Component({
  selector: 'page-detalle-informe',
  templateUrl: 'detalle-informe.html',
})
export class DetalleInformePage {

  /*Datos del usuario */
  public nombres:string;
  public cantidadSugerencias:number;
  public correcta:any;
  public image:string= 'assets/imgs/landscape.png';

  /*Bandera para mostrar Contenido */
  public showContent:boolean = false;

  constructor(
              public navCtrl:             NavController, 
              public navParams:           NavParams,
              public  utilitiesProvider:  UtilitiesProvider,
              public  teacher:            TeacherOperationsProvider
  ) {
      //SE MUESTRA GIF DE CARGANDO
      this.utilitiesProvider.presentLoading('Cargando...');
      this.teacher.getDataStudent(this.navParams.get('id_problema'), this.navParams.get('id_estudiante')).then((dataStudent)=>{
        //SE ASIGNAN LOS DATOS DEL ESTUDIANTE
        this.nombres = dataStudent[0].NOMBRES + ' ' + dataStudent[0].APELLIDOS;
        this.cantidadSugerencias = dataStudent[0].CANTIDAD_SUGERENCIAS;
        //SE VALIDA EL VALOR DE LA RESPUESTA
        if( dataStudent[0].CORRECTA != 1){
          this.correcta = 'Incorrecta';
        }else{
          this.correcta = 'Correcta';
        }
        //SE VALIDA SI SI EXISTE UNA FOTO
        if( dataStudent[0].ANEXO_POLYA != ''){
          this.image = "data:image/jpeg;base64,"+dataStudent[0].ANEXO_POLYA;
        }
        //Se muestra el contenido
        this.showContent = true;
        //SE OCULTA EL GIF DE CARGANDO
        this.utilitiesProvider.closePresentLoading();

      });
  }

}
