import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-zoom-modal',
  templateUrl: './zoom-modal.component.html',
  styles: [
    `.w-400{
      width:400px;
    }`
  ]
})
export class ZoomModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
