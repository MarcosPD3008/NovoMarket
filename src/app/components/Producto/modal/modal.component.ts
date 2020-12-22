import { ChartService } from './../../../services/chart.service';
import { Producto } from './../../../interfaces/producto';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  producto:Producto
  Cantidad:number = 1;

  constructor(public dialogRef: MatDialogRef<ModalComponent>, private chart:ChartService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.producto = data.producto;
  }

  ngOnInit(): void {
  }

  AddToChart(producto:Producto){
    for(let i = 0; i < this.Cantidad; i++) this.chart.AddToChart(producto)
    this.dialogRef.close()
  }

  Min(){
    if(this.Cantidad > 1) this.Cantidad--;
  }

  Add(){
    this.Cantidad++;    
  }
}
