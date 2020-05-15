import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credenciales',
  templateUrl: './credenciales.component.html',
  styleUrls: ['./credenciales.component.scss']
})
export class CredencialesComponent implements OnInit {

  user:any={
    email:"",
    password:""
  }

  constructor() { }

  ngOnInit() {
  }

}
