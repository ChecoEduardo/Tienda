import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProductosProvider}  from "../../providers/productos";
import{ProductoPage}  from "../producto/producto";
import {UsuarioProvider} from "../../providers/usuario";
import {CarritoProvider} from "../../providers/carrito";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
 })
export class HomePage {
  productoPage=ProductoPage;
  Existe:any= this.UP.token;
  constructor(public navCtrl: NavController,
              private PrdtsSer:ProductosProvider,
              private CP:CarritoProvider,
              private UP:UsuarioProvider,) {}
  SigueintePagina(infiniteScroll){
    this.PrdtsSer.cargar_todo().then(()=>{infiniteScroll.complete();})
  }
VerCarrito(){
  this.CP.ver_carrito();
}
}
