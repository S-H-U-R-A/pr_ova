import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Modelos de respuestas */
import { ModelRespuestas } from '../../assets/models/model-respuestas';
import { ModelRespuesta } from '../../assets/models/model-respuesta';
/*Modelos de Sugerencias */
import { ModelSugerencias } from '../../assets/models/model-sugerencias';
import { ModelSugerencia } from '../../assets/models/model-sugerencia';
/*Modelos de problemas */
import { ModelProblemas } from '../../assets/models/model-problemas';
import { ModelProblema } from '../../assets/models/model-problema';
/*Modelo de estudiantes */
import { ModelEstudiantesProblema } from '../../assets/models/model-estudiantesProblema';
import { ModelEstudianteProblema } from '../../assets/models/model-estudianteProblema';

@Injectable()
export class TeacherOperationsProvider {

  /*Variables de modelo respuestas*/
  public respuestas:ModelRespuestas = new ModelRespuestas();
  public respuesta:ModelRespuesta;
  /*Variables de modelo sugerencias*/
  public sugerencias:ModelSugerencias = new ModelSugerencias();
  public sugerencia:ModelSugerencia;
  /*Variables de modelo problema*/
  public problems:ModelProblemas;
  public problem:ModelProblema;
  /*Variables de modelo estudiantes */
  public estudiantes:ModelEstudiantesProblema;
  public estudiante:ModelEstudianteProblema;

  /*Url Profesor registrar problemas*/
  private urlRegisterProblem:string     = 'https://fortmath.000webhostapp.com/registerProblems';
  private urlRegisterAnswer:string      = 'https://fortmath.000webhostapp.com/registerAnswers';
  private urlRegisterSuggestion:string  = 'https://fortmath.000webhostapp.com/registerSuggestion';
  private urlTeacherProblems:string     = 'https://fortmath.000webhostapp.com/teacherProblems';
  private urlInfoProblema:string        = 'https://fortmath.000webhostapp.com/infoProblem';
  private urlGetStudents:string         = 'https://fortmath.000webhostapp.com/getStudentTeacherProblem';
  private urlGetDataStuden:string       = 'https://fortmath.000webhostapp.com/getOnlyStudentProblem';
  private urlUpdateFeedback:string      = 'https://fortmath.000webhostapp.com/updateFeedBackProblem';


  constructor(public http: HttpClient) {
    console.log('Hello TeacherOperationsProvider Provider');
  }

  public agregarRespuesta(descripcion, correcta){
    let promesa = new Promise( (resolve,reject)=>{
      this.respuesta = new ModelRespuesta(descripcion, correcta);
      this.respuestas.addRespuesta(this.respuesta);
      resolve(true);
    });
    return promesa; 
  }

  public getRespuestas(){
    return this.respuestas;
  }

  public agregarSugerencia(descripcion){
    let promesa = new Promise( (resolve,reject)=>{
      this.sugerencia = new ModelSugerencia(descripcion);
      this.sugerencias.addSugerencia(this.sugerencia);
      resolve(true);
    });
    return promesa;
  }

  public getSugerencias(){
    return this.sugerencias;
  }

  public registrarProblema(titulo:any, descripcion:any, pregunta:any, photo:any){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('TITULO'          , titulo )
    .set('DESCRIPCION'     , descripcion)
    .set('PREGUNTA'        , pregunta)
    .set('IMAGEN'          , photo)
    .set('ID_USUARIO'      , localStorage.getItem('userId'));

    let promesa = new Promise( ( resolve, reject) => {
      this.http.post(this.urlRegisterProblem,dataBody,{headers}).subscribe( (data)=>{
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
      }
      )
    });
    return promesa;
  }

  public registrarRespuestas(descripcion, correcta, id_problema){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('DESCRIPCION'  , descripcion )
    .set('CORRECTA'     , correcta)
    .set('ID_PROBLEMA'  , id_problema)

    let promesa = new Promise( ( resolve, reject) => {
      this.http.post(this.urlRegisterAnswer,dataBody,{headers}).subscribe( (data)=>{
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
      }
      )
    });
    return promesa;
  }

