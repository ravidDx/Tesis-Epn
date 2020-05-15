import { Component, OnInit } from '@angular/core';
import {EntrenamientoService} from '../../services/entrenamiento.service';
import {ActivatedRoute, Router} from '@angular/router';

import {Entrenamiento} from '../../interfaces/entrenamiento.interface';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.scss']
})
export class EjercicioComponent implements OnInit {

  imagenes:any = [];
  cargar:boolean=false;

  
  entrenamiento:Entrenamiento = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagen:"",
    dificultad:'',
    fechaCreacion:{},
    estado:"",
    instruccion:"",
  }

  estado='Activo';

  


  constructor(private _entrenamientoService:EntrenamientoService, private _activeRoute:ActivatedRoute) { 

    this._activeRoute.params.subscribe(
      params =>{
        this._entrenamientoService.verEntrenamiento(params['_id']).subscribe(
          data=>{

            console.log(data)
            this.entrenamiento=data;

            this.estado = this.entrenamiento.estado;
            this.cargarUrlImagen(this.entrenamiento.imagen);
          },
          error=>{
            console.log(error);
          }

        );
        
      });

  }

  ngOnInit() {
  }
  urlImage=''
  cargarUrlImagen(idImagen:any){

    //this.urlImage = "https://2.bp.blogspot.com/-zpkdHbE717M/V6zIBmEpDFI/AAAAAAAAA-0/APQQeS8fCRw3eSITJVZZ68oIeeol1TjDwCLcB/s1600/bella%2Bla%2Bpaz%2Bcopia.jpg";

    this._entrenamientoService.downloadUrl(idImagen).subscribe(
      data=>{ 
        this.entrenamiento.imagen = data;
        
      },
      error=>{
        console.log('ERROR');
        console.log(error);
      }
    );

    


  }

  

}
