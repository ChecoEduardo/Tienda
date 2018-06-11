import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_PHP} from "../config/url.service";
import { Storage } from '@ionic/storage';
import {AlertController , Platform} from "ionic-angular";


@Injectable()
export class UsuarioProvider {

  token:any;
  id_usuario:any;


  constructor(public http: HttpClient,
              private alertCtrl:AlertController,
              private platform:Platform,
              private storage:Storage,) {
              this.cargar_Storage();
  }

  activo():boolean{
    if (this.token) {
        return true;
    }else{
      return false;
    }
  }

  ingresar(correo:string, contrasena:string){
    let body = {
      correo: correo,
      contrasena: contrasena
    };
    let url = URL_PHP + "Login/ingresar" ;
    return new Promise(resolve => {
         this.http.post(url, body)
         .subscribe(data_res => {
           resolve(data_res);
           let data:any={};
           data=data_res;
           if (data.error) {
             this.alertCtrl.create({
               title:"Erro al iniciar",
               subTitle:data.mensaje,
               buttons: ["OK"]
             }).present();
           }else{
                this.token= data.token;
                this.id_usuario = data.id_usuario;
                this.guardar_storage();
           }
         }, login => {
           this.alertCtrl.create({
             title:"Erro al iniciar",
             subTitle:login.error.mensaje,
             buttons: ["OK"]
           }).present();
           console.log(login);
         });
       });
  }
  cerrar_sesion(){//necesito borrar el usuario y el token por si alguein mas entra
    this.token=null;
    this.id_usuario=null;
    this.guardar_storage();
  }
  guardar_storage(){
    if (this.platform.is("cordova")) {//Dispositivo
  /*primero tenemos que revisar si tenemos algo en el storage el ready siempre se tiene que haber ejecutado antes */
        this.storage.set("token", this.token);
        this.storage.set("id_usuario", this.id_usuario);
    }else{
    //Computadora
    if (this.token) {
    localStorage.setItem("token", this.token);
    localStorage.setItem("id_usuario", this.id_usuario);
    }else{
      localStorage.removeItem("token");
      localStorage.removeItem("id_usuario");
    }
      }
  }
  cargar_Storage(){
   let promesa = new Promise ((resolve, reject)=>{
     if (this.platform.is("cordova")) {//dispositivo  regresa una promesa
       this.storage.ready().then(()=>{
                 this.storage.get("token").then(Stoken=>{
                   if(Stoken){
                     this.token=Stoken;
                   }
                 })
                 this.storage.get("id_usuario").then(Sid_usuario=>{
                   if(Sid_usuario){
                     this.token=Sid_usuario;
                   }
                   resolve();
                 })
     })

     }else{
       //Computadora  verificar si ha algo
       if (localStorage.getItem("token") && localStorage.getItem("id_usuario") ) {
           this.token= localStorage.getItem("token");
           this.id_usuario= localStorage.getItem("id_usuario");
       }
       resolve();
     }

   });
   return promesa;

  }

  Agregar_usuario( correo:string,contrasena:string ){
      //console.log('entro ingresar para hacer la peticion');
      let body = {
        correo: correo,
        contrasena: contrasena
      };
      let url = URL_PHP + "Login/Agregar" ;
      return new Promise(resolve => {
           this.http.post(url, body)
           .subscribe(data => {
             resolve(data);
             let data_res:any={};
             data_res=data;
             if (data_res.error) {
               this.alertCtrl.create({
                 title:"Erro al iniciar",
                 subTitle:data_res.mensaje,
                 buttons: ["OK"]
               }).present();
             }else{
               this.token= data_res.token;
               this.id_usuario = data_res.id_usuario;
                 this.guardar_storage();
               this.alertCtrl.create({
                 title:"¡Bienvenido!",
                 subTitle:"Usuario ingresado",
                 buttons: ["OK"]
               }).present();

             }
              console.log(data);
           }, err => {
             this.alertCtrl.create({
               title:"Erro al iniciar",
               subTitle:err.error.mensaje,
               buttons: ["OK"]
             }).present();
             console.log(err);
           });
         });




  }



}
