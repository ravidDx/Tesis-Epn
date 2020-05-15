import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DeportistaService } from '../../services/deportista.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Deportista } from '../../interfaces/deportista.interface';
import { Chart } from 'chart.js';
import { Evaluacion } from 'app/interfaces/evaluacion.interface';
import { EvaluacionService } from 'app/services/evaluacion.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-deportista',
  templateUrl: './deportista.component.html',
  styleUrls: ['./deportista.component.scss']
})
export class DeportistaComponent implements OnInit {

  deportista: Deportista = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fechaN: "",
    peso: "",
    altura: "",
    foto: "",
    genero: "",
    objetivo: "",
    observaciones: "",
    rol: "",
    fechaCreacion: {},
    estado: '',
  }

  deportistaEdit: Deportista = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fechaN: [],
    peso: "",
    altura: "",
    foto: "",
    genero: "",
    objetivo: "",
    observaciones: "",
    rol: "",
    fechaCreacion: {},
    estado: "",
  }

  evaluacion: Evaluacion = {
    idDeportista: '',
    edad: '',
    imc: '',
    fechaCreacion: {},
    recomendacion: '',
  }

  new: boolean;

  edad: any;
  imc: any;

  dato: string = '5.55';
  myChart = [];
  data: any = [];
  options: any = {}
  ctx: any;

  nivelesPeso = ['Por debajo del peso', 'Peso normal', 'Sobrepeso', 'Obesidad'];
  nivelPeso: any;
  posNivelPeso: any;
  colorNivelesPeso = ['#16B3E7', '#16E72E', '#E7D016', '#E74516'];

  ngOnInit() {
    // this.getPluginChart();
    //this.painChartDona();

  }


  constructor(private _deportistaService: DeportistaService, private _evaluacionService: EvaluacionService,
    private _activeRoute: ActivatedRoute, private toasterService:ToasterService) {

    this._activeRoute.params.subscribe(
      params => {
        //console.log(params['_id']);
        this._deportistaService.verDeportista(params['_id']).subscribe(
          data => {

            //console.log(data)

            this.deportista = data;
            this.calcularEdad(this.deportista.fechaN)
            this.imc = this.calcularIMC(this.deportista.peso, this.deportista.altura);
            this.nivelPeso = this.calcularNivelpeso(this.imc);
            this.getSemiDonaChart();
            //console.log(this.imc)
          },
          error => {
            console.log(error);
          }

        );

      });


  }



  evaluar() {
    this._deportistaService.editarDeportista(this.deportista, this.deportista['_id']).subscribe(
      data => {
        //console.log(data);
        this.evaluacion.edad = this.calcularEdad(data.fechaN).toString();
        this.evaluacion.imc = this.calcularIMC(data.peso, data.altura).toString();
        this.evaluacion.idDeportista = data['_id'];
        this.evaluacion.fechaCreacion = data['fechaCreacion'];

        this._evaluacionService.nuevaEvaluacion(this.evaluacion).subscribe(
          data => {
            //console.log(data);
            // this.refresh(this.deportistaEdit)
          },
          error => {
            console.log(error);
          }
        );
        this.closeModal();
        this.toasterService.Success("Evaluación guardada OK !!");
        //console.log(this.evaluacion)

      },
      error => {
        console.log(error);
      });
  }

  closeModal(){
    // $('#dataModal1').modal('hide');
  }

  calcularEdad(FechaNacimiento: any) {

    var fechaNace: any = new Date(FechaNacimiento);
    var fechaActual: any = new Date()

    var mes = fechaActual.getMonth() + 1;
    var dia = fechaActual.getDate();
    var año = fechaActual.getFullYear();


    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);

    this.edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));
    return this.edad;

  }

  calcularIMC(peso: any, altura: any) {
    let imc: any;
    peso = parseFloat(peso);
    altura = parseFloat(altura);
    altura = altura / 100;
    imc = peso / (altura * altura);
    imc = imc.toFixed(2);
    return imc;

  }

  calcularNivelpeso(imc: any) {
    if (imc > 0 && imc <= 18.5) {
      this.posNivelPeso = 0;
      return this.nivelesPeso[0];
    } else if (imc > 18.5 && imc <= 24.9) {
      this.posNivelPeso = 1;
      return this.nivelesPeso[1];
    } else if (imc > 24.9 && imc <= 29.9) {
      this.posNivelPeso = 2;
      return this.nivelesPeso[2];
    } else if (imc > 29.9) {
      this.posNivelPeso = 3;
      return this.nivelesPeso[3];
    }
  }


  getSemiDonaChart() {

    var _thisP = this;
    var numPorcen1: any;
    var numPorcen2: any;
    var colorNivelPeso = _thisP.colorNivelesPeso[_thisP.posNivelPeso]

    numPorcen1 = _thisP.imc;
    numPorcen2 = 40 - _thisP.imc;


    this.getPluginDonaChart();

    var config = {
      type: 'doughnutLabels',
      data: {
        datasets: [{
          data: [
            numPorcen1,
            numPorcen2,
          ],
          backgroundColor: [
            colorNivelPeso,
            "#F2F3F4"
          ]
        }],
        labels: [
          "IMC: ",
          ""
        ]
      },
      options: {
        circumference: Math.PI,
        rotation: 1.0 * Math.PI,
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Indice de masa corporal'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {

              var dataset = data.datasets[tooltipItem.datasetIndex];
              var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                return previousValue + currentValue;
              });
              var currentValue = dataset.data[tooltipItem.index];
              //var precentage = Math.floor(((currentValue / total) * 100) + 0.5);
              return data.labels[tooltipItem.index] + " " + currentValue + "";
            }
          }
        }
      }
    };

    var ctx = document.getElementById("myChart");
    this.myChart = new Chart(ctx, config);

  }


  getPluginDonaChart() {
    var _thisP = this;
    //console.log(_this.imc)

    Chart.defaults.doughnutLabels = Chart.helpers.clone(Chart.defaults.doughnut);

    var helpers = Chart.helpers;
    var defaults = Chart.defaults;

    Chart.controllers.doughnutLabels = Chart.controllers.doughnut.extend({
      updateElement: function (arc, index, reset) {
        var _this = this;
        var chart = _this.chart,
          chartArea = chart.chartArea,
          opts = chart.options,
          animationOpts = opts.animation,
          arcOpts = opts.elements.arc,
          centerX = (chartArea.left + chartArea.right) / 2,
          centerY = (chartArea.top + chartArea.bottom) / 2,
          startAngle = opts.rotation, // non reset case handled later
          endAngle = opts.rotation, // non reset case handled later
          dataset = _this.getDataset(),
          circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : _this.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI)),
          innerRadius = reset && animationOpts.animateScale ? 0 : _this.innerRadius,
          outerRadius = reset && animationOpts.animateScale ? 0 : _this.outerRadius,
          custom = arc.custom || {},
          valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;

        helpers.extend(arc, {
          // Utility
          _datasetIndex: _this.index,
          _index: index,

          // Desired view properties
          _model: {
            x: centerX + chart.offsetX,
            y: centerY + chart.offsetY,
            startAngle: startAngle,
            endAngle: endAngle,
            circumference: circumference,
            outerRadius: outerRadius,
            innerRadius: innerRadius,
            label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
          },

          draw: function () {
            var ctx = this._chart.ctx,
              vm = this._view,
              sA = vm.startAngle,
              eA = vm.endAngle,
              opts = this._chart.config.options;

            var labelPos = this.tooltipPosition();
            var segmentLabel = vm.circumference / opts.circumference * 100;

            ctx.beginPath();

            ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
            ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);

            ctx.closePath();
            ctx.strokeStyle = vm.borderColor;
            ctx.lineWidth = vm.borderWidth;

            ctx.fillStyle = vm.backgroundColor;

            ctx.fill();
            ctx.lineJoin = 'bevel';

            if (vm.borderWidth) {
              ctx.stroke();
            }

            if (vm.circumference > 0.0015) { // Trying to hide label when it doesn't fit in segment
              ctx.beginPath();
              ctx.font = helpers.fontString(opts.defaultFontSize, opts.defaultFontStyle, opts.defaultFontFamily);
              ctx.fillStyle = "#190707";
              ctx.textBaseline = "top";
              ctx.textAlign = "center";

              // Round percentage in a way that it always adds up to 100%
              ctx.fillText(segmentLabel.toFixed(2) + "%", labelPos.x, labelPos.y);
            }
            //display in the center the total sum of all segments
            var total = dataset.data.reduce((sum, val) => sum + val, 0);
            //ctx.fillText('Total = ' + total, vm.x, vm.y - 20, 200);

            ctx.font = '35pt Verdata';
            ctx.fillText(_thisP.imc, vm.x, vm.y - 70, 200);
            ctx.font = '12pt Verdata';
            ctx.fillText(_thisP.nivelPeso, vm.x, vm.y - 20, 200);

            ctx.font = '18pt Verdata';
            ctx.fillText('0', eA + (vm.x / 2), vm.y - 20);
            ctx.fillText('40', eA + vm.x + (vm.x / 2), vm.y - 20);
          }
        });

        var model = arc._model;
        model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor);
        model.hoverBackgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueAtIndexOrDefault(dataset.hoverBackgroundColor, index, arcOpts.hoverBackgroundColor);
        model.borderWidth = custom.borderWidth ? custom.borderWidth : valueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth);
        model.borderColor = custom.borderColor ? custom.borderColor : valueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor);

        // Set correct angles if not resetting
        if (!reset || !animationOpts.animateRotate) {
          if (index === 0) {
            model.startAngle = opts.rotation;
          } else {
            model.startAngle = _this.getMeta().data[index - 1]._model.endAngle;
          }

          model.endAngle = model.startAngle + model.circumference;
        }

        arc.pivot();
      }
    });

  }



  Success(title:any){
    this.toasterService.Success(title);
  }


}
