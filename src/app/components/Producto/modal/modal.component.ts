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

  constructor(public dialogRef: MatDialogRef<ModalComponent>, private chart:ChartService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.producto = data.producto;
  }

  ngOnInit(): void {
  }

  AddToChart(producto:Producto){
    this.chart.AddToChart(producto)
  }

}
