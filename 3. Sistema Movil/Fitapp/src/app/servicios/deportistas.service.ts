
import { Injectable } from '@angular/core';
import {Deportista} from '../interfaces/deportista.interface';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeportistasService {

  url = window['urlFirebase'];
 deportistasUrl=this.url+'deportistas.json';
 deportistaUrl=this.url+'deportistas';

 constructor(private _http:HttpClient) { }

 consultarDesportistas():Observable<Deportista[]>{
  return this._http.get<Deportista[]>(this.deportistasUrl);
}

editarDeportista(deportista:Deportista, indice:string){  
  console.log(deportista.nombre, 'desde servicio');
  console.log(indice, 'desde servicio');
  let url =`${this.deportistaUrl}/${indice}.json`;
  return this._http.put<Deportista>(url,deportista);
}



  
}
