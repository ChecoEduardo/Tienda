import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CarritoProvider} from "../../providers/carrito";


@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {
   orden:any={}
  constructor(public navCtrl: NavController,
            //  private viewCtrl:ViewController,
              public navParams: NavParams,
              private CP:CarritoProvider) {
     this.orden = this.navParams.get("orden");
  }


borrar_orden(orden_id:string){
    this.CP.borrar_orden(orden_id);
    this.navCtrl.pop();

}





}
