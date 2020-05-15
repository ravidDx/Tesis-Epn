import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Interfas
import {PlanEntrenamiento} from '../../interfaces/planEntrenamiento.interface';
//Services
import {EntrenamientosService} from '../../servicios/entrenamientos.service';

//modal
import { ModalController } from '@ionic/angular';
import {ModalPage} from '../modal/modal.page';

@Component({
  selector: 'app-entrenamientos',
  templateUrl: './entrenamientos.page.html',
  styleUrls: ['./entrenamientos.page.scss'],
})
export class EntrenamientosPage implements OnInit {


  slideOpts = {
    initialSlide: 0,
    
  };

  


  email:string = '';

  planEntrenamiento:PlanEntrenamiento = {
    deportista:{},
    rutinas:[],
    duracion:"",
    fechaCreacion:{},
    estado:'',
    progreso:'',
  }

 numeroTotalFinalizado=0;


  planEntrenamientos:PlanEntrenamiento[]=[];


  planEntrenamientoRamificado:any[]=[];

      // para el botón 
      color="danger";
      text="Sin Terminar";
      btn:boolean=false;


  constructor(private _planEntrenamientoService:EntrenamientosService,private _router:Router, public modalController: ModalController) {
    this.email = localStorage.getItem('email');

    this.listar();
   }


   async modal() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  }

  ngOnInit() {
  }


  
  editarProgreso(item:any){


    let diaRutina=item;
    let numDiasEntrenamiento = this.planEntrenamiento['numDiasEntrenamiento'];
    let progresoPorDia = this.planEntrenamiento['progresoPorDia'];
    let progreso = parseInt(this.planEntrenamiento['progreso']) + progresoPorDia;
    this.planEntrenamiento['progreso'] = progreso;

    this.btn=true;
    console.log(this.btn,'listo');
    if(this.btn){
      this.color="success";
      this.text="Finalizado"
    }

    this.modal();
    diaRutina['terminado']=true

    console.log(diaRutina);
    console.log(this.planEntrenamiento)


    /*
    console.log('editar progreso');
    let rutinas  = this.planEntrenamiento.rutinas;
    let numRutinas = 0;
    let progreso =0;
    for(let key$ in rutinas ){
      numRutinas=numRutinas+1;
    }
    console.log(numRutinas);

    let catidad = parseInt(localStorage.getItem('totalFinalizado'));

    
    
   progreso = (100*this.numeroTotalFinalizado) /numRutinas;
*/
   //this.planEntrenamiento.progreso = 50+'';

   let indice = this.planEntrenamiento['_id']

   this._planEntrenamientoService.editarPlanEntrenamiento(this.planEntrenamiento, indice).subscribe(
    data => {
      console.log('guardado con exito');

      
 

    },
    error => {
  
    }

  );
  

  }


  
  viewItem(item:any){
    //console.log(item)
    var id =  item['rutina']['_id'];
    console.log(id);
    this._router.navigate(['/rutina', id ]);
  }

  viewEjercicio(item:any){

    let id = item['ejercicio']['_id'];
    this._router.navigate(['/ejercicio-personal', id ])
  }


    listar(){
    
    
      this._planEntrenamientoService.consultarPlanEntrenamientos()
        .subscribe(
          data=>{

          
            for(let key$ in data){
              let planEntrenamiento = data[key$];
              
              if(planEntrenamiento['deportista']['email'] == this.email){
                //console.log('entro 1 vez');
                planEntrenamiento['_id']=key$;
                this.planEntrenamiento = planEntrenamiento;
                //this.planEntrenamientoRamificado = this.planEntrenamiento['planEntren'];
                //this.getArrayPlanEntrenamiento();
                break; //romper ciclo for
              }

              
            }


          
          
            console.log(this.planEntrenamiento)

                  
          },
          error=>{
            console.log(error);
          }

        );

  }


  listo(){
    this.btn=true;
    console.log(this.btn,'listo');
    if(this.btn){
      this.color="success";
      this.text="Finalizado"
    }

    

    this.numeroTotalFinalizado = parseInt(localStorage.getItem('totalFinalizado'));
    this.numeroTotalFinalizado = this.numeroTotalFinalizado + 1;

    localStorage.setItem('totalFinalizado',this.numeroTotalFinalizado+"");
    
  
    
    //this.editarProgreso();

  }

  nolisto(){
    this.btn=false;
    console.log(this.btn,'nolisto');
    if(!this.btn){
      this.color="danger";
      this.text="Sin terminar"
    }
  }

  getArrayPlanEntrenamiento(){

    let rutinas = this.planEntrenamiento.rutinas;
 

    for(let key$ in rutinas){
      let data = rutinas[key$];
      let rutina = data.rutina;
      let dias = data.dias;
      let semanas = data.semanas

      let ejercicios = rutina.ejercicios

      console.log(data);
      console.log(rutina.titulo)
      console.log(ejercicios)

      for(let key1$ in semanas){
        let semana = semanas[key1$];
        console.log(semana)
        for(let key2$ in dias){
          let dia = dias[key2$];
          console.log(dia);

          let obj={
            semana:semana,
            dia:dia,
            ejercicios:ejercicios,
            terminado:false

          }
          this.planEntrenamientoRamificado.push(obj);


        }//for3
      }//for2

    }//for 1


    console.log(this.planEntrenamientoRamificado);
    let numDiasEntrenamiento = this.planEntrenamientoRamificado.length;
    let progresoPorDia = (100/numDiasEntrenamiento)
    console.log(numDiasEntrenamiento);
    console.log(progresoPorDia);

  }



}
