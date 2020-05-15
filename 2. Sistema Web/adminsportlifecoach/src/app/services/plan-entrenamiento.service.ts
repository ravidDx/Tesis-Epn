import { Injectable } from '@angular/core';
import {PlanEntrenamiento} from '../interfaces/planEntrenamiento.interface';

//version nueva para servicos resfult
import {HttpClient,HttpHeaders, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlanEntrenamientoService {

  url = window['urlFirebase'];
  planEntrenamientosUrl=this.url+'planEntrenamientos.json';
  planEntrenamientoUrl=this.url+'planEntrenamientos';

  constructor(private _http:HttpClient) { 

  }

  nuevoPlanEntrenamiento(nuevo:PlanEntrenamiento):Observable<PlanEntrenamiento>{
    return this._http.post<PlanEntrenamiento>(this.planEntrenamientosUrl,nuevo);
  }

  consultarPlanEntrenamientos():Observable<PlanEntrenamiento[]>{
  	return this._http.get<PlanEntrenamiento[]>(this.planEntrenamientosUrl);
  }

  editarPlanEntrenamiento(planEntrenamiento:PlanEntrenamiento,indice:string){
  
  	let url =`${this.planEntrenamientoUrl}/${indice}.json`;
  	return this._http.put<PlanEntrenamiento>(url,planEntrenamiento);
  }


  verPlanEntrenamiento(indice:string){
  	let url =`${this.planEntrenamientoUrl}/${indice}.json`;
  	return this._http.get<PlanEntrenamiento>(url);
  }

     
  darBajaPlanEntrenamiento(planEntrenamiento:PlanEntrenamiento,indice:string){  
    let url =`${this.planEntrenamientoUrl}/${indice}.json`;
  	return this._http.put<PlanEntrenamiento>(url,planEntrenamiento);
  }




}