  public registrarSugerencia(descripcion, id_problema){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('DESCRIPCION'  , descripcion )
    .set('ID_PROBLEMA'  , id_problema)

    let promesa = new Promise( ( resolve, reject) => {
      this.http.post(this.urlRegisterSuggestion,dataBody,{headers}).subscribe( (data)=>{
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
      }
      )
    });
    return promesa;
  }

  public resetRespuestas(){
    this.respuestas = new ModelRespuestas();;
  }

  public resetSugerencias(){
    this.sugerencias = new ModelSugerencias();
  }

  public getProblemsTeacher(id_usuario:any){
     /*Headers para peticiones externas */
     const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     /*Cuerpo de los datos para la petición */
     const dataBody = new HttpParams()
     .set('ID_USUARIO' , id_usuario )
 
     let promesa = new Promise( ( resolve, reject) => {
       //SE INSTANCIA LA CLASE QUE FUNCIONA DE ARREGLO
       this.problems = new ModelProblemas();
       //SE HACE LA PETICION
       this.http.post(this.urlTeacherProblems,dataBody,{headers}).subscribe( (data)=>{
         /*Se recorre la respuesta en array y se va creando objetos */
         for (let index = 0; index < data['length']; index++) {
           this.problem = new ModelProblema(
                              data[index].ID, 
                              data[index].PIN,
                              data[index].TITULO,
                              data[index].DESCRIPCION,
                              data[index].IMAGEN,
                              data[index].PREGUNTA,
                              data[index].FECHA,
                              data[index].OBSERVACIONES
            );
           /*Se adicionan los objetos al modelo de arreglo de pines */
           this.problems.addProblema(this.problem);
         }
         resolve(true);
       }, 
       error => {
         reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
       }
       )
     });
     return promesa;
  }

  public getLocalProblemsTeacher(){
    return this.problems;
  }

  public getCantidadesProblema(id_problema:any){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('ID_PROBLEMA' , id_problema )

    let promesa = new Promise( ( resolve, reject) => {
      //SE HACE LA PETICION
      this.http.post(this.urlInfoProblema,dataBody,{headers}).subscribe( (data)=>{
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
      }
      )
    });
    return promesa;
  }

  public getStudentProblem(id_problema:any){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('ID_PROBLEMA' , id_problema )

    let promesa = new Promise( ( resolve, reject) => {
      //SE INSTANCIA LA CLASE QUE FUNCIONA DE ARREGLO
      this.estudiantes = new ModelEstudiantesProblema();
      //SE HACE LA PETICION
      this.http.post(this.urlGetStudents,dataBody,{headers}).subscribe( (data)=>{
        /*Se recorre la respuesta en array y se va creando objetos */
        for (let index = 0; index < data['length']; index++) {
          this.estudiante = new ModelEstudianteProblema(
                             data[index].ID, 
                             data[index].NOMBRES,
                             data[index].APELLIDOS,
                             data[index].AVATAR
           );
          /*Se adicionan los objetos al modelo de arreglo de pines */
          this.estudiantes.addEstudiante(this.estudiante);
        }
        resolve(true);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
      }
      )
    });
    return promesa;
  }

  public updateFeedbackProblem(observaciones:any, id_problema:any){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('OBSERVACIONES'  , observaciones )
    .set('ID'     , id_problema)

    let promesa = new Promise( ( resolve, reject) => {
      this.http.post(this.urlUpdateFeedback,dataBody,{headers}).subscribe( (data)=>{
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
      }
      )
    });
    return promesa;
  }

  public getLocalStudentProblem(){
    return this.estudiantes;
  }

  public getDataStudent(id_problema:any, id_usuario:any){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('ID_PROBLEMA'  , id_problema )
    .set('ID_USUARIO'   , id_usuario )

    let promesa = new Promise( ( resolve, reject) => {
      //SE HACE LA PETICION
      this.http.post(this.urlGetDataStuden,dataBody,{headers}).subscribe( (data)=>{
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
      }
      )
    });
    return promesa;
  }

}
