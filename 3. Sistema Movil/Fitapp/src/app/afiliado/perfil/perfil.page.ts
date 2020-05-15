import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DeportistasService } from '../../servicios/deportistas.service';

import { Deportista } from '../../interfaces/deportista.interface';

// PARA IMAGEN DE PERFIL
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
// Para validar el formulario
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// mensaje
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  prof_Frm: FormGroup;
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
  email: any;
  photo = false;
  image: string;
  validation_messages = {
    'nombre': [
      { type: 'required', message: 'Nombre es requerido' }
    ],
    'apellido': [
      { type: 'required', message: 'Apellido es requerido' }
    ],
    'fechaN': [
      { type: 'required', message: 'Fecha es requerida' }
    ],
    'peso': [
      { type: 'required', message: 'Peso es requerido' },
      { type: 'pattern', message: 'Peso solo contiene valores numericos' }
    ],
    'altura': [
      { type: 'required', message: 'Altura es requerido' },
      { type: 'pattern', message: 'Altura solo contiene valores numericos' }
    ],
    'objetivo': [
      { type: 'required', message: 'Objetivo es requerida' }
    ],
  };
  constructor(public alertController: AlertController, private imagePicker: ImagePicker,
    private formBuilder: FormBuilder, public router: Router, private _deportistaService: DeportistasService,public toastController: ToastController) {
    this.email = localStorage.getItem('email');
    this.getDeportista();
  }


  ngOnInit() {
    this.prof_Frm = this.createFormGroup();
  }

  update() {
    console.log(this.prof_Frm.value);
    if (this.photo) {
      // this.usuario.foto = this.image;
      this.prof_Frm.value.foto = this.image;

    }
    this.deportista = this.prof_Frm.value;
    // alert('cambió: ' + this.prof_Frm.value.foto);
    this._deportistaService.editarDeportista(this.deportista, this.deportista['_id']).subscribe(
      data => {
        console.log(data, 'usuario editado');
        this.upd_ok();
      });
    // this.userService.updateUser(this.prof_Frm.value);
  }

  AccessGallery() {
    this.imagePicker.hasReadPermission().then((result) => {
      if (result === false) {
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      } else if (result === true) {
        const options: ImagePickerOptions = {
          maximumImagesCount: 1,
          width: 200,
          quality: 25,
          outputType: 1,
        };
        this.imagePicker.getPictures(options).then((results) => {
          console.log('inicio :' + results);
          for (let i = 0; i < results.length; i++) {
            this.image = 'data:image/jpeg;base64,' + results[i];
            console.log('con datos :' + this.image);
            this.photo = true;
          }
        }, (err) => alert(err));
      }
    }, (err) => {
      console.log('err');
      console.log(err);
    });
  }

  createFormGroup() {
    return this.formBuilder.group({
      genero: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      objetivo: new FormControl('', Validators.required),
      fechaN: new FormControl('', Validators.required),
      peso: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{2,3}') // *[0-9]{2,3}[.][0-9]
      ])),
      altura: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{3}')
      ])),
      email: new FormControl(''),
      foto: new FormControl(''),
      telefono: new FormControl(''),
      observaciones: new FormControl(''),
      rol: new FormControl(''),
      fechaCreacion: new FormControl(''),
      estado: new FormControl(''),
      _id: new FormControl(''),
    });
  }


  getDeportista() {
    this._deportistaService.consultarDesportistas()
      .subscribe(
        data => {

          for (let key$ in data) {
            let deportista = data[key$];
            deportista['_id'] = key$;

            if (deportista.email === this.email) {
              this.deportista = deportista;
              break;
            }

          }

          if (this.deportista.genero = "male") {
            this.deportista.genero = "hombre";
          } else {
            this.deportista.genero = "mujer";
          }

          if (this.deportista.objetivo = "Perder peso y Quemar grasa") {
            this.deportista.objetivo = "perder peso";
          } else if (this.deportista.objetivo = "Ganar masa muscular y Fuerza") {
            this.deportista.objetivo = "ganar masa muscular";
          } else {
            this.deportista.objetivo = "mantener peso";
          }

          this.full_form();
        },
        error => {
          console.log(error);
        }

      );
  }

  full_form(){
    this.prof_Frm.setValue({
      nombre: this.deportista.nombre,
      apellido: this.deportista.apellido,
      fechaN: this.deportista.fechaN,
      peso: this.deportista.peso,
      altura: this.deportista.altura,
      genero: this.deportista.genero,
      objetivo: this.deportista.objetivo,
      email: this.deportista.email,
      foto: this.deportista.foto,
      telefono: this.deportista.telefono,
      observaciones: this.deportista.observaciones,
      rol: this.deportista.rol,
      fechaCreacion: this.deportista.fechaCreacion,
      estado: this.deportista.estado,
      _id: this.deportista['_id'],
    });

  }

  // MENSAJES PARA EL UPDATE
  async upd_ok() {
    const toast = await this.toastController.create({
      message: 'El usuario se ha modificado exitosamente',
      duration: 2000,
      color: 'dark',
      position: 'bottom',
      animated: true
    });
    toast.present();
  }

  async upd_bad() {
    const toast = await this.toastController.create({
      message: 'El usuario no se ha modificado',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();

}

}
