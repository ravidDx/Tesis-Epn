import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuardService } from '../../servicios/auth-guard.service';

import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    canActivate:[AuthGuardService], data:{role:'no afiliado'},
    component: TabsPage,
    children: [
      {
        path: 'dietas',
        children: [
          {
            path: '',
            loadChildren: () => import('../../componentes/dietas/dietas.module').then(m => m.DietasPageModule)
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../../componentes/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'ejercicios',
        children: [
          {
            path: '',
            loadChildren: () => import('../../componentes/ejercicios/ejercicios.module').then(m => m.EjerciciosPageModule)
          }
        ]
      },
      {
        path: 'calculadora',
        children: [
          {
            path: '',
            loadChildren: () => import('../../componentes/calculadora/calculadora.module').then(m => m.CalculadoraPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'afiliado/tabs',
    canActivate:[AuthGuardService], data:{role:'Afiliado'},
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../../afiliado/home/home.module').then(m => m.HomePageModule)
          }
         
        ]
      },  
      {
        path: 'entrenamientos',
        children: [
          {
            path: '',
            loadChildren: () => import('../../afiliado/entrenamientos/entrenamientos.module').then(m => m.EntrenamientosPageModule)
          }
        ]
      },
       {
        path: 'recetas',
        children: [
          {
            path: '',
            loadChildren: () => import('../../afiliado/recetas/recetas.module').then(m => m.RecetasPageModule)
          }
        ]
      },
      {
        path: 'calculadora',
        children: [
          {
            path: '',
            loadChildren: () => import('../../afiliado/calculadora/calculadora.module').then(m => m.CalculadoraPageModule)
          }
        ]
      },


      { path: '**',           redirectTo: '/slides'}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
