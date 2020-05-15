import { Injectable } from '@angular/core';
import {Promocion} from '../interfaces/promocion.interface';

//version nueva para servicos resfult
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

//storage firebase
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  url = window['urlFirebase'];

  promocionesUrl=this.url+"promociones.json";
  promocionUrl=this.url+"promociones";

  constructor(private _http:HttpClient, 
              private storage:AngularFireStorage) { }

  nuevaPromocion(nuevo:Promocion):Observable<Promocion>{
    return this._http.post<Promocion>(this.promocionesUrl,nuevo);
  }


  consultarPromociones():Observable<Promocion[]>{
  	return this._http.get<Promocion[]>(this.promocionesUrl);
  }

  editarPromocion(promocion:Promocion,indice:string){
  	let url =`${this.promocionUrl}/${indice}.json`;
  	return this._http.put<Promocion>(url,promocion);
  }

  eliminarPromocion(indice:string){
    let url =`${this.promocionUrl}/${indice}.json`;
    console.log(url)
  	return this._http.delete(url);
  }

  verPromocion(indice:string){
  	let url =`${this.promocionUrl}/${indice}.json`;
  	return this._http.get<Promocion>(url);
  }


  onUpload(data:any,id:any){
    const file = data;
    const filePath = `uploads/promocion_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
        
  }

  downloadUrl(id:any){
    const filePath = `uploads/promocion_${id}`;
    const imgRef = this.storage.ref(filePath);

    return imgRef.getDownloadURL();
  }

}
