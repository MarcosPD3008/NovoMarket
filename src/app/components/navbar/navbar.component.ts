import { MatDivider } from '@angular/material/divider';
import { sha256 } from 'js-sha256';
import { User } from './../../interfaces/user';
import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import 'rxjs/Rx';
import { ProductsService } from 'src/app/services/products.service';
declare const $:any;
//declare var isOpen:boolean

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations:[
    trigger('openClose', [
      // ...
      state('open', style({
        height: '30px',
        opacity: 1
      })),
      state('closed', style({
        height: '0px',
        opacity:0
      })),
      state('openNav', style({
        marginTop: "25px"
      })),
      state('closeNav', style({
        marginTop:"0px"
      })),
      transition('open => closed', [
        animate('0.25s')
      ]),
      transition('openNav => closeNav', [
        animate('0.25s')
      ]),
      transition('closed => open', [
        animate('0.25s')
      ]),
      transition('closeNav => openNav', [
        animate('0.25s')
      ])
    ]),
  ]
})
export class NavbarComponent implements OnInit{

  public top:boolean = false;
  icon:string = "arrow_circle_down";
  isOpen = true;
  lol:boolean = false;
  Collapse:boolean = true;

  constructor() {

  }

  Cerrar(){
    $('.navbar-collapse').collapse('hide');
  }

  ngOnInit(){
    $(window).ready(() =>{
      $("#navButton").click(() =>{
        if($('#navButton').hasClass("collapsed")){
          this.Collapse = false;
        }

        $("#navButton").attr("aria-expanded","false");
      })

      if($(window).width() < 575){
        this.Collapse = false;
      }
      else{
        this.Collapse = true;
      }

      $(window).resize(() =>{
        if($(window).width() < 575){
          this.Collapse = false;
        }
        else{
          this.Collapse = true;
        }
      })

      $('.botonF1').click(() => {
        if(this.icon == "arrow_circle_down"){
          $('html, body').scrollTop( $(document).height());
          this.icon = "arrow_circle_up"
        }
        else{
          $('html, body').scrollTop(0);
          this.icon = "arrow_circle_down"
        }
      })
      setTimeout( () => {
        this.Cerrar() 
      },350) 
    })
  }
}