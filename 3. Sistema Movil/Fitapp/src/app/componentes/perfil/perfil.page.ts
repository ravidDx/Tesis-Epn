import { Component, OnInit } from '@angular/core';
// Importando servicios para gestionar autenticacion y usuarios
import { UsuariosService } from '../../servicios/usuarios.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
// para traer usuario de la base realtime
import { AngularFireDatabase } from '@angular/fire/database';
// PARA IMAGEN DE PERFIL
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
// Para validar el formulario
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// mensaje
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  prof_Frm: FormGroup;
  usuario: any = {};
  photo = false;
  image: string;
  validation_messages = {
    'nombre': [
      { type: 'required', message: 'Nombre es requerido' }
    ],
    'apellido': [
      { type: 'required', message: 'Apellido es requerido' }
    ],
    'date': [
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
  constructor(private userService: UsuariosService, private AFauth: AngularFireAuth, public alertController: AlertController,
    private DBFire: AngularFireDatabase, private imagePicker: ImagePicker,
    private formBuilder: FormBuilder, public router: Router) {
    // this.image = 'assets/video/barras.png';
    try {
      // EXTRAER USUARIO DE LA BASE
      this.AFauth.authState.subscribe(user => {
        this.DBFire.object('usuarios/' + user.uid).valueChanges().subscribe(
          suc => {
            this.usuario = suc;
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    this.prof_Frm = this.createFormGroup();
  }

  update() {
    if (this.photo) {
      // this.usuario.foto = this.image;
      this.prof_Frm.value.foto = this.image;
    }
    // alert('cambió: ' + this.prof_Frm.value.foto);
    this.userService.updateUser(this.prof_Frm.value);
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
      date: new FormControl('', Validators.required),
      peso: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{2,3}') // *[0-9]{2,3}[.][0-9]
      ])),
      altura: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{3}')
      ])),
    });
  }

  delete_user() {
    this.AFauth.authState.subscribe(user => {
      this.DBFire.object('usuarios/' + user.uid).remove().then(usuario => {
        user.delete();
        console.log(usuario);
        this.router.navigate(['slide']);
      });
    });
  }

  async msj_delete() {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: 'Estas seguro que deseas eliminar tu usuario en FitApp',
      buttons: ['Cancel', {
        text: 'OK',
        handler: () => {
          this.delete_user();
        }
      }
      ]
    });
    await alert.present();
  }
}
