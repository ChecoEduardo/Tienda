              import { HttpClient } from '@angular/common/http';
              import { Injectable } from '@angular/core';
              import{AlertController, Platform, ModalController}  from "ionic-angular";
              import { Storage } from '@ionic/storage';
              import {UsuarioProvider} from "./usuario";
              import {LoginPage, CarritoPage} from "../pages/pages.index";

              import {URL_PHP} from "../config/url.service";

              @Injectable()
              export class CarritoProvider {
                items:any[]=[];
                total_carrito:number =0;
                ordenes:any[]=[];


                constructor(public http: HttpClient,
                            private alertCtrl:AlertController,
                            private storage: Storage,
                             private platform:Platform,
                            private US:UsuarioProvider,
                            private modalCtrl:ModalController) {
                  console.log('Hello CarritoProvider Provider');
                  this.cargar_Storage();
                  this.actualizar_total();

                }

                borraritems(){
                  if (!this.US.token) {
                       this.items=[];
                       this.guardar_storage();
                  }
                }

                Verificacion_Pedidos(){
                  if (this.items.length >0 ) {
                    console.log(this.items);
                        let confirm = this.alertCtrl.create({
                         title: 'Peligro!',
                         message: 'Aun tienes productos en el carrito, si te vas se borraran',
                         buttons: [
                           {
                             text: 'Regresar',
                             handler: () => {
                               console.log('Disagree clicked');
                             }
                           },
                           {
                             text: 'OK',
                             handler: () => {
                               this.US.cerrar_sesion();//boran usuario y token
                               this.borraritems();
                               console.log('Agree clicked');
                             }
                           }
                         ]
                        });
                        confirm.present();
                  }else{
                    this.US.cerrar_sesion();//boran usuario y token
                    this.borraritems();
                  }

                }

                remove_item( idx:number, item){
                  this.items.splice(idx,1);
                  console.log(item.precio_compra, 'this is the fucking item');
                  this.total_carrito -= Number( item.precio_compra);
                  this.guardar_storage();

                }
                realizar_pedido(){
                    let codigos:string[]=[];
                    for(let item of this.items){
                      codigos.push(item.codigo)
                    }
                    let body = {
                      items: codigos.join(",")
                    };
                 console.log(codigos.join(","));

                 let url =URL_PHP + "pedidos/realizar_orden/" + this.US.token+ "/"+this.US.id_usuario;

                 return new Promise((resolve, reject)=>{
                   this.http.post(url,body).subscribe(resp=>{
                     resolve(resp);
                     let data_resp:any ={};
                     data_resp= resp;

                     if (data_resp.error) {
                       this.alertCtrl.create({
                         title: "Error en la orden!!",
                         subTitle: data_resp.mensaje,
                         buttons: ["OK"]
                       }).present();
                     }else{
                       //todo bien
                       this.items=[];
                       this.guardar_storage();
                       this.alertCtrl.create({
                         title: "Orden Realizada!!",
                         subTitle: "Nos contactaremos con usted próximamente",
                         buttons: ["OK"]
                       }).present();
                     }


                   }, err=>{

                      console.log(err);

                   })
              })
              }//fin de l a funcion
                ver_carrito(){
                  let modal:any;
                   modal=this.modalCtrl.create(CarritoPage);
                /*  if(this.US.token){
                    //mostar página del carrito
                    modal=this.modalCtrl.create(CarritoPage);
                  }else{
                  //mostrar el login
                  modal=this.modalCtrl.create(LoginPage);//si hace un login exitoso requerimos mostrar el
                  //el carrito, necesitamos recibir un parametro de la pagina del login
                }*/


                modal.present();
                modal.onDidDismiss((abrirCarrito:boolean)=>{

                })
                }


                ver_login(){
                  let modal:any;
                    modal=this.modalCtrl.create(LoginPage);
                    modal.present();

                }
                agregar_carrito(item_parms:any){
                  for(let item of this.items){
                      if (item.codigo == item_parms.codigo) {
                        this.alertCtrl.create({
                          title:"Item existe",
                          subTitle: item_parms.producto + ", ya existe",
                          buttons: ["ok"]
                        }).present();
                          return;
                      }
                  }
                  this.items.push(item_parms);
                  this.actualizar_total();
                  this.guardar_storage();
                }

                actualizar_total(){
                    this.total_carrito=0;
                    for (let item of this.items) {
                        this.total_carrito += Number( item.precio_compra);
                    }

                }

                guardar_storage(){
                  if (this.platform.is("cordova")) {
                      //Dispositivo
                /*primero tenemos que revisar si tenemos algo en el storage el ready siempre se tiene que haber ejecutado antes */
                      this.storage.set("items", this.items);
                  }else{
                  //Computadora
                  localStorage.setItem("items", JSON.stringify(this.items));
                }
                }

                cargar_Storage(){
                 let promesa = new Promise ((resolve, reject)=>{
                   if (this.platform.is("cordova")) {
                     //dispositivo  regresa una promesa
                     this.storage.ready().then(()=>{
                               this.storage.get("items").then(itemsS=>{
                                 if(itemsS){
                                   this.items=itemsS;
                                 }
                                 resolve();
                               })
                   })
                   }else{
                     //Computadora  verificar si ha algo
                     if (localStorage.getItem("items")) {
                         this.items= JSON.parse(localStorage.getItem("items"));
                     }
                     resolve();
                   }
                 });
                 return promesa;
                }

                cargar_ordenes(){
                  let url =URL_PHP + "pedidos/obtener_pedidos/" + this.US.token+ "/"+this.US.id_usuario;

               return new Promise(resolve=>{
                    this.http.get(url).subscribe(resp=>{
                      resolve(resp);
                      let data:any={};
                      data=resp;
                      if (data.error) {
                        this.alertCtrl.create({
                          title: "Ups!",
                          subTitle: "Se requeire ingresar",
                          buttons: ["OK"]
                        }).present();
                      }else{
                        //todo bien
                        this.ordenes= data.ordenes;
                      }
                    }, err=>{
                       console.log(err);
                    })
               })

                }

              borrar_orden(orden_id:string){
                let url =URL_PHP + "pedidos/borrar_pedido/" + this.US.token+ "/"+this.US.id_usuario+"/"+orden_id ;

                return new Promise(resolve=>{
                    this.http.delete(url).subscribe(resp=>{
                      resolve(resp);
                      let data:any={};
                      data=resp;
                      if (data.error) {
                        this.alertCtrl.create({
                          title: "Error al borrar la orden!!",
                          subTitle: data.mensaje,
                          buttons: ["OK"]
                        }).present();
                      }else{
                        //todo bien
                        this.alertCtrl.create({
                          title: "Orden Eliminada!!",
                          subTitle: data.mensaje,
                          buttons: ["OK"]
                        }).present();
                      }
                    }, err=>{
                       console.log(err);
                    })
                })


              }





              }
