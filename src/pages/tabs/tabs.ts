import { Component } from '@angular/core';
import{CategoriasPage,
       OrdenesPage,HomePage,
       BusquedaPage}  from "../pages.index";
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root=HomePage;
  tab2Root=CategoriasPage;
  tab3Root=OrdenesPage;
  tab4Root=BusquedaPage;
}
