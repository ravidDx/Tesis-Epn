import { Component, OnInit } from '@angular/core';
import { DeportistasService } from '../../servicios/deportistas.service';

import { Deportista } from '../../interfaces/deportista.interface';
// importar servicio calculadora
import {CalculadoraService} from '../../servicios/calculadora.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  deportista: Deportista = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fechaN: "",
    peso: "",
    altura: "",
    foto: "",
    genero: "",
    objetivo: "",
    observaciones: "",
    rol: "",
    fechaCreacion: {},
    estado: '',
  }
  email: any;

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

  constructor(private _deportistaService: DeportistasService,private calcu: CalculadoraService) {
    this.email = localStorage.getItem('email');
    this.getDeportista();    
   }

  ngOnInit() {
  }

 

  getDeportista() {
    this._deportistaService.consultarDesportistas()
      .subscribe(
        data => {

          for (let key$ in data) {
            let deportista = data[key$];
            deportista['_id'] = key$;

            if (deportista.email === this.email) {
              this.deportista = deportista;
              break;
            }

          }

          if (this.deportista.genero = "male") {
            this.deportista.genero = "hombre";
          } else {
            this.deportista.genero = "mujer";
          }

          this.imc = this.calcu.calcularIMC(this.deportista.peso, this.deportista.altura);
          console.log('imc: ' + this.imc);
          console.log('genero: ' + this.deportista.genero);
          if (this.deportista.genero === 'hombre') {
            this.gimch = true;
            this.gimcm = false;
          } else if (this.deportista.genero === 'mujer') {
            this.gimcm = true;
            this.gimch = false;
          }
          // calculo peso ideal
          this.p_ideal = this.calcu.pesoIdeal(this.deportista.altura, this.deportista.genero.toString());
          console.log('peso ideal: ' + this.p_ideal);

        },
        error => {
          console.log(error);
        }

      );
  }
 
}
