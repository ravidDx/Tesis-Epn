import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {take,map,tap} from 'rxjs/operators';

import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements  CanActivate{

  constructor(public  afAuth:AngularFireAuth, private router:Router, private _authService:AuthService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const rol = localStorage.getItem('rol');
    console.log('Usuario rol: '+ rol)
    if (rol === next.data.role){
      console.log('entro');
      return true;
    }else{
      if(rol === 'super'){
        console.log('super');
      }
      if(rol === 'admin'){
        console.log('admin');
      }
    }
    
    //navigate to not found page
    console.log('no entro');
    
    //console.log('roter navigate')
    //console.log(rol);
    //this.router.navigate(['/inicio']);
    return false;
    
  }
}
