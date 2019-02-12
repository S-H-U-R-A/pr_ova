import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*Provider para almacenamiento interno */
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthServiceProvider {

  /*URL TIPO DE USUARIO*/
  private urlTypeUser:string = 'http://localhost/PR_OVA/typeUser';

  constructor(
              public  http:       HttpClient,
              public  storage:    Storage
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }

  public getTypeUser(){

    let promesa = new Promise( (resolve,reject) => {
      this.http.get(this.urlTypeUser).subscribe((data)=>{
        //resolve(data);
        console.log(data)
      }, 
      error => {
        reject('Error al consultar el servicio, verifique su conexión a internet: '+error);
      }
      )
    });

    return promesa;

  }

}
