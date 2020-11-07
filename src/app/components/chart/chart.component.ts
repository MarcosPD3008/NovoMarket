import { ChartService } from './../../services/chart.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartOptionsComponent } from './chart-options.component';

declare const $:any
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  MontoSeleccionado: number = 0;
  Spin:boolean = false;
  Collapse:boolean = false;

  constructor(public cs:ChartService, public dialog: MatDialog) {
    this.GetMonto()

  }

  ReSize(){
    if($(window).width() < 800){
      this.Collapse = false;
    }
    else{
      this.Collapse = true;
    }
  }
  
  ngOnInit(): void {
    $(window).ready( () =>{
      this.ReSize()
      $(window).resize( () => {
        this.ReSize()
      })

      $(window).bind("orientationchange", (event) => {
        this.ReSize()
        console.log(event.target.screen.orientation)
      })
    }) 
  }

  openDialog(): void {
    let ancho:string = '20%';
    if(!this.Collapse)
      ancho = '50%'
    const dialogRef = this.dialog.open(ChartOptionsComponent, {
      width: ancho
    });

    dialogRef.afterClosed().subscribe(() =>{
      this.GetMonto()
    })
  }

  GetMonto(){
    this.MontoSeleccionado = 0;
    setTimeout(() => {
      this.cs.Productos.forEach((producto) =>{
        if(producto.seleccionado) 
          this.MontoSeleccionado += (producto.producto.Precio * producto.cantidad) 
      })
    }, 100);
  }
}
