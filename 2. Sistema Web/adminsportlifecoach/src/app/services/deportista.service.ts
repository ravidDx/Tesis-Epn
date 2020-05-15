import { Injectable } from '@angular/core';
import {Deportista} from '../interfaces/deportista.interface';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeportistaService {

  //deportistasUrl="https://api-tesis-ravid87.c9users.io:8080/api/deportistas";
  //deportistaUrl="https://api-tesis-ravid87.c9users.io:8080/api/deportista";

  //deportistasUrl="http://port-3000.api-tesis-geovascorpioncool972402.codeanyapp.com/api/deportistas";
  //deportistaUrl="http://port-3000.api-tesis-geovascorpioncool972402.codeanyapp.com/api/deportista";

  //deportistasUrl="http://node27.codenvy.io:42334/api/deportistas";
  //deportistaUrl="http://node27.codenvy.io:42334/api/deportista";;
  
  //deportistasUrl="https://ca07c33860904ca2acd454193de1766a.vfs.cloud9.us-east-2.amazonaws.com/api/deportistas";
  //deportistaUrl="https://ca07c33860904ca2acd454193de1766a.vfs.cloud9.us-east-2.amazonaws.com/api/deportista";

 //url = window['urlApi'];
 url = window['urlFirebase'];

 //deportistasUrl=this.url+":8080/api/deportistas";
 //deportistaUrl=this.url+":8080/api/deportista";

 deportistasUrl=this.url+'deportistas.json';
 deportistaUrl=this.url+'deportistas';

  
  constructor(private _http:HttpClient) { }


nuevoDeportista(nuevo:Deportista):Observable<Deportista>{
    return this._http.post<Deportista>(this.deportistasUrl,nuevo);
  }

  consultarDesportistas():Observable<Deportista[]>{
    return this._http.get<Deportista[]>(this.deportistasUrl);
  }

  
  editarDeportista(deportista:Deportista, indice:string){  
    let url =`${this.deportistaUrl}/${indice}.json`;
  	return this._http.put<Deportista>(url,deportista);
  }

  
  eliminarDeportista(indice:string){
  	let url =`${this.deportistaUrl}/${indice}`;
  	return this._http.delete(url);
  }

  darBajaDeportista(deportista:Deportista,indice:string){  
    let url =`${this.deportistaUrl}/${indice}.json`;
  	return this._http.put<Deportista>(url,deportista);
  }

  verDeportista(indice:string){  
    let url =`${this.deportistaUrl}/${indice}.json`;
  	return this._http.get<Deportista>(url);
  }


 /*  nuevoDeportista(nuevo:Deportista):Observable<Deportista>{
    let trap = this._http.post<Deportista>(this.deportistaUrl,nuevo); 
    console.log('deportistas');
    console.log(trap);
    return trap;
  }
*/ 

/*
  consultarDesportistas():Observable<Deportista[]>{
    let trap = this._http.get<Deportista[]>(this.deportistasUrl);
    console.log('deportistas');
    console.log(trap);
  	return trap;
  }*/
  /*
  editarDeportista(deportista:Deportista,indice:string){
  	let url =`${this.deportistaUrl}/${indice}`;
  	return this._http.put<Deportista>(url,deportista);
  }*/

  /*
  eliminarDeportista(indice:string){
  	let url =`${this.deportistaUrl}/${indice}`;
  	return this._http.delete(url);
  }*/
/*
  verDeportista(indice:string){
  	let url =`${this.deportistaUrl}/${indice}`;
  	return this._http.get<Deportista>(url);
  }*/

}
