import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Modelos de respuestas */
import { ModelRespuestas } from '../../assets/models/model-respuestas';
import { ModelRespuesta } from '../../assets/models/model-respuesta';
/*MOdelos de Sugerencias */
import { ModelSugerencias } from '../../assets/models/model-sugerencias';
import { ModelSugerencia } from '../../assets/models/model-sugerencia';

@Injectable()
export class StudentOperationsProvider {

  /*Variables de modelo respuestas*/
  public respuestas:ModelRespuestas = new ModelRespuestas();
  public respuesta:ModelRespuesta;
  /*Variables de modelo sugerencias*/
  public sugerencias:ModelSugerencias = new ModelSugerencias();
  public sugerencia:ModelSugerencia;

  /*Url Student  problemas*/
  private urlGetProblem:string        = 'https://fortmath.000webhostapp.com/getStudentProblem';
  private urlGetRtaProblem:string     = 'https://fortmath.000webhostapp.com/validateProblem';
  private urlGetSuggestion:string     = 'https://fortmath.000webhostapp.com/getStudentSuggestions';
  private urlGetAnswer:string         = 'https://fortmath.000webhostapp.com/getStudentAnswers';
  private urlRegisterAnwer:string     = 'https://fortmath.000webhostapp.com/registerStudentAnswer';

  constructor(public http: HttpClient) {
    console.log('Hello StudentOperationsProvider Provider');
  }

  /*RECUPERAR LOS DATOS DEL PROBLEMA SELECCIONADO */
  public getProblema(pin:any){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('PIN'          , pin )

    let promesa = new Promise( ( resolve, reject) => {
      this.http.post(this.urlGetProblem,dataBody,{headers}).subscribe( (data)=>{
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
      }
      )
    });
    return promesa;
  }

  /*METOD PARA VALIDAR SI EL USUARIO YA CONTESTO EL PROBLEMA ANTERIORMENTE */
  public getValidateRtaProblema(id_usuario:any, id_problema:any){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('ID_USUARIO'   , id_usuario )
    .set('ID_PROBLEMA'  , id_problema )

    let promesa = new Promise( ( resolve, reject) => {
      this.http.post(this.urlGetRtaProblem,dataBody,{headers}).subscribe( (data)=>{
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
      }
      )
    });
    return promesa;
  }

  /*METODO QUE RECUPERA LAS SUGERENCIAS Y LAS ALMACENA EN UN OBJETO ARREGLO */
  public getSuggestions(id_problema:any){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('ID_PROBLEMA' , id_problema )

    let promesa = new Promise( ( resolve, reject) => {
      //SE INSTANCIA LA CLASE QUE FUNCIONA DE ARREGLO
      this.sugerencias = new ModelSugerencias();
      //SE HACE LA PETICION
      this.http.post(this.urlGetSuggestion,dataBody,{headers}).subscribe( (data)=>{
        /*Se recorre la respuesta en array y se va creando objetos */
        for (let index = 0; index < data['length']; index++) {
          this.sugerencia = new ModelSugerencia(data[index].DESCRIPCION);
          /*Se adicionan los objetos al modelo de arreglo de pines */
          this.sugerencias.addSugerencia(this.sugerencia);
        }
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
      }
      )
    });
    return promesa;
  }

  /*OBTENER SUGERENCIAS DEL OBJETO ARREGLO */
  public getLocalSuggestion(){
    return this.sugerencias;
  }

  /*METODO QUE RECUPERA LAS RESPUESTAS Y LAS ALMACENA EN UN OBJETO ARREGLO */
  public getAnswers(id_problema:any){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('ID_PROBLEMA' , id_problema )

    let promesa = new Promise( ( resolve, reject) => {
      //SE INSTANCIA LA CLASE QUE FUNCIONA DE ARREGLO
      this.respuestas = new ModelRespuestas();
      //SE HACE LA PETICION
      this.http.post(this.urlGetAnswer,dataBody,{headers}).subscribe( (data)=>{
        /*Se recorre la respuesta en array y se va creando objetos */
        for (let index = 0; index < data['length']; index++) {
          this.respuesta = new ModelRespuesta(data[index].DESCRIPCION, data[index].CORRECTA);
          /*Se adicionan los objetos al modelo de arreglo de pines */
          this.respuestas.addRespuesta(this.respuesta);
        }
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
      }
      )
    });
    return promesa;
  }

  /*OBTENER RESPUESTAS DEL OBJETO ARREGLO */
  public getLocalAnswer(){
    return this.respuestas;
  }

  /*REGISTRAR LA RESPUESTA DEL PROBLEMA */
  public registerAnswerStudent(id_usuario:any, id_problema:any, respuesta:any, cantidaSugerencias:any, anexoPolya:any ){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('ID_USUARIO'           , id_usuario )
    .set('ID_PROBLEMA'          , id_problema)
    .set('RESPUESTA'            , respuesta)
    .set('CANTIDAD_SUGERENCIAS' , cantidaSugerencias)
    .set('ANEXO_POLYA'          , anexoPolya);

    let promesa = new Promise( ( resolve, reject) => {
      this.http.post(this.urlRegisterAnwer,dataBody,{headers}).subscribe( (data)=>{
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
