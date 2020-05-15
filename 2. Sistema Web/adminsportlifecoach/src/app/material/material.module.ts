import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatPaginatorModule,
  MatTooltipModule
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
