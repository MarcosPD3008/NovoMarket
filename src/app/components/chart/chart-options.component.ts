import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-chart-options',
  templateUrl: './chart-options.component.html'
})
export class ChartOptionsComponent implements OnInit {
  Title:string = ""
  Action:string =""
  Change:boolean = true;

  constructor(private cs: ChartService, public dialogRef: MatDialogRef<ChartOptionsComponent>) { }

  ngOnInit(): void {
  }

  Changer(Action?:string){
    this.Change = !this.Change;

    if(Action){
      this.Action = Action;
      switch(Action){
        case "DA":
          this.Title = "eliminar todos los productos"
          break;
        case "DS":
          this.Title = "eliminar los productos seleccionados"
          break;
        case "BA":
          this.Title = "comprar todos los productos"
          break;
        case "BS":
          this.Title = "comprar los productos seleccionados"
          break;
      }
    } 
  }

  DoAnAction(){
    switch(this.Action){
      case "DA":
        this.cs.ResetChart()
        break;
      case "DS":
        this.cs.RemoveSelected()
        break;
      case "BA":
        this.cs.Comprar()
        break;
      case "BS":
        this.cs.Comprar(true)
        break;
    }
    this.dialogRef.close();
  }

}
