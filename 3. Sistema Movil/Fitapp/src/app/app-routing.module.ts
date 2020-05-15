import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./componentes/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'slide', loadChildren: () => import('./componentes/slide/slide.module').then(m => m.SlidePageModule) },
  { path: 'login', loadChildren: () => import('./componentes/login/login.module').then(m => m.LoginPageModule) },
  { path: 'news', loadChildren: () => import('./componentes/news/news.module').then(m => m.NewsPageModule) },
  { path: 'perfil', loadChildren: () => import('./componentes/perfil/perfil.module').then(m => m.PerfilPageModule) },
  { path: 'dietas/dieta', loadChildren: () => import('./componentes/dieta/dieta.module').then(m => m.DietaPageModule) },
  { path: 'calculadora', loadChildren: () => import('./componentes/calculadora/calculadora.module').then(m => m.CalculadoraPageModule) },
  { path: 'ejertipos', loadChildren: () => import('./componentes/ejertipos/ejertipos.module').then(m => m.EjertiposPageModule) },
  { path: 'ejercicio/:id', loadChildren: './componentes/ejercicio/ejercicio.module#EjercicioPageModule' },
  { path: 'dieta/:id', loadChildren: () => import('./componentes/dieta/dieta.module').then(m => m.DietaPageModule) },
  
  {
    path: 'registro/personal', loadChildren: () => import('./componentes/registro/personal/personal.module')
      .then(m => m.PersonalPageModule)
  },
  { path: 'registro/gender', loadChildren: () => import('./componentes/registro/gender/gender.module').then(m => m.GenderPageModule) },
  { path: 'registro/datos', loadChildren: () => import('./componentes/registro/datos/datos.module').then(m => m.DatosPageModule) },
  { path: 'reset-password', loadChildren: './componentes/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'home', loadChildren: './afiliado/home/home.module#HomePageModule' },
  { path: 'entrenamientos', loadChildren: './afiliado/entrenamientos/entrenamientos.module#EntrenamientosPageModule' },
  { path: 'rutina/:id', loadChildren: './afiliado/rutina/rutina.module#RutinaPageModule' },

  { path: 'ejercicio-personal/:id', loadChildren: './afiliado/ejercicio-personal/ejercicio-personal.module#EjercicioPersonalPageModule' },

  { path: 'recetas', loadChildren: './afiliado/recetas/recetas.module#RecetasPageModule' },
  { path: 'receta/:id', loadChildren: './afiliado/receta/receta.module#RecetaPageModule' },
  { path: 'afiliado/perfil', loadChildren: './afiliado/perfil/perfil.module#PerfilPageModule' },
  { path: 'calculadora', loadChildren: './afiliado/calculadora/calculadora.module#CalculadoraPageModule' },
  //{ path: 'modal', loadChildren: './afiliado/modal/modal.module#ModalPageModule' },






  





  /*{ path: 'dietas', loadChildren: './dietas/dietas.module#DietasPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'ejercicios', loadChildren: './ejercicios/ejercicios.module#EjerciciosPageModule' },
  { path: 'estadisticas', loadChildren: './estadisticas/estadisticas.module#EstadisticasPageModule' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
