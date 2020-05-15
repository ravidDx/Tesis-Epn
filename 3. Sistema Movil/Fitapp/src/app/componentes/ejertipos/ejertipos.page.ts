import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Interfas
import {Ejercicio} from '../../interfaces/ejercicio.interface';
//Services
import {CategoriasService} from '../../servicios/categorias.service';
import {StorageService} from '../../servicios/storage.service';
import {EjericicosService} from '../../servicios/ejericicos.service';

@Component({
  selector: 'app-ejertipos',
  templateUrl: './ejertipos.page.html',
  styleUrls: ['./ejertipos.page.scss'],
})
export class EjertiposPage implements OnInit {

  sliderConfig = {
    spaceBetween: 5,
    centeredSlide: true,
    slidesPerView: 1.6,
    pagination: {
    el: '.swiper-pagination',
    type: 'custom',
  },
  };
/*
  ejercicio:Ejercicio = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagenes:[],
    portada:'',
    series:'',
    repeticiones:'',
    duracion:''
  }
*/
  ejercicios:Ejercicio[]=[];
  ejerciciosCopy:Ejercicio[]=[];

  tiposEntrenamiento:any[] = [];

  tipo1='';

  constructor(private _ejercicioService:EjericicosService,
              private _storageService:StorageService,
              private _categoriaService:CategoriasService,
              private _router:Router) { 
    this.getEjercicios();
  }

  ngOnInit() {
  }



    //Metodo listar entrenamientos
    getEjercicios(){
      console.log('get Ejercicios')
      var _this = this;
      this._ejercicioService.consultarEjercicios()
        .subscribe(
          data=>{
            data["entrenamientos"].forEach( function(item, indice, array) {
              _this._storageService.downloadUrl(item.portada).subscribe(
                data=>{
                  item.portada=data;  
                  
                },
                error=>{
                  console.log('ERROR');
                  
                }
                
              );

              item.portada = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';

              
            });

          //this.ejercicios = data["entrenamientos"];
          this.ejerciciosCopy = data["entrenamientos"];

          this.getCategoriasEntrenamiento();
          
          //console.log(this.ejercicios,'ejericios');
          },
          error=>{
            console.log(error);
          }
  
        );
  
    }



    getCategoriasEntrenamiento(){
      this.tiposEntrenamiento=[];
      this._categoriaService.getCategoriasEntrenamiento()
      .subscribe(
        data=>{
          for(let key$ in data){
            let catgNew = data[key$];
            catgNew['id']=key$;
            catgNew['longitud']=0;
            
            for(let pos in this.ejerciciosCopy){
              let obj = this.ejerciciosCopy[pos];
              if(obj['tipo'] == catgNew['nombre']  ){
                catgNew['longitud'] = catgNew['longitud'] + 1;
              }      
            }
  
          this.tiposEntrenamiento.push(catgNew); 
        }
        this.getEjercicios_x_tipo(this.tiposEntrenamiento['0']['nombre']);
        this.tipo1 = this.tiposEntrenamiento['0']['nombre'];
        //console.log(this.tiposEntrenamiento)
          
        },
        error=>{
          console.log(error);
        }
  
      );
  
    }



    getEjercicios_x_tipo(tipo:any){
        this.ejercicios = [];
  
          var _this = this;
         console.log(tipo);
          this.ejerciciosCopy.forEach( function(item, indice, array) {
            if(tipo == item.tipo){
              item['posicion']=indice;
              // console.log(item,'item');
            _this.ejercicios.push(item);
           
            
            }
      
          });
  
    
    }

    selectTipo(tipo:any){
      //console.log(tipo)
    }


    viewItem(item:any){
      var id =  item['_id'];
      //console.log(id);
      this._router.navigate(['/ejercicio', id ])
    }
  


}
