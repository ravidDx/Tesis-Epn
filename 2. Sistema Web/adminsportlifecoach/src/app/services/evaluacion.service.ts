import { Injectable } from '@angular/core';

import {Evaluacion} from '../interfaces/evaluacion.interface';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {


  url = window['urlFirebase'];

  evaluacionesUrl=this.url+'evaluaciones.json';
  evaluacionUrl=this.url+'evaluaciones';

  
  constructor(private _http:HttpClient) { }

  nuevaEvaluacion(nuevo:Evaluacion):Observable<Evaluacion>{
    return this._http.post<Evaluacion>(this.evaluacionesUrl,nuevo);
  }

  consultarEvaluaciones():Observable<Evaluacion[]>{
    return this._http.get<Evaluacion[]>(this.evaluacionesUrl);
  }

  
  editarEvaluacion(evaluacion:Evaluacion,indice:string){  
    let url =`${this.evaluacionUrl}/${indice}.json`;
  	return this._http.put<Evaluacion>(url,evaluacion);
  }

  
  eliminarEvaluacion(indice:string){
  	let url =`${this.evaluacionUrl}/${indice}`;
  	return this._http.delete(url);
  }

  /*
  darBajaDeportista(deportista:Deportista,indice:string){  
    let url =`${this.deportistaUrl}/${indice}.json`;
  	return this._http.put<Deportista>(url,deportista);
  }*/

  verEvaluacion(indice:string){  
    let url =`${this.evaluacionUrl}/${indice}.json`;
  	return this._http.get<Evaluacion>(url);
  }


 


}
