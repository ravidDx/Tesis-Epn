import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// formularios reactivos
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GenderPage } from './gender.page';

const routes: Routes = [
  {
    path: '',
    component: GenderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GenderPage]
})
export class GenderPageModule {}
