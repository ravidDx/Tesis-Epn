import { Injectable } from '@angular/core';

import {Rutina} from '../interfaces/rutina.interface';


//version nueva para servicos resfult
import {HttpClient,HttpHeaders, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {

  url = window['urlFirebase'];
  rutinasUrl=this.url+'rutinas.json';
  rutinaUrl=this.url+'rutinas';

  
    

  constructor(private _http:HttpClient ) { }

  consultarRutinas():Observable<Rutina[]>{
  	return this._http.get<Rutina[]>(this.rutinasUrl);
  }


  verRutina(indice:string){
  	let url =`${this.rutinaUrl}/${indice}.json`;
  	return this._http.get<Rutina>(url);
  }


}
