import { Component, OnInit } from '@angular/core';
import {DietaService} from '../../services/dieta.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Dieta} from '../../interfaces/dieta.interface';


@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.scss']
})

export class DietaComponent implements OnInit {

  cargar:boolean=false;

  dieta:Dieta = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagen:"",
    tiempo:"",
    dificultad:"",
	  porciones:"",
    ingredientes:[],
    preparacion:[],
    estado:''
  }

  estado:string = '';


  constructor(private _dietaService:DietaService, private _activeRoute:ActivatedRoute) { 
    
    this._activeRoute.params.subscribe(
      params =>{
        
        this._dietaService.verDieta(params['_id']).subscribe(
          data=>{
          
            this.dieta=data;

            this.estado = this.dieta.estado;
            this.cargarUrlImagen(this.dieta.imagen);

              
            console.log(this.dieta)


            
          },
          error=>{
            console.log(error);
          }

        );
        
      });

  }

  ngOnInit() {
  }

  

  cargarUrlImagen(idImagen:any){

    //this.urlImage = "https://2.bp.blogspot.com/-zpkdHbE717M/V6zIBmEpDFI/AAAAAAAAA-0/APQQeS8fCRw3eSITJVZZ68oIeeol1TjDwCLcB/s1600/bella%2Bla%2Bpaz%2Bcopia.jpg";

    this._dietaService.downloadUrl(idImagen).subscribe(
      data=>{ 
        this.dieta.imagen = data;
        
      },
      error=>{
        console.log('ERROR');
        console.log(error);
      }
    );

    


  }

  

}
