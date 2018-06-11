import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CarritoProvider} from "../../providers/carrito";

@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
    producto ={};

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      private CS:CarritoProvider) {
    console.log(this.navParams.get("producto"));
    this.producto=this.navParams.get("producto");

  }



AgregarCarrito(producto:any){
  this.CS.agregar_carrito(producto);

}

}
