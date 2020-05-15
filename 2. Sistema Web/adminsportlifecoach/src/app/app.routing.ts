import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './guards/auth.guard';

/*COMPONENTES*/
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {SingleComponent} from './pages/single/single.component';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes =[
  /*
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },*/  
  /*
  {
    path: '',
    component: SingleComponent
  },*/
  {
    path: '',
    component: SigninComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: '',
    component: AdminLayoutComponent, canActivate:[AuthGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {path:"**", pathMatch:"full", redirectTo:""},
    // { path: 'dashboard',      component: DashboardComponent },
    // { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    // { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
