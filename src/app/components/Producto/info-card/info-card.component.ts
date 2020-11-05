import { ModalComponent } from './../modal/modal.component';
import { ChartService } from './../../../services/chart.service';
import { Producto } from './../../../interfaces/producto';
import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
declare var $:any;

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {
  @Input() product:Producto;
  @Input() idCard:string;
  @Input() Small: number;
  margin:boolean = true;

  constructor(private cs:ChartService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  AddToChart(producto:Producto){
    this.cs.AddToChart(producto)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: { producto: this.product }
    });
  }
}
