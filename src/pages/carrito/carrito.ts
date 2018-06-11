import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {CarritoProvider} from "../../providers/carrito";

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private CP:CarritoProvider,
              private viewCtrl:ViewController) {



  }

  carrito():number{
  let tamano=this.CP.items.length;

  return tamano

  }

  cerar(){

    this.viewCtrl.dismiss();
  }




}
