import { Injectable } from '@angular/core';
import {Dieta} from '../interfaces/dieta.interface';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietasService {

  url = window['urlFirebase'];

  dietasUrl=this.url+"recetas.json";
  dietaUrl=this.url+"recetas";

  constructor(private _http:HttpClient) { }

  consultarDietas():Observable<Dieta[]>{
  	return this._http.get<Dieta[]>(this.dietasUrl);
  }

  consultarDieta(indice:string){
  	let url =`${this.dietaUrl}/${indice}.json`;
  	return this._http.get<Dieta>(url);
  }


  

}
