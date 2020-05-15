import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

import {AngularFireDatabase, AngularFireList} from '@angular/fire/database'

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserolesService {

  userList:AngularFireList<any>;

  url = window['urlFirebase'];

  userolesUrl=this.url+'useroles.json';
  userolUrl=this.url+'useroles';



  constructor(public afAuth:AngularFireAuth, private _firebase:AngularFireDatabase, private _http:HttpClient) { }


  getTipoUser(){
    
    return this.userList = this._firebase.list('useroles');
  }

  newUserRole(nuevo:any):Observable<any>{
    return this._http.post<any>(this.userolesUrl,nuevo);
  }



}
