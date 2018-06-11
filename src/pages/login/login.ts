import { Component } from '@angular/core';
import {NavController, NavParams,ViewController,AlertController} from 'ionic-angular';
import {UsuarioProvider}  from "../../providers/usuario";
import{AgregarPage}  from "../agregar/agregar";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  agregarpagina=AgregarPage;
  correo:string="";
  contrasena:string="";
  expresion= /\w+@\w+\.+[a-z]/;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl:ViewController,
              private UP:UsuarioProvider,
              private afAuth: AngularFireAuth,
              private altCtrl:AlertController) {
  }

  signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
       this.correo=res.user.email ;
      this.contrasena=res.additionalUserInfo.profile.id;
    this.ingresar();

      } );
  }


  ingresar(){
    if (this.expresion.test(this.correo)) {
          console.log(this.correo);
          this.UP.ingresar(this.correo,this.contrasena).then(()=>{
             if (this.UP.activo()) {
                 this.viewCtrl.dismiss(true);
             }
          })
    }else{
      this.altCtrl.create({
        title:'ERROR!',
        subTitle: 'El correo no es valido',
        buttons: ['ok']
      }).present();



    }

  }










}
