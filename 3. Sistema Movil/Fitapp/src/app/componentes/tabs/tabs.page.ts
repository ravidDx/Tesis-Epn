import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  
  email:string = '';
  rol:string = '';

  constructor() {
    this.email = localStorage.getItem('email');
    this.rol = localStorage.getItem('rol');
    console.log(this.rol);
    console.log(this.email);
   }

  

  ngOnInit() {
  }

}
