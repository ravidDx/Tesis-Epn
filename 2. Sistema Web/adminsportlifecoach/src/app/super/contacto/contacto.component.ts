import { Component, OnInit } from '@angular/core';
/*INTERFACES */
import {Contacto} from '../../interfaces/contacto.interface';
/*sERVICIOS */
import {OnepageService} from '../../services/onepage.service';
import {ToasterService} from '../../services/toaster.service';
declare var  $: any;


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  contactoList: Contacto[]=[];

  contacto:Contacto={
    ciudad:"",
    direccion:"",
    email:"",
    telefono:"",
    facebook:"",
    instagram:"",
    twitter:"",
  }


  constructor(private _onepageService:OnepageService, 
              private toasterService:ToasterService) {
    this.getContacto();
  }

  ngOnInit() {
  }


    /*Obtener data */
    getContacto(){
      this._onepageService.getContactos()
      .subscribe(
        data=>{
          console.log(data);
          
          for(let key$ in data){
            let contactoNew = data[key$];
            this.contacto = contactoNew;       
            contactoNew['id']=key$;
            this.contactoList.push(contactoNew);
                
          }
          
        },
        error=>{
          console.log(error);
        }
  
      );
        
    }


    updateContacto(){
      var idContacto = this.contacto['id'];
      //delete this.contacto['id'];
      
      this._onepageService.updateContacto(this.contacto,idContacto)
        .subscribe(
          data=>{
            console.log(data);
            this.closeModal();
            this.toasterService.Success("Contacto editado OK !!");
          },
          error=>{
            console.log(error);
          }

        );


    }

    closeModal(){
      $('#dataModal').modal('hide');
    }
  
  


}
