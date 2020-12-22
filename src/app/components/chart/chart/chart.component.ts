import { ChartService } from '../../../services/chart.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChartOptionsComponent } from '../chart-options/chart-options.component';
import { ZoomModalComponent } from './../zoom-modal/zoom-modal.component';

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
  dialogRef:MatDialogRef<ChartOptionsComponent>
  wasOpen:boolean = false;

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

      $(window).bind("orientationchange", () => {
        this.ReSize()
      })
    }) 
  }

  openDialog(): void {
    this.wasOpen = true;
    this.dialogRef = this.dialog.open(ChartOptionsComponent)

    this.dialogRef.afterClosed().subscribe(() =>{
      this.GetMonto()
    })
  }

  ZoomDialog(imgSrc:string): void{
    let dialogRef = this.dialog.open(ZoomModalComponent,{
      data: imgSrc
    })

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
