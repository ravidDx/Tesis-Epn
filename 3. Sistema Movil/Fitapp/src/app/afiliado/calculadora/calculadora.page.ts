import { Component, OnInit } from '@angular/core';
// Para validar el formulario
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// importar servicio calculadora
import { CalculadoraService } from '../../servicios/calculadora.service';
import { DeportistasService } from '../../servicios/deportistas.service';

import { Deportista } from '../../interfaces/deportista.interface';
@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage implements OnInit {

  // grupos de formularios
  imc_form: FormGroup;
  peso_form: FormGroup;
  caldi_form: FormGroup;
  calquem_form: FormGroup;
  // para visualizar resultados
  gimch = false;
  gimcm = false;
  gpi = false;
  caldi = false;
  calquem = false;
  // recibe valores del form
  weigth: number;
  heigth: number;
  age: number;
  gender: string;
  active: number;
  imc: number;
  p_ideal: number;
  calorias: number;
  time: number;
  quemadas: number;
  met: number;

   // mensajes de error para validad formularios
   validation_messages = {
    'age': [
      { type: 'required', message: 'Edad es requerida' },
      { type: 'min', message: 'Edad contiene valores entre 18 y 89 años' },
      { type: 'max', message: 'Edad contiene valores entre 18 y 89 años' }
    ],
    'time': [
      { type: 'required', message: 'Tiempo es requerido' },
      { type: 'min', message: 'Tiempo contiene valores entre 10 y 120 min' },
      { type: 'max', message: 'Tiempo contiene valores entre 10 y 120 min' }
    ],
    'weigth': [
      { type: 'required', message: 'Peso es requerido' },
      { type: 'min', message: 'Peso contiene valores entre 30 y 200 kg' },
      { type: 'max', message: 'Peso contiene valores entre 30 y 200 kg' }
    ],
    'heigth': [
      { type: 'required', message: 'Altura es requerido' },
      { type: 'min', message: 'Altura contiene valores entre 130 y 220 cm' },
      { type: 'max', message: 'Altura contiene valores entre 130 y 220 cm' }
    ],
  };

  email: any;
  // usuario logeado real bdd
  private deportista: any = {};
  hoy = new Date();
  anos: number;
  // para segment
  section: string;

  constructor(private formBuilder: FormBuilder, private calcService: CalculadoraService
    ,private _deportistaService: DeportistasService) {
    this.section = 'imc';
    this.email = localStorage.getItem('email');
    this.getDeportista();
    // this.full_form();

   }

  ngOnInit() {
    this.imc_form = this.create_imc_form();
    this.peso_form = this.create_peso_form();
    this.caldi_form = this.create_caldi_form();
    this.calquem_form = this.create_calquem_form();
  }

  calcularIMC() {
    this.weigth = this.imc_form.value.weigth;
    this.heigth = this.imc_form.value.heigth;
    this.gender = this.imc_form.value.gender;
    this.imc = this.calcService.calcularIMC(this.weigth, this.heigth);
    if (this.gender === 'hombre') {
      this.gimch = true;
      this.gimcm = false;
    } else if (this.gender === 'mujer') {
      this.gimcm = true;
      this.gimch = false;
    }
    console.log(this.gimch);
    console.log(this.gimcm);
  }

  pesoIdeal() {
    this.gender = this.peso_form.value.gender;
    this.heigth = this.peso_form.value.heigth;
    this.p_ideal = this.calcService.pesoIdeal(this.heigth, this.gender);
  }

  caloriasD() {
    // Hombres: TMB = 66 + (13,7 x peso en kg) + (5 x altura en cm) - (6,75 x edad en años)
    // Mujeres: TMB = 655 + (9,6 x peso en kg) + (1.8 x altura en cm) - (4,7 x edad en años)
    this.gender = this.caldi_form.value.gender;
    this.weigth = this.caldi_form.value.weigth;
    this.heigth = this.caldi_form.value.heigth;
    this.active = this.caldi_form.value.active;
    this.age = this.caldi_form.value.age;
    this.calorias = this.calcService.caloriasD(this.gender, this.weigth, this.heigth, this.age, this.active);
    console.log(this.calorias);
  }

  calQuemadas() {
    console.log(this.calquem_form.value);
    this.met = this.calquem_form.value.met;
    this.weigth = this.calquem_form.value.weigth;
    this.quemadas = this.met * 0.0175 * this.weigth;
    this.time = this.calquem_form.value.time;
    console.log(this.quemadas);
  }


  // CONSTRUCCION DE FORMULARIO Y VALIDACIONES RESPECTIVAS
  create_imc_form() {
    return this.formBuilder.group({
      gender: new FormControl('mujer', Validators.required),
      weigth: new FormControl('', Validators.compose([
        Validators.required, Validators.min(30) , Validators.max(200)
      ])),
      heigth: new FormControl('', Validators.compose([
        Validators.required, Validators.min(130) , Validators.max(220)
      ])),
    });
  }

  create_peso_form() {
    return this.formBuilder.group({
      gender: new FormControl('mujer', Validators.required),
      heigth: new FormControl('', Validators.compose([
        Validators.required, Validators.min(130) , Validators.max(220)
      ])),
    });
  }

  create_caldi_form() {
    return this.formBuilder.group({
      gender: new FormControl('mujer', Validators.required),
      age: new FormControl('', Validators.compose([
        Validators.required, Validators.min(18) , Validators.max(89)
      ])),
      weigth: new FormControl('', Validators.compose([
        Validators.required, Validators.min(30) , Validators.max(200)
      ])),
      heigth: new FormControl('', Validators.compose([
        Validators.required, Validators.min(130) , Validators.max(220)
      ])),
      active: new FormControl('1.72', Validators.required),
    });
  }

  create_calquem_form() {
    return this.formBuilder.group({
      met: new FormControl('8', Validators.required),
      weigth: new FormControl('', Validators.compose([
        Validators.required, Validators.min(30) , Validators.max(200)
      ])),
      time: new FormControl('', Validators.compose([
        Validators.required, Validators.min(10) , Validators.max(120)
      ])),
    });
  }


  // llenar formularios reactivos
  full_form () {
    this.imc_form.setValue({
      gender : this.deportista.genero,
      weigth : this.deportista.peso,
      heigth: this.deportista.altura
    });
    this.peso_form.setValue({
      gender : this.deportista.genero,
      heigth: this.deportista.altura
    });
    this.caldi_form.setValue({
      gender : this.deportista.genero,
      age: this.anos,
      weigth : this.deportista.peso,
      heigth: this.deportista.altura,
      active: '1.72'
    });
    this.calquem_form.setValue({
      met : '8',
      weigth : this.deportista.peso,
      time: '',
    });
  }

  edad(fecha: Date) {
    const date = new Date(fecha);
    let edad = this.hoy.getFullYear() - date.getFullYear();
    const mes = this.hoy.getMonth() - date.getMonth();
    if (mes < 0 || (mes === 0 && this.hoy.getDate() < date.getDate())) {
      edad--;
    }
    return edad;
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

          this.anos = this.edad(this.deportista.fechaN);

          this.full_form();

        },
        error => {
          console.log(error);
        }

      );
  }

  
}
