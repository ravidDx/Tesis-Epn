import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Interfas
import {Ejercicio} from '../../interfaces/ejercicio.interface';
//Servicios
import {EjericicosService} from '../../servicios/ejericicos.service';
import {StorageService} from '../../servicios/storage.service';


@Component({
  selector: 'app-ejercicio-personal',
  templateUrl: './ejercicio-personal.page.html',
  styleUrls: ['./ejercicio-personal.page.scss'],
})
export class EjercicioPersonalPage implements OnInit {

  ejercicio:Ejercicio = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagen:"",
    dificultad:'',
    fechaCreacion:{},
    estado:"",
    instruccion:"",
  }

  // para el botón 
  color="primary";
  text="NO LISTO";
  btn:boolean=false;



  constructor(private _activateRute:ActivatedRoute,private _ejercicioService:EjericicosService,
    private _storageService:StorageService) { }
  
  
  ngOnInit() {
    let id = this._activateRute.snapshot.paramMap.get('id');
    this.consultarEjercicio(id);
    console.log(id);
  }


  consultarEjercicio(id:any){

    this._ejercicioService.consultarEjercicio(id)
      .subscribe(
        data=>{
          console.log(data);
          let ejercicio = data
          this.ejercicio =  ejercicio;
          this.getUrlsImg(ejercicio);
          // console.log(this.ejercicio,'mi');

        },
        error=>{
          console.log(error);
        }
  
      );

  }


      //Devuelve la url de la imagen
      getUrlsImg(deportista:any){
        deportista['idImg']=deportista['imagen'];
        this._storageService.downloadUrlEjercicio(deportista['imagen']).subscribe(
          data=>{
            deportista['imagen']=data;   
              
          },
          error=>{
            console.log('ERROR');
            console.log(error);
            
          }
        );
  
        deportista['imagen'] = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';
  
    }


    listo(){
      this.btn=true;
      console.log(this.btn,'listo');
      if(this.btn){
        this.color="success";
        this.text="LISTO"
      }
    }
  
    nolisto(){
      this.btn=false;
      console.log(this.btn,'nolisto');
      if(!this.btn){
        this.color="primary";
        this.text="NO LISTO"
      }
    }
  


}
