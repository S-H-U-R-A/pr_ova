import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*PROVIDERS */
import { UtilitiesProvider } from '../../../providers/utilities/utilities';
import { TeacherOperationsProvider } from '../../../providers/teacher-operations/teacher-operations';
/* MODELO DE ESTUDIANTES */
import { ModelEstudiantesProblema } from '../../../assets/models/model-estudiantesProblema';
/* LIBRERIA DE GRAFICAS */
import { Chart } from 'chart.js';
/*LAYOUT DE DETALLE */
import { DetalleInformePage} from '../../index.pages'

@IonicPage()
@Component({
  selector: 'page-mostrar-informe',
  templateUrl: 'mostrar-informe.html',
})
export class MostrarInformePage {
  /*Se recupera la referencia del canvas */
  @ViewChild('pieCanvas') pieCanvas;
  /* Variable de chart */
  public pieChart: any;
  /*Cantidad de estudiantes que han respuesto el problema */
  public canEstudProb:any;
  /*Cuantos estudiantes han contestado correctamente */
  public canEstudProbCorre:any;
  /*Objeto de estudiantes */
  public estudiantes:ModelEstudiantesProblema;
  /*Bandera si hay estudiantes que respondieron el problema */
  public canEstudiantes:boolean = false;
  /*Bandera para mostrar Contenido */
  public showContent:boolean = false;

  constructor(
              public  navCtrl:            NavController, 
              public  navParams:          NavParams,
              public  utilitiesProvider:  UtilitiesProvider,
              public  teacher:            TeacherOperationsProvider
  ) {
    //SE MUESTRA GIF DE CARGANDO
    this.utilitiesProvider.presentLoading('Cargando...');
    this.teacher.getCantidadesProblema( this.navParams.get('id_problema')).then((data)=>{
      if(data['error'] == 1){
         //SE OCULTA EL GIF DE CARGANDO
         this.utilitiesProvider.closePresentLoading();
         this.utilitiesProvider.presentToast('Ha ocurrido un error interno.', 1500);
      }else{
        if(data['cantidadRtaProblema'] == 0){
          //SE OCULTA EL GIF DE CARGANDO
          this.utilitiesProvider.closePresentLoading();
          //SE MUESTRA LETRERO
          this.canEstudiantes = true;
          //Se muestra el contenido
          this.showContent = true;
        }else{
          //CANTIDADES
          this.canEstudProb       = data['cantidadRtaProblema'];
          this.canEstudProbCorre  = data['cantidadRtaProblemaCorrecta'];
          //SE TRAEN LOS ESTUDIANTES PERTENECIENTES A UN PROBLEMA DETERMINADO
          this.teacher.getStudentProblem( this.navParams.get('id_problema') ).then((data)=>{
            //SE OCULTA EL GIF DE CARGANDO
            this.utilitiesProvider.closePresentLoading();
            this.estudiantes = this.teacher.getLocalStudentProblem();
            //Se muestra el contenido
            this.showContent = true;
            //SE CREA LA GRAFICA DE PIE
            this.pieChart = new Chart(this.pieCanvas.nativeElement, {
                //SE ESPECIFICA EL TIPO DE GRAFICA A MOSTRAR
                type: 'pie',
                data: {
                    labels: ["Correcto", "Incorrecto"],
                    datasets: [{
                        label: 'SSS',
                        data: [this.canEstudProbCorre, this.canEstudProb - this.canEstudProbCorre],
                        backgroundColor: [
                            'rgba(176, 245, 175, 0.8)',
                            'rgba(245, 170, 170, 0.8)'
                        ],
                        hoverBackgroundColor: [
                            "#41CF6C",
                            "#F24848"
                        ]
                    }]
                }

            });

          })
        }
        

      }

    });
  }

  public detalleInforme(id_est:any){
    this.navCtrl.push(DetalleInformePage,{id_estudiante:id_est, id_problema:this.navParams.get('id_problema') })
  }


}
