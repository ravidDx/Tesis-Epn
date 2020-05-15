import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// formularios reactivos
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalculadoraPage } from './calculadora.page';

const routes: Routes = [
  {
    path: '',
    component: CalculadoraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalculadoraPage]
})
export class CalculadoraPageModule {}
