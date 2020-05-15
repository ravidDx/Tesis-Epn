import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatTable } from '@angular/material';


/*Interfaces */
import { Rutina } from '../../interfaces/rutina.interface';
import { Deportista } from '../../interfaces/deportista.interface';
import { PlanEntrenamiento } from '../../interfaces/planEntrenamiento.interface';

/*sERVICIOS */
import { ToasterService } from '../../services/toaster.service';
import { RutinaService } from '../../services/rutina.service';
import { DeportistaService } from '../../services/deportista.service';
import { PlanEntrenamientoService } from '../../services/plan-entrenamiento.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var  $: any;

@Component({
  selector: 'app-entrenamientos',
  templateUrl: './entrenamientos.component.html',
  styleUrls: ['./entrenamientos.component.scss']
})
export class EntrenamientosComponent implements OnInit {

  //Datatable
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('myTable') myTable: MatTable<any>;

  titleConfirm = '';

  displayedColumns: string[] = ['position', 'nombre', 'apellido', 'progreso', 'fecha', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<PlanEntrenamiento>();

  new: boolean = true;
  loadTrash:any;
  trash:any;
  indiceData:any;
  eventData:any; 

  planEntrenamiento: PlanEntrenamiento = {
    deportista: {},
    rutinas: [],
    duracion: "",
    fechaCreacion: {},
    estado: '',
    progreso: '',
  }

  planEntrenamientoEdit: PlanEntrenamiento = {
    deportista: {},
    rutinas: [],
    duracion: "",
    fechaCreacion: {},
    estado: '',
    progreso: '',
  }

  planEntrenamientos: PlanEntrenamiento[] = [];

  dias: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  semanas: string[] = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7', 'Semana 8', 'Semana 9', 'Semana 10', 'Semana 11', 'Semana 12'];

  rutinas: Rutina[] = [];
  deportistas: Deportista[] = [];

  listEntrenamientos: any[] = [];

  listRutinasEntr: any[] = [];

  listRutinas: any[] = [];

  deportistasAsignados: any[] = [];


  planEntrenamientoRamificado:any[]=[];


  labelPositionPlan = 'personalizado';

  fechaEntrenamiento ='';
  
  load=false;
  btnDisabled = false;


  constructor(private _rutinaService: RutinaService,
    private _deportistaService: DeportistaService,
    private _planEntrenamientoService: PlanEntrenamientoService,
    private _toasterService: ToasterService) {

    this.listar();
    this.listarRutinas();
    this.listarDeportistas();


  }

  ngOnInit() {

  }


  listar() {

      this.planEntrenamientos = [];

    this._planEntrenamientoService.consultarPlanEntrenamientos()
      .subscribe(
        data => {

          for (let key$ in data) {
            let planEntrenamiento = data[key$];
            planEntrenamiento['_id'] = key$;
            planEntrenamiento['progreso'] = parseFloat(planEntrenamiento['progreso']).toFixed(2);
            this.planEntrenamientos.push(planEntrenamiento);
          }

          this.dataSource.data = this.planEntrenamientos;
          this.dataSource.paginator = this.paginator;

          console.log(this.planEntrenamientos)

          //console.log(this.dataSource.data)

        },
        error => {
          console.log(error);
        }

      );

  }


  listarRutinas() {
    this.rutinas = [];
    this._rutinaService.consultarRutinas()
      .subscribe(
        data => {

          for (let key$ in data) {
            let rutina = data[key$];
            rutina['_id'] = key$;

            if(rutina['estado']==='Activo'){
              this.rutinas.push(rutina);
            }
           
          }

          console.log(this.rutinas)



        },
        error => {
          console.log(error);
        }

      );

  }


  listarDeportistas() {
    this.deportistas = [];
    this._deportistaService.consultarDesportistas()
      .subscribe(
        data => {

          for (let key$ in data) {
            let deportista = data[key$];
            deportista['_id'] = key$;

            if(deportista['estado']==='Activo'){
              this.deportistas.push(deportista);
            }

            
          }

          console.log(this.deportistas)


        },
        error => {
          console.log(error);
        }

      );

  }


  newModal() {
    this.new = true;
  }

  editModal(planEntrenamiento: PlanEntrenamiento) {
    this.new = false;
    console.log(this.new);
    this.planEntrenamientoEdit = Object.assign({}, planEntrenamiento);
    console.log(this.planEntrenamientoEdit);
  }

  guardar() {

    
    if (this.new == true) {

      this.disabledButton(true);

      let ff = new Date(this.fechaEntrenamiento);
      let fechaEntre = {
        dd:ff.getDate(),
        mm:ff.getMonth()+1,
        yyyy:ff.getFullYear()
      }
      var listRutinasEntr = this.listRutinasEntr;
      var estado = 'Activo';
      var progreso = '0';
      var fecha = this.getFechaActual();

      for (let $key in this.deportistasAsignados) {
          this.planEntrenamientoRamificado=[];
          var planEntrenamiento: PlanEntrenamiento = {
            deportista: this.deportistasAsignados[$key],
            rutinas: listRutinasEntr,
            duracion: "",
            fechaCreacion: fecha,
            estado: estado,
            progreso: progreso,
            
          }

        //console.log(planEntrenamiento)

        let planRamificado=this.getArrayPlanEntrenamiento(planEntrenamiento);

        planEntrenamiento['planEntren']=planRamificado;
        let numDiasEntrenamiento = this.planEntrenamientoRamificado.length;
        let progresoPorDia = (100/numDiasEntrenamiento)
        planEntrenamiento['numDias']=numDiasEntrenamiento;
        planEntrenamiento['progresoPorDia']=progresoPorDia;
        planEntrenamiento['fechaIninio']=fechaEntre;


        console.log(planEntrenamiento)

        this.nuevoPlanEntrenamiento(planEntrenamiento);
       

      }//fin for

    } else {

      this.disabledButton(true);

      this._planEntrenamientoService.editarPlanEntrenamiento(this.planEntrenamiento, this.planEntrenamientoEdit['_id']).subscribe(
        data => {
          console.log(data);
          // this.refresh(this.deportistaEdit)
          this.listar();
          this.closeModal();
          this.Success('Plan de entrenamiento editado OK !!');

        },
        error => {
          console.log(error);
        });
    }

    

  }

  closeModal() {
    $('#dataModal').modal('hide');
  }

  Success(title: any) {
    this._toasterService.Success(title);
  }

  //Metodo guardar entrenamiento
  nuevoPlanEntrenamiento(planEntrenamiento: PlanEntrenamiento) {
    this._planEntrenamientoService.nuevoPlanEntrenamiento(planEntrenamiento).subscribe(
      data => {
        
        this.clearForm();
        this.closeModal();
        this._toasterService.Success('Plan de entrenamiento guardado OK !!');
        this.disabledButton(false);
        this.listar();


        //this._toasterService.Success('Entrenamiento guardado OK !!');

      },
      error => {
        console.log('ERROR');
        this._toasterService.Error(' Error al guardar !!');
        console.log(error);
        this.disabledBtn(false);
        this.loading(false);


      }

    );
  }




  addRutina(event: any) {
    //console.log(this.listaEjercicios);
    this.listRutinasEntr = [];

    //this.entrenamientos=[];
    for (let $key in this.listRutinas) {

      let data: any = {
        rutina: this.listRutinas[$key],
        dias: [],
        semanas: [],

      }
      this.listRutinasEntr.push(data);
    }



  }

  //Obtencion de fecha
  getFechaActual() {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();

    dd = this.addZero(dd);
    mm = this.addZero(mm);

    let fecha = {
      dd: dd,
      mm: mm,
      yyyy: yyyy
    }

  
    return fecha;
  }
  //Obtencion de fecha
  addZero(i: any) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  cargarObjectBaja(planEntrenamiento:PlanEntrenamiento, event:any){
    this.indiceData=planEntrenamiento["_id"];
    this.planEntrenamientoEdit = Object.assign({},planEntrenamiento);
    this.eventData = event;
    console.log(planEntrenamiento['estado'], 'será');

    if(planEntrenamiento['estado'] == 'Activo' ){
      this.titleConfirm='Esta seguro de dar de baja este plan de entrenamiento?';
  
    }else{
      this.titleConfirm='Esta seguro de dar de alta este plan de entrenamiento?';
  
    }
    
  }

  darBaja(){
    
    this.loadingTrash();
    let title="";

    if(this.planEntrenamientoEdit.estado === 'Activo'){
      this.planEntrenamientoEdit.estado = 'Inactivo';
      title = 'Plan de entrenamiento dado de baja OK !!';
    }else{
      this.planEntrenamientoEdit.estado = 'Activo';
      title = 'Plan de entrenamiento dado de alta OK !!';
    }
    
    this._planEntrenamientoService.darBajaPlanEntrenamiento(this.planEntrenamientoEdit,this.planEntrenamientoEdit["_id"]).subscribe(
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

  loadingTrash(){
    this.trash = $(this.eventData.target).parent().find(`#${this.indiceData}`).hide();
    this.loadTrash = $(this.eventData.target).parent().find('img').show();
    
    this.trash.hide();
    this.loadTrash.show();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)
  }



  getArrayPlanEntrenamiento(planEntrenamiento:any){

    let rutinas = planEntrenamiento.rutinas;
 

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


    return this.planEntrenamientoRamificado;

  }


  clearForm(){
    this.planEntrenamiento.deportista={};
    this.planEntrenamiento.rutinas=[];
    this.planEntrenamiento.duracion='';
    this.planEntrenamiento.fechaCreacion={};
    this.planEntrenamiento['fechaIninio']={};
    this.planEntrenamiento.estado='';
    this.planEntrenamiento.progreso='';
    this.listRutinasEntr=[];
    this.fechaEntrenamiento='';
    this.deportistasAsignados=[];
    this.listRutinas=[];
    
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


}
