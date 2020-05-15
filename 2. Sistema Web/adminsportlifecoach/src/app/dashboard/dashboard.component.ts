import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from "@angular/router";

import {Deportista} from '../interfaces/deportista.interface';
import {Entrenamiento} from '../interfaces/entrenamiento.interface';
import {Rutina} from '../interfaces/rutina.interface';
import {Dieta} from '../interfaces/dieta.interface';


import {DeportistaService} from '../services/deportista.service';
import {EntrenamientoService} from '../services/entrenamiento.service';
import {RutinaService} from '../services/rutina.service';
import {DietaService} from '../services/dieta.service';


import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fullScreen:boolean = false;
  public isLogged:boolean = false;

  deportistas:Deportista[] =[];
  ejercicios:Entrenamiento[] =[];
  rutinas:Rutina[] =[];
  recetas:Dieta[] =[];

  totalDeportistas:String='';
  totalEjercicios:String='';
  totalRutinas:String='';
  totalRecetas:String='';

  totalPersonasActivas:any=0;
  totalPersonasInactivas:any=0;

  constructor(private router: Router,
              private _authService:AuthService, 
              private _afsAuth:AngularFireAuth,
              private _deportistaService:DeportistaService,
              private _ejercicioService:EntrenamientoService,
              private _rutinaService:RutinaService,
              private _recetaService:DietaService) { 

    this.consultarTotalDeportistas();
    this.consultarTotalEjercicios();
    this.consultarTotalRecetas();
    this.consultarTotalRutinas();
  }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {

    this.getCurrentUser();

  }



  
  getCurrentUser(){
     
    this._authService.isAuth().subscribe(auth =>{
      if(auth){
        console.log("user logged");
        this.isLogged = true;
      }else{
        console.log("NOT user logged");
        this.isLogged = false;
      }
    })
  }

  onLogout(){
    //localStorage.removeItem('rol');
    this._authService.logoutUser();
    this.router.navigate(['/signin'])
   
  }


  consultarTotalDeportistas(){
    this.deportistas=[];
    this._deportistaService.consultarDesportistas()
      .subscribe(
        data=>{

          
          for(let key$ in data){
	  				let deportista = data[key$];
	  				deportista['_id']=key$;
            this.deportistas.push(deportista);

            if(deportista.estado=== 'Activo'){
              this.totalPersonasActivas=this.totalPersonasActivas+1;
            }else{
              this.totalPersonasInactivas=this.totalPersonasInactivas+1;
            }
            
          }
          console.log(this.deportistas.length)

          this.totalDeportistas = (this.deportistas.length)+'';
        
     
                 
        },
        error=>{
          console.log(error);
        }

      );

  }


  consultarTotalEjercicios(){
    this.ejercicios=[];
    this._ejercicioService.consultarEntrenamientos()
      .subscribe(
        data=>{

          
          for(let key$ in data){
	  				let ejercicio = data[key$];
	  				ejercicio['_id']=key$;
	  				this.ejercicios.push(ejercicio);
          }
          console.log(this.ejercicios.length)

          this.totalEjercicios = (this.ejercicios.length)+'';
        
     
                 
        },
        error=>{
          console.log(error);
        }

      );

  }

  consultarTotalRutinas(){
    this.rutinas=[];
    this._rutinaService.consultarRutinas()
      .subscribe(
        data=>{

          
          for(let key$ in data){
	  				let rutina = data[key$];
	  				rutina['_id']=key$;
	  				this.rutinas.push(rutina);
          }
          console.log(this.rutinas.length)

          this.totalRutinas = (this.rutinas.length)+'';
        
     
                 
        },
        error=>{
          console.log(error);
        }

      );

  }

  consultarTotalRecetas(){
    this.rutinas=[];
    this._recetaService.consultarDietas()
      .subscribe(
        data=>{

          
          for(let key$ in data){
	  				let receta = data[key$];
	  				receta['_id']=key$;
	  				this.recetas.push(receta);
          }
          console.log(this.recetas.length)

          this.totalRecetas = (this.recetas.length)+'';
        
     
                 
        },
        error=>{
          console.log(error);
        }

      );

  }

}
