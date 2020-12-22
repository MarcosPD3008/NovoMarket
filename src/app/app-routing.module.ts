import { ProductosComponent } from './components/Producto/productos/productos.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ChartComponent } from './components/chart/chart/chart.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes:Routes =[
  {path:"Home", component: HomeComponent},
  {path:"Productos", component: ProductosComponent},
  {path:"Carrito", component: ChartComponent},
  {path:"Nosotros", component: NosotrosComponent},
  {path: "**", pathMatch:"full", redirectTo:"Home"}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
