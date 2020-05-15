import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'; // para porder acceder a bd realtime
import { AngularFireAuth } from '@angular/fire/auth'; // para poder ver el usuario actual logeado

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  bduser: any ;
  constructor(private AFauth: AngularFireAuth, private DBFire: AngularFireDatabase) {
  }

  ngOnInit() {}

}
