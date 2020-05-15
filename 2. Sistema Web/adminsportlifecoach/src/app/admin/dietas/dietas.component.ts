import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subscription, of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';

import { Dieta } from '../../interfaces/dieta.interface';

/*sERVICIOS */
import { CategoriaService } from '../../services/categoria.service';
import { DietaService } from '../../services/dieta.service';
import { ToasterService } from '../../services/toaster.service';

declare var $: any;


@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html',
  styleUrls: ['./dietas.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DietasComponent implements OnInit {

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


  btnSave: boolean = false;

  tiposDieta = [
    { id: 1, name: 'bajo en calorias' },
    { id: 2, name: 'bajo en proteinas' },
    { id: 3, name: 'otros' }
  ]


  itemsIngredientes = [
    { id: 1, value: '' }
  ]

  itemsPreparacion = [
    { id: 1, value: '' }
  ]

  dieta: Dieta = {
    tipo: "",
    titulo: "",
    objetivo: "",
    tiempo: "",
    dificultad: "",
    porciones: "",
    ingredientes: [],
    preparacion: [],
    imagen: 'assets/images/foto.png',
    estado: ''
  }
  

  dietaEdit: Dieta = {
    tipo: "",
    titulo: "",
    objetivo: "",
    tiempo: "",
    dificultad: "",
    porciones: "",
    ingredientes: [],
    preparacion: [],
    imagen: '',
    estado: ''
  }

  dietas: Dieta[] = [];
  dietasCopy: Dieta[] = [];

  tiposDietas: any = []
  tiposTiempo = ['15 min', '30 min', '45 min', '60 min', '1h 15min', '1h 30min', '1h 45min']
  tiposDificultad = ['baja', 'media', 'alta']

  load = false;
  indiceDelete: any;
  eventData: any;
  loadTrash: any;
  trash: any;

  new: boolean = true;

  constructor(private _http: HttpClient,
    private _dietaService: DietaService,
    private _categoriaService: CategoriaService,
    private _toasterService: ToasterService) {
    this.listar();

  }

  ngOnInit() {
  }




  guardar() {
    this.btnSave = true;
    if (this.new == true) {

      const id = Math.random().toString(36).substring(2);
      this.dieta.ingredientes = this.itemsIngredientes;
      this.dieta.preparacion = this.itemsPreparacion;
      this.dieta.estado = 'Activo';
      this._dietaService.onUpload(this.files[0].data, id);
      this.dieta.imagen = id;

      this.nuevaDieta();

    } else {

      this.dietaEdit.ingredientes = this.itemsIngredientes;
      this.dietaEdit.preparacion = this.itemsPreparacion;
      this.dietaEdit.imagen = this.dietaEdit['idImg']


      if (this.files.length == 0) {

        this.editarDieta();
        console.log('no actualiza imagen')
        console.log(this.dietaEdit);

      } else {

        var _this = this;
        const id = Math.random().toString(36).substring(2);

        _this._dietaService.onUpload(this.files[0].data, id);
        _this.dietaEdit.imagen = id;
        console.log(this.dietaEdit);

        this.editarDieta();


      }



    }


  }

  nuevaDieta() {
    this._dietaService.nuevaDieta(this.dieta).subscribe(
      data => {
        this.btnSave = false;
        this.clearForm();
        this.closeModal();
        this._toasterService.Success('Receta guardada OK !!');
        this.listar();
        this.files = [];

      },
      error => {
        this.btnSave = false;
        console.log('ERROR');
        this._toasterService.Error('Error al guardar el dato !!');
        console.log(error);

      }

    );
  }



  editarDieta() {
    delete this.dietaEdit['idImg'];
    this._dietaService.editarDieta(this.dietaEdit, this.dietaEdit["_id"]).subscribe(
      data => {
        this.btnSave = false;
        this._toasterService.Success("Receta editada OK !!");
        this.closeModal();
        this.clearForm();
        this.listar();

      },
      error => {
        this.btnSave = false;
        console.log(error);
        this._toasterService.Error('Error al actualizar el dato !!');
      }

    );

  }




  listar() {
    let _this = this;
    this._dietaService.consultarDietas()
      .subscribe(
        data => {

          let dietas = [];
          for (let key$ in data) {
            let dieta = data[key$];
            dieta['_id'] = key$;
            dietas.push(dieta);
            this.getUrlsImg(dieta);
          }

          this.dietasCopy = Object.assign({}, dietas);

          console.log(this.dietasCopy)

          this.getCategoriasDietas();

        },
        error => {
          console.log(error);
        }

      );
  }


  //Devuelve la url de la imagen
  getUrlsImg(dieta: any) {
    dieta['idImg'] = dieta['imagen'];
    this._dietaService.downloadUrl(dieta['imagen']).subscribe(
      data => {
        dieta['imagen'] = data;

      },
      error => {
        console.log('ERROR');
        console.log(error);

      }
    );

    dieta['imagen'] = 'http://www.leroymerlin.es/img/r25/32/3201/320102/forum_blanco/forum_blanco_sz4.jpg';


  }

  getCategoriasDietas() {
    this.tiposDietas = [];
    this._categoriaService.getCategoriasDieta()
      .subscribe(
        data => {

          for (let key$ in data) {
            let catgNew = data[key$];
            catgNew['id'] = key$;
            catgNew['longitud'] = 0;

            for (let pos in this.dietasCopy) {
              let obj = this.dietasCopy[pos];
              if (obj['tipo'] == catgNew['nombre']) {
                catgNew['longitud'] = catgNew['longitud'] + 1;
              }
            }

            this.tiposDietas.push(catgNew);
          }

          this.listar_por_tipo(this.tiposDietas[0]['nombre']);

        },
        error => {
          console.log(error);
        }

      );

    //console.log(this.tiposEntrenamiento)
  }

  selectTipo(tipo: any) {
    this.listar_por_tipo(tipo);
  }

  listar_por_tipo(tipo: any) {

    console.log(tipo)

    if (tipo == 'todos') {

      this.dietas = this.dietasCopy;

    } else {


      this.dietas = [];

      for (let key$ in this.dietasCopy) {
        let dieta = this.dietasCopy[key$];
        if (tipo === dieta.tipo) {

          this.dietas.push(dieta);

        }

      }



    }


  }

  clearForm() {
    this.dieta.tipo = "";
    this.dieta.titulo = "";
    this.dieta.objetivo = "";
    this.dieta.imagen = "";
    this.dieta.dificultad = "";
    this.dieta.tiempo = "";
    this.dieta.porciones = "";
    this.dieta.ingredientes = [];
    this.dieta.preparacion = [];
    this.itemsIngredientes = [{ id: 1, value: '' }];
    this.itemsPreparacion = [{ id: 1, value: '' }];
  }

  closeModal() {
    $('#dataModal').modal('hide');
  }


  newModal() {
    this.new = true;
    this.itemsIngredientes = [{ id: 1, value: '' }];
    this.itemsPreparacion = [{ id: 1, value: '' }];

    this.files=[];

    this.dieta.imagen='assets/images/foto.png';
  }


  addIngrediente() {

    let key = (this.itemsIngredientes.length) + 1;
    if (key <= 10) {
      this.itemsIngredientes.push({ id: key, value: '' });
    }
  }

  addPreparacion() {

    let key = (this.itemsPreparacion.length) + 1;
    if (key <= 10) {
    this.itemsPreparacion.push({ id: key, value: '' });
    }
  }

  deletedIngrediente() {
    this.itemsIngredientes.pop();


  }

  deletedPreparacion() {
    this.itemsPreparacion.pop();

  }

  select(event: any) {
    this.dieta.tipo = event;
  }


  editModal(dieta: Dieta) {
    this.itemsIngredientes = [];
    this.itemsIngredientes = [];

    this.new = false;
    this.dietaEdit = dieta;
    this.itemsIngredientes = dieta.ingredientes;
    this.itemsPreparacion = dieta.preparacion;
    //this.dieta.ingredientes = this.itemsIngredientes;
  }

  cargarId(item: any, event: any) {
    this.indiceDelete = item
    this.eventData = event;
    //this.posicion = posicion;
  }


  eliminar() {
    this.loadingTrash();


    this._dietaService.eliminarDieta(this.indiceDelete).subscribe(
      data => {

        this._toasterService.Success("Receta dada de baja OK !!");
        this.loadTrash.hide();
        this.trash.show();
        this.listar();
      },
      error => {
        console.log('ERROR');
        console.log(error);
        this.loadTrash.hide();
        this.trash.show();
      }
    );


  }


  loadingTrash() {

    //this.habilitar=false;

    this.trash = $(this.eventData.target).parent().find(`#${this.indiceDelete}`).hide();
    this.loadTrash = $(this.eventData.target).parent().find('img').show();

    this.trash.hide();
    this.loadTrash.show();
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
      this.dietaEdit.imagen="assets/images/foto.png";

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


  public imagePath:any;
      
  onSelectFile(event:any,val:any) { // called each time file input changes
    
    let typeFile = event.target.files[0].type;
    let sizeFile = event.target.files[0].size;



    if(typeFile === 'image/jpeg' || typeFile === 'image/png'  ){
    
      if(sizeFile <= 1048576){
  
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          this.imagePath = event.target.files;
          reader.readAsDataURL(event.target.files[0]); // read file as data url
          reader.onload = (event) => { // called once readAsDataURL is completed
            if(val==0){
              this.dieta.imagen = reader.result; //add source to image
            }else{
              this.dietaEdit.imagen = reader.result; //add source to image
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
      this.dieta.imagen="assets/images/foto.png";  
    }else{
      this.dietaEdit.imagen="assets/images/foto.png";
    }
    
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
