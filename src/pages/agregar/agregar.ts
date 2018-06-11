import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController, AlertController} from 'ionic-angular';
import {UsuarioProvider}  from "../../providers/usuario";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.html',
})
export class AgregarPage {
  correo:string="";
  contrasena:string="";
  expresion= /\w+@\w+\.+[a-z]/;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private UP:UsuarioProvider,
    private viewCtrl:ViewController,
    private afAuth: AngularFireAuth,
    private alrtCtrl: AlertController
  ) {
  }

  signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
       this.correo=res.user.email ;
      this.contrasena=res.additionalUserInfo.profile.id;
      //  console.log(res.user.id);
        console.log(res.additionalUserInfo.profile.id);
    this.agregar();
      } );
  }

  agregar(){
    if (this.expresion.test(this.correo)) {
      this.UP.Agregar_usuario(this.correo, this.contrasena).then(()=>{
        if (this.UP.activo()) {
          this.viewCtrl.dismiss(true);
        }
      })
    }else{
      this.alrtCtrl.create({
        title: 'Error',
        subTitle: "El correo no es valido",
        buttons: ['ok']
      }).present()
    }
  }

}
