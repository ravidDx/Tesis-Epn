import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EjercicioPersonalPage } from './ejercicio-personal.page';

const routes: Routes = [
  {
    path: '',
    component: EjercicioPersonalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EjercicioPersonalPage]
})
export class EjercicioPersonalPageModule {}
