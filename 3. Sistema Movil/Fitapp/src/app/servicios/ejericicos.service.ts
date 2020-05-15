import { Injectable } from '@angular/core';
import {Ejercicio} from '../interfaces/ejercicio.interface';


//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjericicosService {

  url = window['urlFirebase'];
  
  entrenamientosUrl=this.url+"entrenamientos.json";
  entrenamientoUrl=this.url+"entrenamientos";

  constructor(private _http:HttpClient) { 

  }

  consultarEjercicios():Observable<any[]>{
  	return this._http.get<Ejercicio[]>(this.entrenamientosUrl);
  }

  consultarEjercicio(indice:string){
  	let url =`${this.entrenamientoUrl}/${indice}.json`;
  	return this._http.get<Ejercicio>(url);


  }


}
