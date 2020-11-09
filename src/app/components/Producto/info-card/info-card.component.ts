import { ModalComponent } from './../modal/modal.component';
import { ChartService } from './../../../services/chart.service';
import { Producto } from './../../../interfaces/producto';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
declare var $:any;

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit, OnDestroy {
  @Input() product:Producto;
  @Input() idCard:string;
  @Input() Small: number;
  margin:boolean = true;
  dialogRef:MatDialogRef<ModalComponent>
  wasOpen:boolean = false;

  constructor(private cs:ChartService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.wasOpen == true)
      this.dialogRef.close()

  }

  AddToChart(producto:Producto){
    this.cs.AddToChart(producto)
  }

  openDialog(): void {
    this.wasOpen = true;
    this.dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: { producto: this.product }
    });

    this.dialogRef.afterClosed().subscribe( () => {
      this.wasOpen = false;
    })
  }
}
