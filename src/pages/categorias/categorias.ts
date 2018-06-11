import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {ProductosProvider} from "../../providers/productos";

import {PorCategoriasPage} from "../pages.index";

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  categorias=[];

  porCategorias=PorCategoriasPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private PS:ProductosProvider) {




  }

  cate(){
    this.categorias=this.PS.lineas;
    console.log(this.categorias);
    return this.categorias;


  }





}
