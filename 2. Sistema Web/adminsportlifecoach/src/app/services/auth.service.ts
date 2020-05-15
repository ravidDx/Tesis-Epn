import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {map} from 'rxjs/operators'

import {AngularFireDatabase, AngularFireList} from '@angular/fire/database'




import { EmailValidator } from '@angular/forms';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userList:AngularFireList<any>;


  constructor(public  afAuth:AngularFireAuth, private _firebase:AngularFireDatabase) { }

  registerUser(){}
  loginEmailUser(email:string, pass:string){
  	return new Promise((resolve, reject)=>{
  		this.afAuth.auth.signInWithEmailAndPassword(email,pass)
  		  .then(userData =>resolve(userData),
  		  err => reject(err))
  	});

  }
  loginFacebookUser(){}
  loginGoogleUser(){}
  logoutUser(){ 
    console.log('logoutUser');
    this.clear();
  	return this.afAuth.auth.signOut();
  }

  isAuth(){
    console.log('isAuth');
    console.log(localStorage.getItem('rol'));
    //localStorage.setItem('rol',data['rol']);
    
    return this.afAuth.authState.pipe(map(auth=>auth)); 
  }

  getTipoUser(){
    
    return this.userList = this._firebase.list('usuarios');
  }
  


  /**
   * this is used to clear anything that needs to be removed
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   * check for expiration and if token is still existing or not
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this.isTokenExpired();
  }

  // simulate jwt token is valid
  // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
  isTokenExpired(): boolean {
    return false;
  }

  loginAdmin(): void {
    localStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJyb2xlIjoiQWRtaW4ifQ.rEkg53_IeCLzGHlmaHTEO8KF5BNfl6NEJ8w-VEq2PkE`);

   // this._router.navigate(['/dashboard']);
  }

  login(): void {
    localStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20ifQ.GA0Y9gYIjmx1jLwuRHuBgZ8m6o-NgkD84nO0ym68CWo`);

    //this._router.navigate(['/dashboard']);
  }

  /**
   * this is used to clear local storage and also the route to login
   */
  logout(): void {
    this.clear();
    //this._router.navigate(['/login']);
  }



  /*
  *Registro con email
  */
 signUpWithEmail(email:any, pass:any):Promise<firebase.auth.UserCredential>{
    return this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
 }







  
}
