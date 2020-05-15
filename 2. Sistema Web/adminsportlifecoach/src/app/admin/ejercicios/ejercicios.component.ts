
import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';

/*Interfaces */
import {Entrenamiento} from '../../interfaces/entrenamiento.interface';

/*sERVICIOS */
import {CategoriaService} from '../../services/categoria.service';
import {EntrenamientoService} from '../../services/entrenamiento.service';
import {ToasterService} from '../../services/toaster.service';

/*Mata table -------------------------------------------------------*/
import {MatPaginator, MatTableDataSource, MatTable} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


/*SERVICIOS FILE UPLOAD -------------------------------------------------------*/
import {Input, Output, EventEmitter} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {HttpClient,HttpRequest, HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, last, map, tap} from 'rxjs/operators';
import {FileUploadModel} from '../../class/fileuploadmodel'
import { Ejercicio } from 'app/interfaces/ejercicio.interface';
/*----------------------------------------------------------------------- */

declare var  $: any;

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class EjerciciosComponent implements OnInit {

  //Datatable
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('myTable') myTable: MatTable<any>;
  titleConfirm='';

  displayedColumns: string[] = ['position','imagen','titulo','tipo','dificultad','estado', 'acciones'];
  dataSource = new MatTableDataSource<Entrenamiento>();
  selection = new SelectionModel<Entrenamiento>(true, []);

  indiceData:any='';


 
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  /* ...................... VARIABLES FILE UPLOAD ........................*/
  /** Link text */
  @Input() text = 'Cargar ejercicio';
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

  btnSave:boolean = false;
  

  tiposEntrenamiento:any= [];

  lisImg:any= [];
  
  //duracionList=['10 min','20 min','30 min','40 min','50 min','1 hora','1 h 15 min','1 h 30 min' ,'1 h 45 min']
  dificultadList:any=['Principiante','Medio','Avanzado'];

  entrenamiento:Entrenamiento = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagen:"assets/images/foto.png",
    dificultad:'',
    fechaCreacion:{},
    estado:"",
    instruccion:[],
  }

  entrenamientoEdit:Entrenamiento = {
    tipo:"",
    titulo:"",
    objetivo:"",
    imagen:"",
    dificultad:'',
    fechaCreacion:{},
    estado:"",
    instruccion:[],
  }

  entrenamientos:Entrenamiento[]=[];
  entrenamientosTodo:Entrenamiento[]=[];

  itemsInstrucciones:any[]=[];

  url:any;
  urlImg:any='https://cdn2.iconfinder.com/data/icons/commercial-center-1/32/13-512.png';

  indiceDelete:any;
  load=false;
  eventData:any;
  loadTrash:any;
  trash:any;
  msgAlert:string;

  posicion:any;

  new:boolean = true;

  habilitar:boolean=true;
  
  cargar:boolean=false;
  
  btnDisabled = false;
  



  constructor(private _http: HttpClient,
              private _entrenamientoService:EntrenamientoService,
              private _categoriaService:CategoriaService,
              private _toasterService:ToasterService,
              private _router:Router) 
  { 
    this.listar();
    
  }

  ngOnInit() {
  }


  getFechaActual(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();
    
    dd=this.addZero(dd);
    mm=this.addZero(mm);

    let fecha = {
      dd:dd,
      mm:mm,
      yyyy:yyyy
    }

    return fecha;
  }

  addZero(i:any){
    if (i < 10) {
       i = '0' + i;
   }
   return i;
   
 }


  //Metodo para guardar y editar  datos
  guardar(){

    if(this.new==true){

      this.disabledButton(true);

    

      this.entrenamiento.estado = 'Activo';
      this.entrenamiento.instruccion=this.itemsInstrucciones;
      
      const id = Math.random().toString(36).substring(2);

      let data = this.files[0].data;
      
      this._entrenamientoService.onUpload(data, id)      
      .subscribe(
        data=>{

          if(data.bytesTransferred === data.totalBytes){
            this.nuevoEntrenamiento(id);
          }
          this.closeModal();
          
        },
        error=>{
          console.log(error);
          this.disabledBtn(false);
          this.loading(false);
       
        }

      );
  

    }else{
      this.disabledButton(true);
      if(this.files.length ==0){
        this.entrenamientoEdit.imagen = this.entrenamientoEdit['idImg'];
        delete this.entrenamientoEdit['idImg'];

        this.editarEntrenamiento();
        
      }else{

            var _this = this;
            //this.entrenamientoEdit.imagen = "";
          //cargar y guardar imagenes en firebase
          this.files.forEach( function(item, indice, array) {
            const id = Math.random().toString(36).substring(2);
            _this.entrenamientoEdit.imagen = id;
            _this._entrenamientoService.onUpload(item.data,id);      
      
          });
          delete this.entrenamientoEdit['idImg'];
          this.editarEntrenamiento();

        
      }


    }

  }


  //Metodo guardar entrenamiento
  nuevoEntrenamiento(idImg:any){
    this.entrenamiento.imagen= idImg;
    this._entrenamientoService.nuevoEntrenamiento(this.entrenamiento).subscribe(
      data=>{
        
        this._toasterService.Success('Ejercicios guardado OK !!');
        this.files = [];
        this.btnSave=false;
        this.clearForm();
        this.closeModal();
        this.listar();
        this.disabledButton(false);

        

      },
      error=>{
        console.log('ERROR');
        this._toasterService.Error(' Error al guardar !!');
        console.log(error);
        this.disabledBtn(false);
          this.loading(false);
      
      }

    );
  }
  


  //Metodo listar entrenamientos
  listar(){

    this._entrenamientoService.consultarEntrenamientos()
      .subscribe(
        data=>{
          this.entrenamientos=[];
          for(let key$ in data){
	  				let entrenamiento = data[key$];
	  				entrenamiento['_id']=key$;
            this.entrenamientos.push(entrenamiento);
            this.getUrlsImg(entrenamiento);
          }
          //Para el data table
          this.dataSource.data = this.entrenamientos;
          this.dataSource.paginator = this.paginator;

          this.entrenamientosTodo = this.entrenamientos;

          this.getCategoriasEntrenamiento();
          
        },
        error=>{
          console.log(error);
        }

      );

  }

  listar_por_tipo(tipo:any){
    
    if(tipo == 'todos'){
      this.entrenamientosTodo=this.entrenamientos;
      
    }else{

        var _this = this;
        this.entrenamientosTodo=[];
        this.entrenamientos.forEach( function(item, indice, array) {
          if(tipo == item.tipo){
            item['posicion']=indice;
          _this.entrenamientosTodo.push(item);
          
          }
    
        });

    }

   
  }

  //Devuelve la url de la imagen
  getUrlsImg(deportista:any){
      deportista['idImg']=deportista['imagen'];
      this._entrenamientoService.downloadUrl(deportista['imagen']).subscribe(
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


  getCategoriasEntrenamiento(){
    this.tiposEntrenamiento=[];
    this._categoriaService.getCategoriasEntrenamiento()
    .subscribe(
      data=>{
        for(let key$ in data){
          let catgNew = data[key$];
          catgNew['id']=key$;
          catgNew['longitud']=0;
          
          for(let pos in this.entrenamientosTodo){
            let obj = this.entrenamientosTodo[pos];
            if(obj['tipo'] == catgNew['nombre']  ){
              catgNew['longitud'] = catgNew['longitud'] + 1;
            }      
          }

        this.tiposEntrenamiento.push(catgNew); }
        
      },
      error=>{
        console.log(error);
      }

    );

  }


  selectTipo(tipo:any){
    this.listar_por_tipo(tipo);
  }

  cargarId(item:any, event:any, posicion:any){
    this.indiceDelete = item
    this.eventData = event;
    this.posicion = posicion;
  }

  eliminar(){
    this.loadingTrash();
    this._entrenamientoService.eliminarEntrenamiento(this.indiceDelete).subscribe(
      data=>{
       
        this._toasterService.Success("Ejercicio eliminado OK !!"); 
        this.loadTrash.hide();
        this.trash.show(); 
        this.listar();
      },
      error=>{
        console.log('ERROR');
        this._toasterService.Error("No se pudo eliminar correctamente !!");
        console.log(error);
        this.loadTrash.hide();
        this.trash.show();
      }
    );

   
  }


 

  editModal(entrenamiento:Entrenamiento){
    this.new=false;
    this.files=[];
    this.entrenamientoEdit=entrenamiento;
    this.itemsInstrucciones=entrenamiento.instruccion;
    
  }


  editarEntrenamiento(){

    var id:any= this.entrenamientoEdit["_id"];
    delete this.entrenamientoEdit["_id"];
    
    this._entrenamientoService.editarEntrenamiento(this.entrenamientoEdit,id).subscribe(
      data=>{
      
        this.closeModal();
        this._toasterService.Success("Ejercicio editado OK !!");
        this.listar();
    
       this.disabledButton(false);
      },
      error=>{
        console.log(error);
        this._toasterService.Error("No se pudo editar correctamente!!");
        this.disabledButton(false);
      }
      
    );


  }

  darBaja(){
    
    this.loadingTrash();
    let title="";
    var id:any= this.entrenamientoEdit["_id"];
    delete this.entrenamientoEdit["_id"];
   
    this.entrenamientoEdit.imagen = this.entrenamientoEdit['idImg'];
    delete this.entrenamientoEdit["idImg"];
  

    if(this.entrenamientoEdit.estado == 'Activo'){
      this.entrenamientoEdit.estado = 'Inactivo';
      title = 'Ejercicio dado de baja OK !!';
    }else{
      this.entrenamientoEdit.estado = 'Activo';
      title = 'Ejercicio dado de alta OK !!';
    }

    console.log(this.entrenamientoEdit)

    
    this._entrenamientoService.darBajaEntrenamiento(this.entrenamientoEdit,id).subscribe(
      data=>{
        //this.refresh(this.deportistaEdit);
        this.listar();
        this._toasterService.Success(title);
        this.loadTrash.hide();
        this.trash.show(); 
      },
      error=>{
        console.log(error);
        this.loadTrash.hide();
        this.trash.show(); 
      }
      
    );
    
  }

  newModal(){
    this.new = true;
    this.files=[];
    this.itemsInstrucciones=[];
    this.addInstruccion();
  }
  

  calcularLongitud(){
    this.entrenamientos.forEach( function(item, indice, array) {
      
      this.tiposEntrenamiento.forEach( function(item2, indice, array) {
        if(item2.nombre == item.tipo){
          item2.longitud = item2.longitud + 1;
          return 0;
        }
      });


    });
  }


  loadingTrash(){
    this.trash = $(this.eventData.target).parent().find(`#${this.indiceData}`).hide();
    this.loadTrash = $(this.eventData.target).parent().find('img').show();
    
    this.trash.hide();
    this.loadTrash.show();
  }


  clearForm(){
    this.entrenamiento.tipo="";
    this.entrenamiento.titulo="";
    this.entrenamiento.objetivo="";
    this.entrenamiento.imagen="assets/images/foto.png";
    this.entrenamiento.dificultad='';
    this.entrenamiento.estado='';
    this.entrenamiento.instruccion=[];
    this.entrenamiento.fechaCreacion=this.getFechaActual();
    this.files=[];
    this.itemsInstrucciones=[];
    
  }

  
  closeModal(){
    $('#dataModal').modal('hide');
  }

  disabledButton(valor:boolean){
    this.disabledBtn(valor);
    this.loading(valor);
  }

  disabledBtn(access:boolean){
    this.btnDisabled = access;
  }

  loading(load:boolean){
    this.load = load;
  }


  
  addInstruccion(){
    
    let key = (this.itemsInstrucciones.length)+1;
    if(key<=4){
      this.itemsInstrucciones.push({id:key, value:''});
    }
    
  }
  

  deletedInstruccion(){
    let key = this.itemsInstrucciones.length;
    console.log(key>=1)
    if(key>=2){
      this.itemsInstrucciones.pop();
    }
  }


  cargarObjectBaja(entrenamiento:Entrenamiento, event:any){
    this.indiceData=entrenamiento["_id"];
    this.entrenamientoEdit = Object.assign({},entrenamiento);
    this.eventData = event;

    if(entrenamiento['estado'] == 'Activo' ){
      this.titleConfirm='Esta seguro de dar de baja a este ejercicio?';
  
    }else{
      this.titleConfirm='Esta seguro de dar de alta a este ejercicio?';
  
    }
    
  }




  select(event:any){
    this.entrenamiento.tipo=event;
    console.log(event);
  }

  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    //console.log(fileUpload)
    fileUpload.onchange = () => {
      let typeFile = fileUpload.files[0].type; 
      let sizeFile = fileUpload.files[0].size;
    
      if(typeFile === 'image/gif' || typeFile === 'image/jpeg' || typeFile === 'image/png'  ){
        
        if(sizeFile <= 5242880){
      
          for (let index = 0; index < fileUpload.files.length; index++) {
            const file = fileUpload.files[index];
        
            
            this.files[0]={ data: file, state: 'in', inProgress: false, progress: 0, canRetry: false, canCancel: true };
          }
          this.uploadFiles();
        }

      }else{
        this._toasterService.Error('Tipo de archivo no valido!!');
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
      this.entrenamientoEdit.imagen="assets/images/foto.png";
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
          //console.log(this.files)
          
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
        console.log(file.data.type)
        this.uploadFile(file);
      }
    });
  }

  private removeFileFromArray(file: FileUploadModel) {
    
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
    //console.log(this.files);
  }

  private uploadFiletoArray(){
      
    //this._entrenamientoService.onUpload(file.data);
  }

  getDownload(url:any, indice:any){

    let res;
  
    this._entrenamientoService.downloadUrl(url).subscribe(
      data=>{
        this.entrenamientos
        res= data;
        //console.log('-----------------------------');
       // console.log(res);

       
        //return res;
      },
      error=>{
        console.log('ERROR');
        console.log(error);
        res= 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';
        //return res;
      }
  
    );

    return 'asd ';
  
   
  }


  

      public imagePath:any;
      
      onSelectFile(event:any,val:any) { // called each time file input changes
        
        let typeFile = event.target.files[0].type;
        let sizeFile = event.target.files[0].size;

 

        if(typeFile === 'image/gif' || typeFile === 'image/jpeg' || typeFile === 'image/png'  ){
        
          if(sizeFile <= 5242880){
      
            if (event.target.files && event.target.files[0]) {
              var reader = new FileReader();
              this.imagePath = event.target.files;
              reader.readAsDataURL(event.target.files[0]); // read file as data url
              reader.onload = (event) => { // called once readAsDataURL is completed
                if(val==0){
                  this.entrenamiento.imagen = reader.result; //add source to image
                }else{
                  this.entrenamientoEdit.imagen = reader.result; //add source to image
                }
                
              }
            }

          }else{
            this._toasterService.Error('La imagen sobrepasa el tamaño maximo !!');
          }



        }
   
      }

      selectedFile = null;

      cancelFileImg(val:any){

        this.files=[];
        if(val == 0){
          this.entrenamiento.imagen="assets/images/foto.png";  
        }else{
          this.entrenamientoEdit.imagen="assets/images/foto.png";
        }
        
      }


      /*DATA TABLE --------------------------------------------------*/

      applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }

          /** Whether the number of selected elements matches the total number of rows. */
      isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
      }

      /** Selects all rows if they are not all selected; otherwise clear selection. */
      masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
      }

      /** The label for the checkbox on the passed row */
      checkboxLabel(row?: Entrenamiento): string {
        if (!row) {
          return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${1}`;
      }

    



  

}







