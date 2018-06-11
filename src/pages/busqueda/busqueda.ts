import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {ProductosProvider} from "../../providers/productos";
import {ProductoPage} from "../pages.index";

@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {
  productoPage=ProductoPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private PP:ProductosProvider) {
  }


  buscar_productos(ev:any){
       let val = ev.target.value;
     this.PP.buscar_item(val);

  }




}
