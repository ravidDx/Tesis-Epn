import { Injectable } from '@angular/core';
//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  url = window['urlFirebase'];
  categoriasEntrenUrl=this.url+'categoriaEntrenamiento.json';
  categoriasDietaUrl=this.url+'categoriaDieta.json';

  constructor(private _http:HttpClient) { }

  

  getCategoriasEntrenamiento(){
    return this._http.get<any[]>(this.categoriasEntrenUrl)
  }

  getCategoriasDieta(){
    return this._http.get<any[]>(this.categoriasDietaUrl)
  }


}
