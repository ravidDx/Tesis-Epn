import { Injectable } from '@angular/core';

import {PlanEntrenamiento} from '../interfaces/planEntrenamiento.interface';


//version nueva para servicos resfult
import {HttpClient,HttpHeaders, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EntrenamientosService {

  url = window['urlFirebase'];
  planEntrenamientosUrl=this.url+'planEntrenamientos.json';
  planEntrenamientoUrl=this.url+'planEntrenamientos';


  
  constructor(private _http:HttpClient) { 

  }

  consultarPlanEntrenamientos():Observable<PlanEntrenamiento[]>{
  	return this._http.get<PlanEntrenamiento[]>(this.planEntrenamientosUrl);
  }

 
  verPlanEntrenamiento(indice:string){
  	let url =`${this.planEntrenamientoUrl}/${indice}.json`;
  	return this._http.get<PlanEntrenamiento>(url);
  }

  editarPlanEntrenamiento(planEntrenamiento:any,indice:string){
    
  	let url1 =`${this.planEntrenamientoUrl}/${indice}.json`;
  	return this._http.put<any>(url1,planEntrenamiento);
  }

     


}
