import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//plugin
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
/*PIPES*/
import {ImagenPipe} from "../pipes/imagen/imagen";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
/*Servicios*/
import { CarritoProvider } from '../providers/carrito';
import { ProductosProvider } from '../providers/productos';
import { UsuarioProvider } from '../providers/usuario';
/**pages*/
import {
CarritoPage,
CategoriasPage,
LoginPage,
OrdenesPage,
OrdenesDetallePage,
PorCategoriasPage,
ProductoPage,
TabsPage,
BusquedaPage,
AgregarPage,
} from "../pages/pages.index";

export const firebaseConfig = {
  apiKey: "AIzaSyC--zFfYHF0qhLuotj3tFGvjW5JZXUxa80",
    authDomain: "my-fabouloso-proyecto.firebaseapp.com",
    databaseURL: "https://my-fabouloso-proyecto.firebaseio.com",
    projectId: "my-fabouloso-proyecto",
    storageBucket: "my-fabouloso-proyecto.appspot.com",
    messagingSenderId: "299231617150"
};

@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    HomePage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage,
    BusquedaPage,
    AgregarPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
   HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage,
    BusquedaPage,
    AgregarPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
//     HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoProvider,
    ProductosProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
