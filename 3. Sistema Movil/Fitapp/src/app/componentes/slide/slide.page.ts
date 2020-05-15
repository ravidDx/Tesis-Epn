import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements OnInit {

  slideOpts = {
    effect: 'flip'
  };
  constructor() { }

  ngOnInit() {
  }


}
