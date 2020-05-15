import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  imc: number;
  p_ideal: number;
  calorias: number;
  constructor() { }


  calcularIMC(weigth: number , heigth: number) {
    return this.imc = (weigth / Math.pow((heigth / 100), 2));
  }

  pesoIdeal(heigth: number, gender: string) {
    if (gender === 'hombre') {
      return this.p_ideal = (heigth - 100) * 0.90;
    } else if (gender === 'mujer') {
      return this.p_ideal = (heigth - 100) * 0.85;
    }
  }

  caloriasD(gender: string, weigth: number , heigth: number, age: number, active: number) {
    // Hombres: TMB = 66 + (13,7 x peso en kg) + (5 x altura en cm) - (6,75 x edad en años)
    // Mujeres: TMB = 655 + (9,6 x peso en kg) + (1.8 x altura en cm) - (4,7 x edad en años)
    if (gender === 'hombre') {
      return this.calorias = (66 + (13.7 * weigth) + (5 * heigth) - (6.75 * age)) * active;
    } else if (gender === 'mujer') {
      return this.calorias = (655 + (9.6 * weigth) + (1.8 * heigth) - (4.7 * age)) * active;
    }
  }
}
