import { Component, OnInit } from '@angular/core';
/*sERVICIOS */
import {CategoriaService} from '../../services/categoria.service';
import {ToasterService} from '../../services/toaster.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  btnDisabled:boolean=false;
  listDisabled:boolean=false;

  catgEntrenamiento:any={
    nombre:""
  }

  catgEntrenList: any[]=[];
  catgDietaList: any[]=[];
  catgLista: any[]=[];

  catgDieta:any={
    nombre:""
  }

  constructor(private _categoriaService:CategoriaService,
              private _toasterService:ToasterService) { 
    this.getCategoriasEntrenamiento();
    this.getCategoriasDieta();
  }

  ngOnInit() {
  }

  getCategoriasEntrenamiento(){
    this.catgEntrenList = [];
    this._categoriaService.getCategoriasEntrenamiento()
    .subscribe(
      data=>{
      
        for(let key$ in data){
          let catgNew = data[key$];
          catgNew['id']=key$;
          this.catgEntrenList.push(catgNew);            
        }
        console.log(this.catgEntrenList)
        
      },
      error=>{
        console.log(error);
      }

    );
  }

  getCategoriasDieta(){
    this.catgDietaList= [];
    this._categoriaService.getCategoriasDieta()
    .subscribe(
      data=>{

        for(let key$ in data){
          let catgNew = data[key$];
          catgNew['id']=key$;
          this.catgDietaList.push(catgNew);            
        }
        console.log(this.catgDietaList)
        
      },
      error=>{
        console.log(error);
      }

    );
  }

  save(){
    
    if(this.listDisabled == false){
      this.saveCategoriaEntrenamiento();
    }else{
      this.saveCategoriaDieta();
    }
  }



  saveCategoriaEntrenamiento(){

    this.btnDisabled=true;

    this._categoriaService.newCategoriaEntrenamiento(this.catgEntrenamiento)
    .subscribe(
      data=>{
        let catgNew ={
          nombre:this.catgEntrenamiento.nombre,
          id:data.name
        };
         
        this.catgEntrenList.push(catgNew)
        this.clearForm(this.catgEntrenamiento);
        this._toasterService.Success("Categoria guardado OK !!");
        this.btnDisabled=false;
      },
      error=>{
        console.log(error);
        this.btnDisabled=false;
      }

    );

  }


  saveCategoriaDieta(){

    this.btnDisabled=true;

    this._categoriaService.newCategoriaDieta(this.catgDieta)
    .subscribe(
      data=>{
        let catgNew ={
          nombre:this.catgDieta.nombre,
          id:data.name
        };
         
        this.catgDietaList.push(catgNew)
        
        this.clearForm(this.catgDieta);
        this._toasterService.Success("Categoria guardado OK !!");
        this.btnDisabled=false;
      },
      error=>{
        console.log(error);
        this.btnDisabled=false;
      }

    );

  }



  changeCatg(opc:any){
    if(opc == '1'){

      console.log('1')
      
      this.listDisabled = false;
    }else if(opc == '2') {
      console.log('2')
      this.listDisabled = true;

    }
   
  }

  deletedCatgDiet(indice:any,id:any ){
    console.log('click')
    console.log(id)
    this._categoriaService.deletedCategoriaDieta(indice)
    .subscribe(
      data=>{
        this._toasterService.Success("Categoria eliminado OK !!");
        this.catgDietaList.splice(id, 1);
      },
      error=>{
    
        //this.btnDisabled=false;
      }

    );



  }


  deletedCatgEntre(indice:any, id:any){
    console.log('click123')
    console.log(id)
    
    this._categoriaService.deletedCategoriaEntrenamiento(indice)
    .subscribe(
      data=>{
        this._toasterService.Success("Categoria eliminado OK !!");
        this.catgEntrenList.splice(id, 1);
      },
      error=>{
    
        //this.btnDisabled=false;
      }

    );
  }

  clearForm(data:any){
    data.nombre="";
  }




}
