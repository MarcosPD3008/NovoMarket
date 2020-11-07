import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChartService } from 'src/app/services/chart.service';

declare const $:any

@Component({
  selector: 'app-chart-options',
  templateUrl: './chart-options.component.html'
})
export class ChartOptionsComponent implements OnInit {
  Title:string = ""
  Action:string =""
  Change:boolean = true;
  portrait:boolean = true;
/*
angle: 90, type: "landscape-primary"

angle: 0, type: "portrait-primary"
*/
  constructor(private cs: ChartService, public dialogRef: MatDialogRef<ChartOptionsComponent>) { }

  ngOnInit(): void {
    $(window).ready( () =>{
      if(window.innerHeight > window.innerWidth){
        this.portrait = true
        this.dialogRef.updateSize("50%")
      }
      else{
        this.portrait = false
        this.dialogRef.updateSize("100%") 
      }
      
      $(window).bind("orientationchange", (e) =>{
        if(e.target.screen.orientation.angle == 0 || e.target.screen.orientation.type == 'portrait-primary'){
          this.portrait = true
          this.dialogRef.updateSize("50%")
        }
        if(e.target.screen.orientation.angle == 90 || e.target.screen.orientation.type == 'landscape-primary'){
          this.portrait = false
          this.dialogRef.updateSize("100%") 
        }
      })
    })
  } 

  Changer(Action?:string){
    this.Change = !this.Change;
    this.dialogRef.updateSize("50%")

    if(!Action) this.dialogRef.updateSize("100%")

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
