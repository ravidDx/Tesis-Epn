import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

//storage firebase
import {AngularFireStorage} from '@angular/fire/storage';

/*INTERFACES */
import {Service} from '../models/service';
import {Portafolio} from '../models/portafolio.interface';
import {Contacto} from '../models/contacto.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  url="https://miapp-158221.firebaseio.com/";
  serviceUrl = this.url+"servicios.json";
  slidersUrl=this.url+'home.json';
  portafolioUrl=this.url+"portafolio.json";
  contactosUrl=this.url+'contacto.json';

  servicesList:AngularFireList<Service>;
  //servicesList;
  constructor(private firebase:AngularFireDatabase,private _http:HttpClient, private storage:AngularFireStorage) { }

  getServices(){
    return this.servicesList = this.firebase.list('servicios');
  }

  getSliders(){
    return this._http.get<any[]>(this.slidersUrl)
  }

  getAbout(){
    return this.servicesList = this.firebase.list('about');
  }
  
  getNoticias(){
    return this.servicesList = this.firebase.list('noticias');
  }

  getPortafolio(){
    return this._http.get<Portafolio[]>(this.portafolioUrl)
  }

  getServicesUrl(){
    return this._http.get(this.serviceUrl);  
  }

  getContactos(){
    return this._http.get<Contacto[]>(this.contactosUrl)
  }




  onUpload(data:any,id:any){
    const file = data;
    const filePath = `paginaweb/sliders/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
  
  }
  
  downloadUrl(id:any){
    //console.log('servicio');
    const filePath = `paginaweb/sliders/${id}`;
    const imgRef = this.storage.ref(filePath);
    //console.log(imgRef.getDownloadURL());
    return imgRef.getDownloadURL();
  }



}
