import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';

//Interfas
import {Ejercicio} from '../../interfaces/ejercicio.interface';

//servicios
import { EjericicosService } from 'src/app/servicios/ejericicos.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {


  

  ejercicios: Ejercicio[] = [];
  ejerciciosCopy: Ejercicio[] = [];
  tiposEntrenamiento: any = [];


  
  constructor(private _ejercicioService: EjericicosService, private _storageService: StorageService,
    private _categoriaService: CategoriasService,private _router: Router) 
    {
    this.listar();
  }

  ngOnInit() {
  }


  //Metodo trate toda la data de ejercicios
  listar() {
    
    this._ejercicioService.consultarEjercicios().subscribe(
      data => {
      

        let ejercicios=[];
        for(let key$ in data){
          let ejercicio = data[key$];
          ejercicio['_id']=key$;
          ejercicios.push(ejercicio);
           this.getUrlsImg(ejercicio);
        }

        this.ejerciciosCopy = Object.assign({},ejercicios);;
     
        //Metodo para listar los tipos de ejercicios
        this.listarCategoriasEnjercicio();

      


      }, error => {
        console.log('error')
        console.log(error);
      });

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


 //lista las categorias
  listarCategoriasEnjercicio() {
    this.tiposEntrenamiento = [];
    this._categoriaService.getCategoriasEntrenamiento()
      .subscribe(
        data => {
          for (let key$ in data) {
            let catgNew = data[key$];
            catgNew['id'] = key$;
            this.tiposEntrenamiento.push(catgNew);          
          }

          //Filtrar la data por el primer tipo o categoria de ejercicio
          this.getEjercicios_x_tipo(this.tiposEntrenamiento['0']['nombre']);
    

        },
        error => {
          console.log(error);
        }

      );

  }

  
getEjercicios_x_tipo(tipo: any) {
    this.ejercicios = [];

    let long = 0;
    for (let key$ in this.ejerciciosCopy) {
      let ejercicio =  this.ejerciciosCopy[key$];
      let tipos:any =  ejercicio.tipo;
      
      for (let key2$ in tipos) {
        
        if (tipo === tipos[key2$]) {
              
          long = long +1;
          this.ejercicios.push(ejercicio);
          break;

        }
      
      }
        
    }
   
    console.log('LONGITUD ' + long)


  }

  viewItem(item:any){
    var id =  item['_id'];
    //console.log(id);
    this._router.navigate(['/ejercicio', id ])
  }




}
