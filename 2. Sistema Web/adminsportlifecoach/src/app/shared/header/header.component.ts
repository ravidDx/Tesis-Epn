import { Component, OnInit } from '@angular/core';
declare var  $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#myTopnav a').on('click', function(){
      console.log("clickkkk");
        $('a.active').removeClass('active');
        $(this).addClass('active');
    });
  }





}
