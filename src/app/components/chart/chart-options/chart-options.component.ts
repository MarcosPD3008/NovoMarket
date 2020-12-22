import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChartService } from 'src/app/services/chart.service';

declare const $:any

@Component({
  selector: 'app-chart-options',
  templateUrl: './chart-options.component.html',
  styleUrls: ['./chart-options.component.css'] 
})
export class ChartOptionsComponent implements AfterContentInit, OnDestroy {
  Title:string = ""
  Action:string =""
  Change:boolean = true;
  portrait:boolean = true;
  
  constructor(private cs: ChartService, public dialogRef: MatDialogRef<ChartOptionsComponent>) {}

  ngAfterContentInit(){
    if(window.innerHeight > window.innerWidth){ 
      this.portrait = true
      if($(window).width() >= 600)
        this.dialogRef.updateSize("400px")
      else
        this.dialogRef.updateSize("50%")
    }
    else{
      this.portrait = false;

      if($(window).width() >= 1200 && this.portrait == false)
        this.dialogRef.updateSize("50%")
      else
        this.dialogRef.updateSize("100%") 
    }

    $(window).bind("orientationchange", (e) =>{
      if(e.target.screen.orientation.angle == 0 || e.target.screen.orientation.type == 'portrait-primary' || e.target.screen.orientation.type == 'portrait-secondary'){
        this.portrait = true
        if($(window).width() >= 600)
          this.dialogRef.updateSize("400px")
        else
          this.dialogRef.updateSize("50%")
      }
      if(e.target.screen.orientation.angle == 90 || e.target.screen.orientation.type == 'landscape-primary' || e.target.screen.orientation.type == 'landscape-secondary'){
        this.portrait = false
        if($(window).width() >= 1200)
          this.dialogRef.updateSize("50%")
        else
          this.dialogRef.updateSize("100%")   
      }
    })

  }

  Changer(Action?:string){
    if(!Action){
      if($(window).width() >= 600 && this.portrait == true)
        this.dialogRef.updateSize("400px")
      else if($(window).width() >= 1200 && this.portrait == false)
        this.dialogRef.updateSize("50%")
      else
        this.dialogRef.updateSize("100%")

      this.Change = true; 
    } 
    else{
      this.Change = false;
      this.dialogRef.updateSize("50%")
    }
    
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

  ngOnDestroy(){
    $(window).off("bind")
  }
}
