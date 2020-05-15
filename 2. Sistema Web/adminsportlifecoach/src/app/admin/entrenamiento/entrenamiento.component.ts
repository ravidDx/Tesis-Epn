import { Component, OnInit } from '@angular/core';
import {PlanEntrenamientoService} from '../../services/plan-entrenamiento.service';
import {ActivatedRoute, Router} from '@angular/router';

import {PlanEntrenamiento} from '../../interfaces/planEntrenamiento.interface';

import { Validators } from '@angular/forms';


@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.component.html',
  styleUrls: ['./entrenamiento.component.scss']
})
export class EntrenamientoComponent implements OnInit {

  imagenes:any = [];
  cargar:boolean=false;


  nombre:any = '';
  apellido:any = '';
  objetivo:any = '';

  planEntrenamiento:PlanEntrenamiento = {
    deportista:{},
    rutinas:[],
    duracion:"",
    fechaCreacion:{},
    estado:'',
    progreso:'',
  }

  data:any=[];
  dias:any=[];

 color=['warning','success','danger', 'info', 'primary', 'secondary'];

  estado='Activo';

  entrenamiento:any=[];

  listEntrenaminetoXsemanas:any = [];

  listSemanas:any=[];

  listDias:any=[
    {
      dia:'Lunes',
      valor:'Descanso'
    },
    {
      dia:'Martes',
      valor:'Descanso'
    },
    {
      dia:'Miercoles',
      valor:'Descanso'
    },
    {
      dia:'Jueves',
      valor:'Descanso'
    },
    {
      dia:'Viernes',
      valor:'Descanso'
    },
    {
      dia:'Sabado',
      valor:'Descanso'
    }
    ,
    {
      dia:'Domingo',
      valor:'Descanso'
    }
  ]

  plan: any =[];


  constructor(private _planEntrenamientoService:PlanEntrenamientoService, private _activeRoute:ActivatedRoute) { 
    
    this._activeRoute.params.subscribe(
      params =>{
        this._planEntrenamientoService.verPlanEntrenamiento(params['_id']).subscribe(
          data=>{

            //console.log(data)
            this.planEntrenamiento=data;

            this.estado = this.planEntrenamiento.estado;
            this.nombre = this.planEntrenamiento.deportista['nombre'];
            this.apellido = this.planEntrenamiento.deportista['apellido'];
            this.objetivo = this.planEntrenamiento.deportista['objetivo'];
            this.listSemanas = [];

            this.planEntrenamiento.progreso =  parseFloat(this.planEntrenamiento.progreso).toFixed(2)
           
            for(let key$ in this.planEntrenamiento.rutinas){
              let rutina = this.planEntrenamiento.rutinas[key$]
              console.log(rutina, 'sera')
              
              this.totalSemanasEntrenamiento(rutina);
            }  
           
            
            /*
            for(let key$ in data.rutinas){
              let dias = data.rutinas[key$].dias;

              let listDiasCopy = Object.assign({},this.listDias);
                for(let key1$ in dias){
                    
          
                    for(let key2$ in listDiasCopy){

                      let obj=listDiasCopy[key2$];

                      if(obj.dia == dias[key1$] ){
                        obj.valor=data.rutinas[key$].rutina.titulo;
                      }

                  
                      
                    }
                }

                this.entrenamiento.push(listDiasCopy)

             }
            */
             console.log(this.entrenamiento);
             console.log(this.planEntrenamiento, 'este es');

            
          
          },
          error=>{
            console.log(error);
          }

        );
        
      });

    }


  ngOnInit() {
  }

  totalSemanasEntrenamiento(rutina:any){
    
   
    //this.listSemanas = [];


      for(let key$ in rutina.semanas){
        
          let obj = {
            semana: rutina.semanas[key$],
            rutina:rutina.rutina.titulo,
            ejercicios:rutina.rutina.ejercicios,
            dias:rutina.dias
          }
          this.listSemanas.push(obj);
      }
     
    




    console.log(this.listSemanas);
  }


  viewRutina(item:any){
    console.log(item),
    this.data=item.ejercicios;
    this.dias=item.dias;
    console.log(this.dias)
  }
}
