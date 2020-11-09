import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
declare var $:any;

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css'],
  animations:[
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity:0
      })),
      transition('open => closed', [
        animate('0.25s')
      ]),
      transition('closed => open', [
        animate('0.25s')
      ])
    ]),
  ]
})
export class NosotrosComponent implements OnInit, OnDestroy {

  open:boolean = true;
  opacity:boolean = true;
  op:string = "0";
  icon:string = "arrow_circle_down";
  isOpen = true;

  constructor() {
    $(window).scrollTop(0)

		$(window).scroll(() => {
			var windowHeight = $(window).scrollTop();
      var divHeight = $('#PadreDiv').position().top;

      if(windowHeight >= divHeight-600){
        this.opacity = false;
        this.op = '0.2';
      }
      if(windowHeight >= divHeight-500){
        this.op = '0.4';
      }
      if(windowHeight >= divHeight-400){
        this.op = '0.6';
      }
      if(windowHeight >= divHeight-300){
        this.op = "0.8"
      }
      else{
        this.opacity = true;
      }

      if (windowHeight >= $(window).height()){
        // scroll down
        this.isOpen = false
        this.icon = "arrow_circle_up"
      }
      else{
        this.isOpen = true
      }
    });
  }

  toTheTop(){
    $('html, body').animate({
      scrollTop: 0
    }, 500)

  }
  ngOnInit(): void {}

  ngOnDestroy(){
    console.log("OnDestroy")
    $(window).off("scroll")
  }
}
