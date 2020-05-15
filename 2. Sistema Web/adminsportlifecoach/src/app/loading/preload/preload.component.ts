
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.scss']
})
export class PreloadComponent implements OnInit {

  // Esta variable nos dara el control si debemos de mostrar la imagen o no debemos de mostrarla.
    // @value: false = la imagen no se cargo (se muestra aun el loading).
    // @value: true  = la imagen se cargo , desaparece el loading y muestra la imagen.
    viewImage : boolean = false;   

    // Escuchamos constantemente si nuestro valor de entrada cambia.
    @Input('url') set url(url:string){     
    // Preguntamos si existe un valor en la variable.
        if(url){               
            this.viewImage=false;        
            this.loadImage(url);            
        }        
    }

    // Obtenemos una referencia hacia el tag "<img>" para poder manipularlo luego
    @ViewChild('lImage') lImage : ElementRef;
    
    constructor() { }

    ngOnInit() {
    // Utilizaremos el evento "onload" de el tag "<img>" ,este evento se disparara
    // cuando la imagen se carge en su totalidad.
        this.lImage.nativeElement.onload=()=>{
            this.viewImage=true;                        
        }
    }
    // Función que utilizaremos para comenzar el proceso de carga de imagenes, 
    // esta misma le proporcionara la dirección imagen la cual tiene que cargar.
    loadImage(urlImage){
        this.lImage.nativeElement.src = urlImage;        
    }


}
