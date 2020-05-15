import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// para realizar consultas a la bdd real time y saber el usuario actual
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
// importar servicio calculadora
import {CalculadoraService} from '../../servicios/calculadora.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuario: any = {};
  // para visualizar imc
  imc: number;
  gimch = false;
  gimcm = false;
  // para el peso ideal
  p_ideal: number;
  // configuracion slides
  sliderConfig = {
    spaceBetween: 5,
    centeredSlide: true,
    slidesPerView: 1.6
  };

  constructor(private route: Router, public router: Router, private AFauth: AngularFireAuth,
    private DBFire: AngularFireDatabase, private calcu: CalculadoraService) {
      this.AFauth.authState.subscribe(user => {
        this.DBFire.object('usuarios/' + user.uid).valueChanges().subscribe(
          suc => {
            this.usuario = suc;
            if (user !== null ) {
              // calculo IMC
              this.imc = this.calcu.calcularIMC(this.usuario.peso, this.usuario.altura);
              console.log('imc: ' + this.imc);
              console.log('genero: ' + this.usuario.genero);
              if (this.usuario.genero === 'hombre') {
                this.gimch = true;
                this.gimcm = false;
              } else if (this.usuario.genero === 'mujer') {
                this.gimcm = true;
                this.gimch = false;
              }
              // calculo peso ideal
              this.p_ideal = this.calcu.pesoIdeal(this.usuario.altura, this.usuario.genero);
              console.log('peso ideal: ' + this.p_ideal);
            } else {
              console.log('No hay usuario');
            }
          });
      });
  }

  ngOnInit() {
  }
/*
  doRefresh () {
    this.AFauth.authState.subscribe(user => {
      this.DBFire.object('usuarios/' + user.uid).valueChanges().subscribe(
        suc => {
          this.usuario = suc;
          if (user !== null ) {
            // calculo IMC
            this.imc = this.calcu.calcularIMC(this.usuario.peso, this.usuario.altura);
            console.log('imc: ' + this.imc);
            console.log('genero: ' + this.usuario.genero);
            if (this.usuario.genero === 'hombre') {
              this.gimch = true;
              this.gimcm = false;
            } else if (this.usuario.genero === 'mujer') {
              this.gimcm = true;
              this.gimch = false;
            }
            // calculo peso ideal
            this.p_ideal = this.calcu.pesoIdeal(this.usuario.altura, this.usuario.genero);
            console.log('peso ideal: ' + this.p_ideal);
          } else {
            console.log('No hay usuario');
          }
        });
    });
  }*/

}
