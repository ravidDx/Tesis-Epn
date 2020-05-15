import { Injectable } from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {take,map,tap} from 'rxjs/operators';

import { AuthService } from '../servicios/auth.service';
 

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public _authService: AuthService) { }
/*
  canActivate(): boolean {
    return this._authService.isAuthenticated();
  }
*/

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  const rol = localStorage.getItem('rol');
  console.log('next data rol '+next.data.role)
  console.log('rol es: '+ rol)
  if (rol === next.data.role){
    console.log('entro');
    return true;
  }else{
    if(rol === 'Afiliado'){
      console.log('siii');
    }
    if(rol === 'no afiliado'){
      console.log('nooo');
    }
  }
}

}
