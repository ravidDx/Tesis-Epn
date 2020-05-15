import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';


/*COMPONENTES ROL ADMIN*/
import { DeportistasComponent } from '../../admin/deportistas/deportistas.component';
import { DeportistaComponent } from '../..//admin/deportista/deportista.component';
import { EjerciciosComponent } from '../../admin/ejercicios/ejercicios.component';
import { EjercicioComponent } from '../..//admin/ejercicio/ejercicio.component';
import { DietaComponent } from '../..//admin/dieta/dieta.component';
import { DietasComponent } from '../..//admin/dietas/dietas.component';
import { PromocionesComponent } from '../..//admin/promociones/promociones.component';
import { PromocionComponent } from '../..//admin/promocion/promocion.component';
import { EstadisticasComponent } from '../..//admin/estadisticas/estadisticas.component';
import { RutinasComponent } from '../../admin/rutinas/rutinas.component';
import { RutinaComponent } from '../../admin/rutina/rutina.component';
import { EntrenamientosComponent } from '../../admin/entrenamientos/entrenamientos.component';
import { EntrenamientoComponent } from '../../admin/entrenamiento/entrenamiento.component';

/*COMPONENTES ROL SUPER ADMIN*/
import { SlidersComponent } from '../../super/sliders/sliders.component';
import { AboutComponent } from '../../super/about/about.component';
import { ServicesComponent } from '../../super/services/services.component';
import { PortafolioComponent } from '../../super/portafolio/portafolio.component';
import { PostsComponent } from '../../super/posts/posts.component';
import { ContactoComponent } from '../../super/contacto/contacto.component';
import { CredencialesComponent } from '../../super/credenciales/credenciales.component';
import { CategoriasComponent } from '../../admin/categorias/categorias.component';

import { HttpClientModule } from '@angular/common/http';

import { PreloadComponent } from '../../loading/preload/preload.component';

import {ProgressBarModule} from 'angular-progress-bar';





/*
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';
*/

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule ,
  MatIconModule,
  MatProgressBarModule,
  MatChipsModule,
  MatCardModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatSliderModule 
} from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatCardModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatSliderModule,
    ProgressBarModule,
    HttpClientModule
  ],
  declarations: [
    DashboardComponent,
    DeportistasComponent,
    DeportistaComponent,
    EjerciciosComponent,
    EjercicioComponent,
    DietaComponent,
    DietasComponent,
    PromocionesComponent,
    PromocionComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    SlidersComponent,
    AboutComponent,
    ServicesComponent,
    PortafolioComponent,
    ContactoComponent,
    PostsComponent,
    CredencialesComponent,
    CategoriasComponent,
    EstadisticasComponent,
    RutinasComponent,
    RutinaComponent,
    EntrenamientoComponent,
    EntrenamientosComponent,
    PreloadComponent
  ]
})

export class AdminLayoutModule {}
