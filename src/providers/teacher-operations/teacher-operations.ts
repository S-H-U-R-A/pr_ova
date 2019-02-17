import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Modelos de respuestas */
import { ModelRespuestas } from '../../assets/models/model-respuestas';
import { ModelRespuesta } from '../../assets/models/model-respuesta';
/*MOdelos de Sugerencias */
import { ModelSugerencias } from '../../assets/models/model-sugerencias';
import { ModelSugerencia } from '../../assets/models/model-sugerencia';

@Injectable()
export class TeacherOperationsProvider {

  /*Variables de modelo respuestas*/
  public respuestas:ModelRespuestas = new ModelRespuestas();;
  public respuesta:ModelRespuesta;
  /*Variables de modelo sugerencias*/
  public sugerencias:ModelSugerencias = new ModelSugerencias();;
  public sugerencia:ModelSugerencia;

  /*Url Profesor registrar problemas*/
  private urlRegisterProblem:string     = 'https://fortmath.000webhostapp.com/registerProblems';
  private urlRegisterAnswer:string      = 'https://fortmath.000webhostapp.com/registerAnswers';
  private urlRegisterSuggestion:string  = 'https://fortmath.000webhostapp.com/registerSuggestion';

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

}
