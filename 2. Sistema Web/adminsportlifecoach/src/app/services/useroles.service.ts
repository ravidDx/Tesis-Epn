import { Injectable } from '@angular/core';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserolesService {

  url = window['urlFirebase'];

  userolesUrl=this.url+'useroles.json';
  userolUrl=this.url+'useroles';

  



  constructor(private _http:HttpClient) { }

  newUserRole(nuevo:any):Observable<any>{
    return this._http.post<any>(this.userolesUrl,nuevo);
  }

  getUserRole(){
    return this._http.get<any[]>(this.userolesUrl)
  }

}
