import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ProductosProvider} from "../../providers/productos";
import {ProductoPage} from "../producto/producto";

@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {
  categoria:any={};
  Productopage=ProductoPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _SP:ProductosProvider) {
      this.categoria= this.navParams.get("categoria");

     this._SP.cargar_categoria(this.categoria.id);
  }

  SigueintePagina(infiniteScroll){
  //  this._SP.cargar_categoria(this.categoria.id).then(()=>{
      console.log(this.categoria.id);
       infiniteScroll.complete();
  //  })

  }


}
