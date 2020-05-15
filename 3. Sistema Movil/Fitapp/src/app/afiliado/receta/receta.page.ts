import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//Interfas
import {Dieta} from '../../interfaces/dieta.interface';
//Servicios
import {DietasService} from '../../servicios/dietas.service';
import {StorageService} from '../../servicios/storage.service';


@Component({
  selector: 'app-receta',
  templateUrl: './receta.page.html',
  styleUrls: ['./receta.page.scss'],
})
export class RecetaPage implements OnInit {
dieta:Dieta = {
    tipo:"",
    titulo:"",
    objetivo:"",
    tiempo:"",
    dificultad:"",
	  porciones:"",
    ingredientes:[],
    preparacion:[],
    imagen:''
  }


  constructor(private _activateRute:ActivatedRoute,
              private _dietasService:DietasService,
              private _storageService:StorageService) { }

    ngOnInit() {
      let id = this._activateRute.snapshot.paramMap.get('id');
      this.consultarDieta(id);
      console.log(id);
    }



    consultarDieta(id:any){

      var _this = this;
      this._dietasService.consultarDieta(id)
        .subscribe(
          data=>{
            //console.log(data['entrenamiento'])
            this.dieta = data;
            
            this.getUrlsImg(this.dieta);
  
            console.log(this.dieta);

          
  
          },
          error=>{
            console.log(error);
          }
    
        );
  
    }


    
      //Devuelve la url de la imagen
      getUrlsImg(dieta:any){
        dieta['idImg']=dieta['imagen'];
        this._storageService.downloadUrlDieta(dieta['imagen']).subscribe(
          data=>{
            dieta['imagen']=data;   
              
          },
          error=>{
            console.log('ERROR');
            console.log(error);
            
          }
        );
  
        dieta['imagen'] = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';
  
    }



  


}
