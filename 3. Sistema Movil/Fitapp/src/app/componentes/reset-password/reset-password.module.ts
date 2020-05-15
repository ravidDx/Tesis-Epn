import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// formularios reactivos
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPage } from './reset-password.page';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule {}
