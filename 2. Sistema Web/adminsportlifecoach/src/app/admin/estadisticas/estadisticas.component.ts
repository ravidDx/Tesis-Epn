import { Component, OnInit } from '@angular/core';
import {EvaluacionService} from '../../services/evaluacion.service';
import {ActivatedRoute, Router} from '@angular/router';

import {Evaluacion} from '../../interfaces/evaluacion.interface';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  evaluacion:Evaluacion = {
    idDeportista:"",
    edad:"",
	  imc:"",
    fechaCreacion:{},
    recomendacion:''
  }

  evaluaciones:Evaluacion[] =[];


  constructor(private _evaluacionService:EvaluacionService, private _activeRoute:ActivatedRoute) { 

    this._activeRoute.params.subscribe(
      params =>{
        console.log(params['_id']);
        
        this._evaluacionService.consultarEvaluaciones().subscribe(
          data=>{
            
 
            for(let key$ in data){
              let evaluacion = data[key$];

              if(params['_id'] == evaluacion.idDeportista){
                evaluacion['_id']=key$;
                this.evaluaciones.push(evaluacion);
              }
            
            }

            console.log(this.evaluaciones);
      
          },
          error=>{
            console.log(error);
          }

        );
        
      });


  }

  ngOnInit() {

    this.getLineChart();
  }


  getLineChart(){
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
            datasets: [{
                label: '# of Votes',
                data: [22.04, 22.04, 22.03, 22.00,22.00, 21.98, 21.98,21.91, 21.80, 21.80, 21.70, 21.70],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    //display:true,
                    stacked:true,
                    ticks: {
                        //beginAtZero: true,
                       // steps:3,
                       // stepValue:3,
                        min:15,
                        max:40
                    }
                }]
            },
            size: {
              height: 200,
              width: 400
          }
        }
    });
  }

}
