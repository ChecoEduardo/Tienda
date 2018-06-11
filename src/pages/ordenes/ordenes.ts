import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {CarritoProvider} from "../../providers/carrito";
import {OrdenesDetallePage} from "../pages.index";
import {UsuarioProvider} from "../../providers/usuario";

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
  ordesDetalle= OrdenesDetallePage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private CP:CarritoProvider,
            private UP:UsuarioProvider
            ) {

  }

  ionViewWillEnter() {
    console.log('cargadno ordenes');
    this.CP.cargar_ordenes();
  }

}
