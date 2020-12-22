
import { FirebaseModule } from './modules/firebase/firebase.module';
import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ChartComponent } from './components/chart/chart/chart.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ChartOptionsComponent } from './components/chart/chart-options/chart-options.component';
import { ZoomModalComponent } from './components/chart/zoom-modal/zoom-modal.component';
import { ModalComponent } from './components/Producto/modal/modal.component';
import { InfoCardComponent } from './components/Producto/info-card/info-card.component';
import { ProductosComponent } from './components/Producto/productos/productos.component';

@NgModule({
  entryComponents:[
    ModalComponent,
    ZoomModalComponent,
    ChartOptionsComponent
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductosComponent,
    InfoCardComponent,
    ChartComponent,
    NosotrosComponent,
    ModalComponent,
    ChartOptionsComponent,
    ZoomModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FirebaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
