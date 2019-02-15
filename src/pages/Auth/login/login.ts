import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*Libreria de formularios */
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/* Provider de atutenticacion */
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
/*Layout TABS */
import { TabsPage } from '../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  /*Objeto formulario */
  public formularioLogin : FormGroup;
  /* Arreglo de tipo de usuario */
  public typeUSer:any;

  constructor(
              public  navCtrl:        NavController, 
              public  navParams:      NavParams,
              private formBuilder:    FormBuilder,
              public  auth:           AuthServiceProvider
  ) {

    /* Se carga los tipos de usuarios validos */
    auth.getTypeUser().then((data)=>{
      this.typeUSer = data;
    });

    /*Objeto del formulario */
    this.formularioLogin = this.formBuilder.group({
        typeUser:['', Validators.compose(
          [
            Validators.required
          ]
        )],
        email:['', Validators.compose(
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
          ]
        )],
        password:['', Validators.compose(
          [
            Validators.required,
            // Validar mayusculas caracteres especiales numeros y minimo 8 y maximo 30
            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&=])[A-Za-z\d$@$!%*?&].{8,30}')
          ]
        )]        
    });

  }

  public iniciarSesion(){
    this.auth.login(
                    this.formularioLogin.value.email, 
                    this.formularioLogin.value.password, 
                    this.formularioLogin.value.typeUser
                  ).then((data)=>
    {
      /*Se limpian los campos del formulario */
      this.formularioLogin.reset();
      /* Se valida la respuesta del login */
      if(data['error'] == '2'){
        console.log('Usuario no valido.');
      }else if(data['error'] == '1'){
        console.log('Ocurrio un error en el sistema.');
      }else{

        localStorage.setItem('userId',    data[0]['ID']);
        localStorage.setItem('name',      data[0]['NOMBRES']);
        localStorage.setItem('lastName',  data[0]['APELLIDOS']);
        localStorage.setItem('imageUser', data[0]['AVATAR']);
        localStorage.setItem('typeUSer',  data[0]['TIPO']);
        localStorage.setItem('sesion',    'true' );

        /*Se cambia el root de la aplicación */
        this.navCtrl.setRoot(TabsPage);

      }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
