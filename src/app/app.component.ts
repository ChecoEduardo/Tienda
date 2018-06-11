import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { AgregarPage } from '../pages/agregar/agregar';
import{TabsPage  }from "../pages/pages.index";
//import {UsuarioProvider} from "../providers/usuario";

//import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

//  rootPage:any = AgregarPage;
  rootPage:any = TabsPage;
  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen
              ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }




}
