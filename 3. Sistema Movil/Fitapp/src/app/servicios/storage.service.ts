import { Injectable } from '@angular/core';

//storage firebase
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _storage:AngularFireStorage) { }
  
  downloadUrl(id:any){
    const filePath = `uploads/entrenamiento_${id}`;
    const imgRef = this._storage.ref(filePath);

    return imgRef.getDownloadURL();
  }

  downloadUrlDieta(id:any){
    const filePath = `uploads/dieta_${id}`;
    const imgRef = this._storage.ref(filePath);
    console.log(id)
    return imgRef.getDownloadURL();
  }


  downloadUrlEjercicio(id:any){
    const filePath = `uploads/entrenamiento_${id}`;
    const imgRef = this._storage.ref(filePath);

    return imgRef.getDownloadURL();
  }


  
}
