import { Injectable } from '@angular/core';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = window['urlFirebase'];

  categoriasEntrenUrl=this.url+'categoriaEntrenamiento.json';
  categoriaEntrenUrl=this.url+'categoriaEntrenamiento';

  categoriasDietaUrl=this.url+'categoriaDieta.json';
  categoriaDietaUrl=this.url+'categoriaDieta';


  constructor(private _http:HttpClient) { }

  getCategoriasEntrenamiento(){
    return this._http.get<any[]>(this.categoriasEntrenUrl)
  }

  updateCategoriasEntrenamiento(categoria:any,id:string){
    let url =`${this.categoriaEntrenUrl}/${id}.json`;
    return this._http.put<any>(url,categoria);     
  }

  newCategoriaEntrenamiento(nuevo:any):Observable<any>{
    return this._http.post<any>(this.categoriasEntrenUrl,nuevo);
  }

  deletedCategoriaEntrenamiento(indice:string){
  	let url =`${this.categoriaEntrenUrl}/${indice}.json`;
  	return this._http.delete(url);
  }



  getCategoriasDieta(){
    return this._http.get<any[]>(this.categoriasDietaUrl)
  }

  updateCategoriasDieta(categoria:any,id:string){
    let url =`${this.categoriaDietaUrl}/${id}.json`;
    return this._http.put<any>(url,categoria);     
  }

  newCategoriaDieta(nuevo:any):Observable<any>{
    return this._http.post<any>(this.categoriasDietaUrl,nuevo);
  }
  
  deletedCategoriaDieta(indice:string){
  	let url =`${this.categoriaDietaUrl}/${indice}.json`;
  	return this._http.delete(url);
  }

}
