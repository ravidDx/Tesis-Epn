import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subscription ,  of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';


import {Promocion} from '../../interfaces/promocion.interface';
import {PromocionService} from '../../services/promocion.service';
import {ToasterService} from '../../services/toaster.service';


declare var  $: any;

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PromocionesComponent implements OnInit {

  /** Link text */
  @Input() text = 'Cargar imagen';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = 'https://file.io';
  /** File extension that accepted, same as 'accept' of <input type="file" />. By the default, it's set to 'image/*'. */
  @Input() accept = 'image/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<string>();

  files: Array<FileUploadModel> = [];

  tiposPromocion= [
    {id:1, name:'promocion de precio'},
    {id:2, name:'promocion de regalos'}
  ]

  promocion:any = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagen:""
  }

  promocionEdit:any = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagen:""
  }

  promociones:any[]=[];
  promocionesCopy: any[] = [];

  url:any;

  btnSave:boolean = false;

  indiceDelete:any;
  load=false;
  eventData:any;
  loadTrash:any;
  trash:any;


  new:boolean = true;

  constructor(private _http: HttpClient,
              private _promocionService:PromocionService,
              private _toasterService:ToasterService) { 

      this.listar();
  }

  ngOnInit() {
  }


  guardar(){

    this.btnSave=true;
    if(this.new==true ){
      this.nuevaPromocion();

    }else{
      this.promocionEdit.imagen = this.promocionEdit['imagenId']

      if(this.files.length ==0){
    
        this.editarPromocion();
        
      }else{

        var _this = this;
        const id = Math.random().toString(36).substring(2);
       
        _this._promocionService.onUpload(this.files[0].data,id);
       _this.promocionEdit.imagen = id;
     
     
          this.editarPromocion();

      }

    }

    
    
   

  }


  nuevaPromocion(){
    var _this = this;
    const id = Math.random().toString(36).substring(2);
     // this.promocion.estado = 'Activo';

    _this._promocionService.onUpload(this.files[0].data,id);
    _this.promocion.imagen = id;
    console.log(this.promocion);

    this._promocionService.nuevaPromocion(this.promocion).subscribe(
      data=>{
        this._toasterService.Success("Promocion guardado OK !!");
        this.btnSave=false;
      
        this.clearForm();
        this.closeModal();
        this.listar();
      },
      error=>{
        this.btnSave=false;
        console.log('ERROR');
        console.log(error);
        this._toasterService.Error('Error al guardar el dato !!');
      
      }

    );

  }


  editarPromocion(){
    delete this.promocionEdit['imagenId'];
    this._promocionService.editarPromocion(this.promocionEdit,this.promocionEdit["_id"]).subscribe(
      data=>{
        this.btnSave=false;
        this._toasterService.Success("Promocion editado OK !!");
        this.closeModal();
        this.clearForm();
        this.listar();

      },
      error=>{
        this.btnSave=false;
        console.log(error);
        this._toasterService.Error('Error al actualizar el dato !!');
      }
      
    );

  }

    
  listar(){
    console.log('listar');
    let _this = this;
    this._promocionService.consultarPromociones()
      .subscribe(
        data=>{
          let notificaciones=[];
          for(let key$ in data){
	  				let notificacion = data[key$];
	  				notificacion['_id']=key$;
            notificaciones.push(notificacion);
            this.getUrlsImg(notificacion);
          }

          this.promocionesCopy = Object.assign({},notificaciones);
          console.log(this.promocionesCopy)

          

        },
        error=>{
          console.log(error);
        }

      );
    }

//Devuelve la url de la imagen
  getUrlsImg(promocion:any){
    promocion['idImg']=promocion['imagen'];
    this._promocionService.downloadUrl(promocion['imagen']).subscribe(
      data=>{
        promocion['imagen']=data;   
          
      },
      error=>{
        console.log('ERROR');
        console.log(error);
        
      }
    );

    promocion['imagen'] = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';


}


selectTipo(tipo: any) {
    this.listar_por_tipo(tipo);
}


listar_por_tipo(tipo: any) {

    console.log(tipo)

    if (tipo == 'todos') {
      
      this.promociones = this.promocionesCopy;

    } else {

      
      this.promociones = [];

      for (let key$ in this.promocionesCopy) {
        let promocion =  this.promocionesCopy[key$];
        if (tipo === promocion.tipo) {
          
          this.promociones.push(promocion);

        }

      }



    }


  }

   onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, state: 'in', inProgress: false, progress: 0, canRetry: false, canCancel: true });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  cancelFile(file: FileUploadModel) {
    if (file) {
      if (file.sub) {
        file.sub.unsubscribe();
      }
      this.removeFileFromArray(file);
    }
  }

  retryFile(file: FileUploadModel) {
    this.uploadFile(file);
    file.canRetry = false;
  }

  private uploadFile(file: FileUploadModel) {

    const fd = new FormData();
    fd.append(this.param, file.data);

    const req = new HttpRequest('POST', this.target, fd, {
      reportProgress: true
    });

    file.inProgress = true;
    file.sub = this._http.request(req).pipe(
      map(event => {

        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      tap(message => { }),
      last(),
      catchError((error: HttpErrorResponse) => {

        console.log('catch error');
        file.inProgress = false;
        file.canRetry = true;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe(

      (event: any) => {


        if (typeof (event) === 'object') {


          //this.removeFileFromArray(file);
          //this.complete.emit(event.body);
        }
      }
    );
  }

  private uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      if (!file.inProgress) {
        this.uploadFile(file);
      }
    });
  }

  private removeFileFromArray(file: FileUploadModel) {

    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
    console.log(this.files);
  }

  private uploadFiletoArray() {

    //this._entrenamientoService.onUpload(file.data);
  }

   newModal() {
    this.new = true;
  }

  closeModal() {
    $('#dataModal').modal('hide');
  }

   clearForm() {
    this.promocion.tipo = "";
    this.promocion.titulo = "";
    this.promocion.objetivo = "";
    this.promocion.imagen = "";
  }
}


 export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
} 
  





