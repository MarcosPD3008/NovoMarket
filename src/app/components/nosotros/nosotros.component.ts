import { Component, OnInit } from '@angular/core';
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
export class NosotrosComponent implements OnInit {

  open:boolean = true;
  icon:string = "arrow_circle_down";
  isOpen = true;

  constructor() {
    $(window).scrollTop(0)

		$(window).scroll(() => {
			var windowHeight = $(window).scrollTop();

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
  ngOnInit(): void {
    
    
  }
}
