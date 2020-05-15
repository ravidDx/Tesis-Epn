import { Component, OnInit } from '@angular/core';
import {PromocionService} from '../../services/promocion.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Promocion} from '../../interfaces/promocion.interface';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.scss']
})
export class PromocionComponent implements OnInit {

  cargar:boolean=false;

  promocion:Promocion = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagen:""
  }

  constructor(private _promocionService:PromocionService, private _activeRoute:ActivatedRoute) { 

    this._activeRoute.params.subscribe(
      params =>{
        console.log(params['_id']);
        this._promocionService.verPromocion(params['_id']).subscribe(
          data=>{
            //console.log(data);
            //this.imagenes=data['entrenamiento']['imagenes'];
            //data['entrenamiento']['imagenes'] = [];
            let codImg = data['promocion'].imagen; 
            data['promocion'].imagen = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';
            this.promocion=data['promocion'];
            
            this.cargarImagen(codImg);


            console.log(this.promocion);
          },
          error=>{
            console.log(error);
          }

        );
        
      });

  }

  ngOnInit() {
  }

  cargarImagen(item:any){

  
    this._promocionService.downloadUrl(item).subscribe(
      data=>{
        
        //console.log(indice);
        this.promocion.imagen= data;
        console.log(data);
      },
      error=>{
        //console.log('ERROR');
        //console.log(error);
      }
    );

    //console.log(_this.entrenamiento);

}


}
