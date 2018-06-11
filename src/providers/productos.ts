import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{URL_PHP}  from "../config/url.service";
import {AlertController} from "ionic-angular";
@Injectable()
export class ProductosProvider {

  pagina:number =0;
  productosA:any[]=[];
  lineas:any[]=[];
  porCategoria:any[]=[];
  resultados:any[]=[];


  constructor(public http: HttpClient,
              private alertCtrl:AlertController) {
              this.cargar_todo();
              this.cargar_lineas();}

   cargar_lineas(){//funcion que carga todas las categorias
     let url = URL_PHP + "lineas";//la url solo necesita la palabra lineas
     return new Promise(resolve => {//se crea una promesa para poder extraer la informacion
          this.http.get(url).subscribe(datos => {
            resolve(datos);
            let data_res:any={};
            data_res=datos;
            this.lineas=data_res.lineas;
          }, data => {
            console.log(data.error);
          });
        });
   }

  cargar_categoria(tipo:number){
    let url = URL_PHP + "Productos/por_tipo/" + tipo  ;
    return new Promise(resolve => {
         this.http.get(url).subscribe(categorias => {
           resolve(categorias);
           let data_res:any={};
           data_res=categorias;
           this.porCategoria=data_res.productos;
         }, data => {
           console.log(data.error);
         });
       });
  }


  cargar_todo(){//es una funcion de evento asincrono  se va dispara cuando se llegue al final de los primero 10
   let url = URL_PHP + "/Productos/todos/"+ this.pagina;
   return new Promise(resolve => {
        this.http.get(url).subscribe(data => {
          resolve(data);
          let data_res:any={};
          data_res=data;
          let nuevData = this.agrupar(data_res.productos, 2);
           this.productosA.push(...nuevData);
           this.pagina +=1;
        }, data => {
          console.log(data.error);
        });
      });//este url me va ayudar a conseguri todos los servicios de forma paginada
  }

  private agrupar(arrays:any, tamano:number){
    let nuevoArreglo=[];
    for (let i = 0; i < arrays.length; i+=tamano)
      {
          nuevoArreglo.push(arrays.slice(i, i+tamano));
      }
    return nuevoArreglo;
  }

  buscar_item(item:string){
    let url =URL_PHP + "Productos/buscar/" + item ;
    return new Promise(resolve=>{
        this.http.get(url).subscribe(resp=>{
          resolve(resp);
          let data_res:any={};
          data_res=resp;
          if (data_res.error) {
            this.alertCtrl.create({
              title: "Error al borrar la orden!!",
              subTitle: data_res.mensaje,
              buttons: ["OK"]
            }).present();
          }else{    //todo bien
            this.resultados=data_res.productos;
          }
        }, err=>{
           console.log(err);
        })
    })
  }
}
