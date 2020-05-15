import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EntrenamientosPage } from './entrenamientos.page';
import { ModalPage } from '../modal/modal.page';
import { ModalPageModule } from '../modal/modal.module';

const routes: Routes = [
  {
    path: '',
    component: EntrenamientosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, ModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EntrenamientosPage],
  entryComponents: [
    ModalPage
  ]
})
export class EntrenamientosPageModule {}
