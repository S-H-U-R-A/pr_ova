import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthServiceProvider {

  /*URL TIPO DE USUARIO*/
  private urlTypeUser:string  = 'http://localhost/PR_OVA/typeUser';
  /*URL LOGIN*/
  private urlLogin:string     = 'http://localhost/PR_OVA/login';
  /*URL REGISTER */
  private urlRegister:string  = 'http://localhost/PR_OVA/register';
  /*URL UPDATE USER */
  private urlUpdate:string    = 'http://localhost/PR_OVA/updateInfoUser';

  constructor(
              public  http:       HttpClient
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }

  public getTypeUser(){

    let promesa = new Promise( (resolve,reject) => {
      this.http.get(this.urlTypeUser).subscribe((data)=>{
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet: '+error);
      }
      )
    });

    return promesa;

  }

  public login(correo:any, pass:any, typeUser:any){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('EMAIL'                , correo)
    .set('PASS'                 , pass)
    .set('TYPEUSER'             , typeUser)
    
    let promesa = new Promise( ( resolve, reject) => {
      this.http.post(this.urlLogin,dataBody,{headers}).subscribe((data)=>{
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al iniciar session: '+error);
      }
      )
    });

    return promesa;

  }

  public register(typeUser:any, nombres:any, apellidos:any, email:any, password:any, photo:any){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('NOMBRES'          , nombres )
    .set('APELLIDOS'        , apellidos)
    .set('EMAIL'            , email)
    .set('PASS'             , password)
    .set('AVATAR'           , photo)
    .set('ID_TIPO_USUARIO'  , typeUser)
    
    let promesa = new Promise( ( resolve, reject) => {
      this.http.post(this.urlRegister,dataBody,{headers}).subscribe( (data)=>{
        resolve(data);
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet al registrar: ' + error);
      }
      )
    });

    return promesa;

  }

  public update(nombres:any, apellidos:any, photo:any, userId:any){
    /*Headers para peticiones externas */
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    /*Cuerpo de los datos para la petición */
    const dataBody = new HttpParams()
    .set('NOMBRES'          , nombres )
    .set('APELLIDOS'        , apellidos)
    .set('AVATAR'           , photo)
    .set('ID'               , userId)
    
    let promesa = new Promise( ( resolve, reject) => {
      this.http.post(this.urlUpdate,dataBody,{headers}).subscribe( (data)=>{
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
