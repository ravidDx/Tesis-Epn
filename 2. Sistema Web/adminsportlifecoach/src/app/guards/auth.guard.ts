import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {take,map,tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{

  constructor(public  afAuth:AngularFireAuth, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      
    return this.afAuth.authState
    .pipe(take(1))
    .pipe(map(authState => !!authState))
    .pipe(tap(auth=>{
    	if(!auth){
    		this.router.navigate(['/signin'])
    	}
    }))
    ;
  }
  
}
