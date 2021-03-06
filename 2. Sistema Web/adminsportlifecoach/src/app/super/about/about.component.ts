import { Component, OnInit } from '@angular/core';
/*INTERFACES */
import {About} from '../../interfaces/about.interface';
/*sERVICIOS */
import {OnepageService} from '../../services/onepage.service';
import {ToasterService} from '../../services/toaster.service';

/*SERVICIOS FILE UPLOAD -------------------------------------------------------*/
import {Input, Output, EventEmitter} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {HttpClient,HttpRequest, HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, last, map, tap} from 'rxjs/operators';
import {FileUploadModel} from '../../class/fileuploadmodel'
/*----------------------------------------------------------------------- */

declare var  $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class AboutComponent implements OnInit {

  /* ...................... VARIABLES FILE UPLOAD ........................*/
  /** Link text */
  @Input() text = 'Actualizar imagen';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = 'https://file.io';
  /** File extension that accepted, same as 'accept' of <input type="file" />. By the default, it's set to 'image/*'. */
  @Input() accept = 'image/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<string>();

  files: Array<FileUploadModel> = [];

  /*................................................................*/

  btnUpdate:boolean = false;

  aboutList: About[]=[];

  about:About={
    titulo:"",
    nombre:"",
    experiencia:"",
    servicios:"",
	  imagen:"",
  }

  constructor(private _onepageService:OnepageService, 
              private _http: HttpClient,
              private toasterService:ToasterService) {
    this.getAbouts();
   }

  ngOnInit() {
  }

  
  /*Obtener data de about*/
  getAbouts(){
    this._onepageService.getAbouts()
    .subscribe(
      data=>{
        for(let key$ in data){
          let aboutNew = data[key$];
          this.about = aboutNew;       
          aboutNew['id']=key$;
          this.aboutList.push(aboutNew); 
        }
        
      },
      error=>{
        console.log(error);
      }

    );
      
  }


/*Actualizar data de about*/
  updateAbout(){
    var idAbout = this.about['id'];
    //delete this.about['id'];
    this.btnUpdate=true;
    
    if(this.files.length!=0){

      const idImg = Math.random().toString(36).substring(2);
        this._onepageService.onUploadAbout(this.files[0].data,idImg)      
        .subscribe(
          data=>{
            if(data.metadata!=null){
              this._onepageService.downloadAboutUrl(idImg).subscribe(
                data=>{
                   this.about.imagen=data;
                   this._onepageService.updateAbout(this.about,idAbout)
                   .subscribe(
                     data=>{
                       this.closeModal();
                       this.clearForm();
                       this.toasterService.Success("Acerca de mí editado OK !!");
                       this.btnUpdate=false;
                     },
                     error=>{
                       console.log(error);
                       this.toasterService.Error("Error al actualizar !!");
                       this.btnUpdate=false;
                     }
           
                   );
                       
                },
                error=>{
                  console.log(error);
                  this.toasterService.Error("Error al actualizar !!");
                  this.btnUpdate=false;
                }
              );
            
            }
            
          },
          error=>{
            console.log(error);
            this.toasterService.Error("Error al actualizar !!");
            this.btnUpdate=false;
          }

        );

     
    }else{
      this._onepageService.updateAbout(this.about,idAbout)
        .subscribe(
          data=>{
            this.closeModal();
            this.toasterService.Success("Acerca de mí editado OK !!");
            this.btnUpdate=false;
          },
          error=>{
            console.log(error);
            this.toasterService.Error("Error al actualizar !!");
            this.btnUpdate=false;
          }

        );
    }
  }


  closeModal(){
    $('#dataModal').modal('hide');
  }

  clearForm(){
    this.files = [];
  }




  /* ----------------- METODOS UPLOAD -------------------*/
  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    //console.log(fileUpload)
    fileUpload.onchange = () => {
      let typeFile = fileUpload.files[0].type; 
      let sizeFile = fileUpload.files[0].size;
    
      if(typeFile === 'image/jpeg' || typeFile === 'image/png'  ){
        
        if(sizeFile <= 5242880){
      
          for (let index = 0; index < fileUpload.files.length; index++) {
            const file = fileUpload.files[index];
        
            
            this.files[0]={ data: file, state: 'in', inProgress: false, progress: 0, canRetry: false, canCancel: true };
          }
          this.uploadFiles();
        }

      }else{
        this.toasterService.Error('Tipo de archivo no valido!!');
      }
      
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
        console.log("map");
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
        
        console.log(event);
        if (typeof (event) === 'object') {
          console.log(this.files)
          
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

  public imagePath:any;

  onSelectFile(event:any) { // called each time file input changes
    
    let typeFile = event.target.files[0].type;
    let sizeFile = event.target.files[0].size;



    if(typeFile === 'image/jpeg' || typeFile === 'image/png'  ){
      console.log('img')
      if(sizeFile <= 1048576){
  
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          this.imagePath = event.target.files;
          reader.readAsDataURL(event.target.files[0]); // read file as data url
          reader.onload = (event) => { // called once readAsDataURL is completed
      
              this.about.imagen  = (reader.result)+''; //add source to image
          }
        }

      }else{

        this.toasterService.Error('La imagen sobrepasa el tamaño maximo !!');
      }



    }

  }



}
