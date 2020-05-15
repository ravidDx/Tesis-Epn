import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatTable} from '@angular/material';

import {coerceNumberProperty} from '@angular/cdk/coercion';

import { Subject } from 'rxjs/Subject';

import {Router} from '@angular/router';
import {NgForm} from '@angular/forms'; 

import {Deportista} from '../../interfaces/deportista.interface';
import {Evaluacion} from '../../interfaces/evaluacion.interface';

import {DeportistaService} from '../../services/deportista.service';
import {EvaluacionService} from '../../services/evaluacion.service';
import {UserolesService} from '../../services/useroles.service';
import {AuthService} from '../../services/auth.service';


import {ToasterService} from '../../services/toaster.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';
import { Title } from '@angular/platform-browser';

declare var  $: any;

@Component({
  selector: 'app-deportistas',
  templateUrl: './deportistas.component.html',
  styleUrls: ['./deportistas.component.scss']
})
export class DeportistasComponent implements OnInit {
  
  //Datatable
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('myTable') myTable: MatTable<any>;

  titleConfirm='';

  

  displayedColumns: string[] = ['position','nombre','apellido', 'email', 'telefono', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Deportista>();


  maxPeso = 200;
  minPeso = 30;
  thumbLabelPeso = true;
  valuePeso = 55;

  maxAltura = 220;
  minAltura = 130;
  thumbLabelAltura = true;
  valueAltura = 170;

  
  habilitar:boolean=true;
  new:boolean;
  cargar:boolean=false;
  load=false;
  loadTrash:any;
  trash:any;
  msgAlert:string;
  btnDisabled = false;
  
  indiceData:any;
  eventData:any; 

  gifMale="https://firebasestorage.googleapis.com/v0/b/miapp-158221.appspot.com/o/uploads%2Fbmi-male-loop.gif?alt=media&token=9f326bc4-65d9-4739-a0fc-d9d20f756ddb";
  gifFemale="https://firebasestorage.googleapis.com/v0/b/miapp-158221.appspot.com/o/uploads%2Fbmi-female-loop.gif?alt=media&token=f1813f80-a240-45df-a704-8ea140b5f565";
  
  tiposObjetivo:string[] = ['Perder peso y quemar grasa','Ganar masa muscular y fuerza', 'Vivir de forma saludable y mantener mi peso'];

  
  deportista:Deportista = {
    nombre:"",
    apellido:"",
    email:"",
    telefono:"",
    fechaN:"",
    peso:"",
    altura:"",
    foto:"",
    genero:"",
    objetivo:"",
    observaciones:"",
    rol:"",
    fechaCreacion:{},
    estado:"",
  }

  deportistaEdit:Deportista = {
    nombre:"",
    apellido:"",
    email:"",
    telefono:"",
    fechaN:[],
    peso:"",
    altura:"",
    foto:"",
    genero:"",
    objetivo:"",
    observaciones:"",
    rol:"",
    fechaCreacion:{},
    estado:"",
  }

  evaluacion:Evaluacion = {
    idDeportista:'',
    edad:'',
	  imc:'',
    fechaCreacion:{},
    recomendacion:'',
  }

 
  

  deportistas:Deportista[] =[];

  favoriteSeason: string; 
 
  /*LIMITE DE FECHA */
  minDate = new Date(1920, 0, 1);
  maxDate = new Date(2001, 0, 1);

  constructor(private _deportistaService:DeportistaService,
              private _evaluacionService:EvaluacionService,
              public dialog: MatDialog,
              private toasterService:ToasterService,
              private _authService:AuthService,
              private _useroleService:UserolesService) { 
    this.listar();
    this.deportista.fechaCreacion=this.getFechaActual();
   
  }

  ngOnInit() {
    //"url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    //this.getFechaActual();
  }

  
  formatLabel(value: number) {
    return value;
  }

  guardar(){
  

    if(this.new==true){
      this.disabledButton(true);


      if(this.deportista.genero === 'male'){
        this.deportista.foto = "https://firebasestorage.googleapis.com/v0/b/miapp-158221.appspot.com/o/uploads%2Fbmi-male-loop.gif?alt=media&token=9f326bc4-65d9-4739-a0fc-d9d20f756ddb";
      }else if(this.deportista.genero === 'female'){
        this.deportista.foto = 'https://firebasestorage.googleapis.com/v0/b/miapp-158221.appspot.com/o/uploads%2Fbmi-female-loop.gif?alt=media&token=f1813f80-a240-45df-a704-8ea140b5f565';
      }
      
      this.deportista.estado = 'Activo';
      this.deportista.rol = 'Afiliado',

      this._deportistaService.nuevoDeportista(this.deportista).subscribe(
        data=>{
          
          var obj = Object.assign({},this.deportista);
          obj['_id']=data['name'];
        
          //Guardar credenciales email y pass en firebase
          this.guardarAuthUser(obj.email,obj.email);

          //Guardar credencial y rol en firebase
          this.guardarUserRole(this.deportista.email,this.deportista.rol);

          this.dataSource.data = this.dataSource.data.concat(obj);
          this.clearForm();
          this.closeModal();
          this.toasterService.Success("Deportista guardado OK !!");
          //this.viewAlert("Deportista guardado OK !!")
          this.disabledButton(false);
          this.guardarEvaluacion(obj);      

        },
        error=>{
          console.log('ERROR');
          console.log(error);
          this.disabledBtn(false);
          this.loading(false);
        }
  
      );
      

    }else if(this.new==false){
      this.disabledButton(true);
      //console.log(this.deportistaEdit["_id"],'verificar');
      this._deportistaService.editarDeportista(this.deportistaEdit,this.deportistaEdit["_id"]).subscribe(
        data=>{
          console.log(data);
         // this.refresh(this.deportistaEdit)
         this.listar();
          this.closeModal();
          this.Success("Deportista editado OK !!");
          this.disabledButton(false);
          
        },
        error=>{
          console.log(error);
          this.disabledButton(false);
        }
        
      );
      
    }
    
  }

  guardarAuthUser(email:any, pass:any){
    this._authService.signUpWithEmail(email,pass)
    .then(data=>{
      console.log(data)
    })
    .catch(err=>{
      console.log('error: '+err)
    })
  }

  guardarEvaluacion(obj:any){

    this.evaluacion.edad = this.calcularEdad(obj['fechaN']).toString();
    this.evaluacion.imc = this.calcularIMC(obj['peso'], obj['altura']).toString();
    this.evaluacion.idDeportista = obj['_id'];
    this.evaluacion.fechaCreacion=obj['fechaCreacion'];

    this._evaluacionService.nuevaEvaluacion(this.evaluacion).subscribe(
      data=>{
        console.log(data);
       // this.refresh(this.deportistaEdit)
      },
      error=>{
        console.log(error);
        this.disabledButton(false);
      }
      
    );


  }

  guardarUserRole(emaill:any, roll:any){

    let userole:any = {
      email:emaill,
      rol:roll
    }
    this._useroleService.newUserRole(userole).subscribe(
      data=>{
        console.log(data);
       // this.refresh(this.deportistaEdit)
      },
      error=>{
        console.log(error);
        
      }
      
    );

  }

  
  listar(){
    this.deportistas=[];
    this._deportistaService.consultarDesportistas()
      .subscribe(
        data=>{

          for(let key$ in data){
	  				let deportista = data[key$];
	  				deportista['_id']=key$;
	  				this.deportistas.push(deportista);
          }
        
          this.dataSource.data = this.deportistas;
          this.dataSource.paginator = this.paginator;
                 
        },
        error=>{
          console.log(error);
        }

      );

  }
  
  cargarId(indice:string, event:any){
    this.indiceData=indice;
    this.eventData = event;
  }

  cargarObjectBaja(deportista:Deportista, event:any){
    this.indiceData=deportista["_id"];
    this.deportistaEdit = Object.assign({},deportista);
    this.eventData = event;

    if(deportista['estado'] == 'Activo' ){
      this.titleConfirm='Esta seguro de dar de baja a este deportista?';
  
    }else{
      this.titleConfirm='Esta seguro de dar de alta a este deportista?';
  
    }
    
  }

  eliminar(){

    this.loadingTrash();
       
    this._deportistaService.eliminarDeportista(this.indiceData).
  		subscribe(
  			data=>{
       
        //this.refresh();
        this.Error("Deportista eliminado OK !!");
        //this.viewAlert("Deportista eliminado OK !!")
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


  darBaja(){
    
    this.loadingTrash();
    let title="";

    if(this.deportistaEdit.estado == 'Activo'){
      this.deportistaEdit.estado = 'Inactivo';
      title = 'Deportista dado de baja OK !!';
    }else{
      this.deportistaEdit.estado = 'Activo';
      title = 'Deportista dado de alta OK !!';
    }
    
    this._deportistaService.darBajaDeportista(this.deportistaEdit,this.deportistaEdit["_id"]).subscribe(
      data=>{
        //this.refresh(this.deportistaEdit);
        this.listar();
        this.Success(title);
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


  editModal(deportista:Deportista){
    
    this.new=false;
    this.deportistaEdit = Object.assign({},deportista);
    //console.log(this.deportistaEdit,'taty')
    
  }

  newModal(){
    this.new=true;
  }


  clearForm(){
    this.deportista.nombre="";
    this.deportista.apellido="";
    this.deportista.email="";
    this.deportista.telefono="";
    this.deportista.fechaN="";
    this.deportista.peso="";
    this.deportista.altura="";
    this.deportista.genero="";
    this.deportista.objetivo="";
    this.deportista.observaciones="";
    this.deportista.estado="";
    this.deportista.rol="";
    this.deportista.foto="";
    this.deportista.fechaCreacion=this.getFechaActual();
  }

  select(event:any){
    
    //this.deportista.objetivo=event;
 
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

  



  viewAlert(msg:string){
    this.msgAlert = msg;
    $('.alert').fadeIn(1500);
    $('.alert').fadeOut(2500);
  }

  closeModal(){
    $('#dataModal').modal('hide');
  }

  disabledBtn(access:boolean){
    this.btnDisabled = access;
  }

  loading(load:boolean){
    this.load = load;
  }

  loadingTrash(){
    this.trash = $(this.eventData.target).parent().find(`#${this.indiceData}`).hide();
    this.loadTrash = $(this.eventData.target).parent().find('img').show();
    
    this.trash.hide();
    this.loadTrash.show();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {nombre: this.deportista.nombre, apellido: this.deportista.apellido}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deportista.apellido = result;
    });
  }

  refresh(deportista:Deportista){ 
    let obj = Object.assign({},deportista);

     for(let pos in this.deportistas){
       if(this.deportistas[pos]['_id']== obj['_id']){
        this.deportistas[pos] = obj;
        console.log( this.deportistas[pos] )
       }
      
    }
    
  }

  disabledButton(valor:boolean){
    this.disabledBtn(valor);
    this.loading(valor);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Success(title:any){
    this.toasterService.Success(title);
  }
  Info(title:any){
    this.toasterService.Info(title);
  }
  Warning(title:any){
    this.toasterService.Warning(title);
  }
  Error(title:any){
    this.toasterService.Error(title);
  }

  calcularEdad(FechaNacimiento:any) {
             
    var fechaNace:any = new Date(FechaNacimiento);
    var fechaActual:any = new Date()

    var mes = fechaActual.getMonth()+1;
    var dia = fechaActual.getDate();
    var año = fechaActual.getFullYear();

    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);

    var edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));
    return edad;
        
  }

  calcularIMC(peso:any, altura:any){
    let imc:any;
    peso = parseFloat(peso);
    altura = parseFloat(altura);
    altura = altura/100;
    imc = peso/(altura*altura)
    imc =  imc.toFixed(2);
    return imc;
  }




 
  



  

 
}
