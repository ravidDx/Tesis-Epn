import { Injectable } from '@angular/core';
import {Rutina} from '../interfaces/rutina.interface';

//version nueva para servicos resfult
import {HttpClient,HttpHeaders, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  url = window['urlFirebase'];
  rutinasUrl=this.url+'rutinas.json';
  rutinaUrl=this.url+'rutinas';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'secret-key'
    })
   };
    

  constructor(private _http:HttpClient ) { }


  nuevaRutina(nuevo:Rutina):Observable<Rutina>{
    return this._http.post<Rutina>(this.rutinasUrl,nuevo);
  }

  consultarRutinas():Observable<Rutina[]>{
  	return this._http.get<Rutina[]>(this.rutinasUrl);
  }

  editarRutina(rutina:Rutina,indice:string){
    
  	let url =`${this.rutinaUrl}/${indice}.json`;
  	return this._http.put<Rutina>(url,rutina);
  }


  verRutina(indice:string){
  	let url =`${this.rutinaUrl}/${indice}.json`;
  	return this._http.get<Rutina>(url);
  }

     
  darBajaRutina(rutina:Rutina,indice:string){  
    let url =`${this.rutinaUrl}/${indice}.json`;
  	return this._http.put<Rutina>(url,rutina);
  }



}
