import { Component, OnInit } from '@angular/core';
import {RutinaService} from '../../services/rutina.service';
import {ActivatedRoute, Router} from '@angular/router';

import {Rutina} from '../../interfaces/rutina.interface';

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.scss']
})
export class RutinaComponent implements OnInit {

  imagenes:any = [];
  cargar:boolean=false;

  rutina:Rutina = {
    titulo:"",
    objetivo:"",
    ejercicios:[],
    duracion:"",
    dificultad:'',
    fechaCreacion:{},
    estado:'',
  }

  estado='Activo';


  constructor(private _rutinaService:RutinaService, private _activeRoute:ActivatedRoute) { 

    this._activeRoute.params.subscribe(
      params =>{
        this._rutinaService.verRutina(params['_id']).subscribe(
          data=>{

            console.log(data)
            this.rutina=data;

            this.estado = this.rutina.estado;
            //this.cargarUrlImagen(this.entrenamiento.imagen);
          },
          error=>{
            console.log(error);
          }

        );
        
      });

  }


  ngOnInit() {
  }

}
