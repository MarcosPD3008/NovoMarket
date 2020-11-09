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
  op:string[] = ["0.2", "1"];
  icon:string = "arrow_circle_down";
  isOpen = true;
  less:number = 600;
  lstScroll:number = 0;

  constructor() {
    $(window).scrollTop(0)

		$(window).scroll(() => {
      var windowHeight = $(window).scrollTop();
      //var scrollPoint = $(window).position().top
      var divHeight = $('#PadreDiv').position().top;


      if(windowHeight > this.lstScroll){
        //scroll down
        if(windowHeight >= divHeight-this.less && this.less >= 300){
          this.less -= 100;
          this.op[0] = String(+this.op[0] + 0.2)
          this.op[1] = String(+this.op[1] - 0.2)  
        }
      }
      else{
        //scroll up
        if(windowHeight < divHeight-this.less && this.less <= 600){
          this.less += 100;
          this.op[0] = String(+this.op[0] - 0.2)
          this.op[1] = String(+this.op[1] + 0.2)  
        }
      }

      if(+this.op[0] <= 0) this.op[0] = "0.2"
      if(+this.op[1] <= 0) this.op[1] = "0.2"
      this.lstScroll = windowHeight;

      if (windowHeight >= $(window).height()/2){
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
    $(window).off("scroll")
  }
}
