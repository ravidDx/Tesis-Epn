import { Component, OnInit } from '@angular/core';
/*INTERFACES */
import {Service} from '../../interfaces/service.interface';
/*sERVICIOS */
import {OnepageService} from '../../services/onepage.service';
import {ToasterService} from '../../services/toaster.service';
import {FormControl} from '@angular/forms';


declare var  $: any;



@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  newObject:boolean = true;
  btnDisabled:boolean = false;
  
  idService:any;

  serviciosIcon: any[] = [
    {
      name: 'face',
    },
    {
      name: 'favorite',
    },
    {
      name: 'directions_run',
    },
    {
      name: 'fitness_center', 
    },
    {
      name: 'directions_bike',
    },
    {
      name: 'assignment_ind',
    },
    {
      name: 'assignment',
    },
    {
      name: 'accessibility',
    },
    {
      name: 'spa',
    },
    {
      name: 'grade',
    },
    {
      name: 'emoji_events', 
    },
    {
      name: 'emoji_emotions', 
    },
    {
      name: 'loyalty',
    },
    {
      name: 'thumb_up',
    },
    {
      name: 'brightness_high',
    },
    {
      name: 'storage',
    },
    {
      name: 'headset',
    },
    {
      name: 'toys',
    },
    {
      name: 'watch',
    }
  ]

  servicesList: Service[]=[];

  service:Service={
    titulo:"",
    detalle:"",
    icono:""
  }

  serviceNew:Service={
    titulo:"",
    detalle:"",
    icono:""
  }

  constructor(private _onepageService:OnepageService,
              private toasterService:ToasterService) { 

                this.getServices();

              }

  ngOnInit() {
  }

  /*Obtener data de services*/
  getServices(){
    this._onepageService.getServices()
    .subscribe(
      data=>{
  
        for(let key$ in data){
          let serviceNew = data[key$];
          serviceNew['id']=key$;
          this.servicesList.push(serviceNew);            
        }
        
      },
      error=>{
        console.log(error);
      }

    );
      
  }


  editModal(service:Service){
    this.newObject=true;
    this.service=service; 
  }

  newModal(){
   // this.clearForm(); 
   this.newObject=false;
  }

  guardar(){
    
    if(this.newObject == true){
      this.btnDisabled=true;
      this.updateService();
    }else{

      this.btnDisabled=true;
      this.saveService();
    }
  }

  updateService(){
    
    var idService = this.service['id'];
    //delete this.service['id'];
    //console.log(this.service); 
    this._onepageService.updateService(this.service,idService)
        .subscribe(
          data=>{
            this.closeModal();
            this.toasterService.Success("Rutina editado OK !!");
            this.btnDisabled=false;
          },
          error=>{
            console.log(error);
            this.toasterService.Error("Error al actualizar !!");
            this.btnDisabled=false;
          }

        );

  }

  saveService(){

    this._onepageService.nuevaService(this.serviceNew)
        .subscribe(
          data=>{
            console.log(data);
            this.closeModal();
            this.toasterService.Success("Rutina guardado OK !!");
            this.btnDisabled=false;
          },
          error=>{
            console.log(error);
            this.toasterService.Error("Error al guardar !!");
            this.btnDisabled=false;
          }

        );

  }

  deletedId(servicio:any){
    console.log(servicio)
    this.idService = servicio.id;

  }

  eliminar(){
    this._onepageService.deletedService(this.idService)
        .subscribe(
          data=>{
            console.log(data);
            this.closeModal();
            this.toasterService.Success("Rutina dada de baja OK !!");
            
          },
          error=>{
            console.log(error);
            this.toasterService.Error("Error al eliminar !!");
          }

        );  
  }

  select(event:any){
    this.service.icono=event;
    console.log(event);
  }

  closeModal(){
    $('#dataModal').modal('hide');
  }

  clearForm(){
    this.service.detalle="";
    this.service.titulo="";
    this.service.icono="";
  }





}
