import { Component, OnInit } from '@angular/core';
// Para validar el formulario
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { AuthService } from '../../../servicios/auth.service';
import { ValidacionesService } from '../../../servicios/validaciones.service';
import { Router } from '@angular/router';
// import {User} from '../../../share/user.class';
// mensaje visible al cargar la página al home
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-gender',
  templateUrl: './gender.page.html',
  styleUrls: ['./gender.page.scss'],
})
export class GenderPage implements OnInit {

  regForm: FormGroup;
  matching_passwords_group: FormGroup;
  user: any = {};
  validation_messages = {
    'nombre': [
      { type: 'required', message: 'Nombre es requerido' }
    ],
    'apellido': [
      { type: 'required', message: 'Apellido es requerido' }
    ],
    'email': [
      { type: 'required', message: 'Email es requerido' },
      { type: 'pattern', message: 'Ingrese un email válido' }
    ],
    'password': [
      { type: 'required', message: 'Password es requerido' },
      { type: 'minlength', message: 'Password dede tener la menos 6 caracteres' },
      { type: 'pattern', message: 'Password debe contener una mayuscula, minuscula y un numero' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirmar contraseña es requerido' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Contraseñas no iguales' }
    ],
    'date': [
      { type: 'required', message: 'Fecha es requerida' }
    ],
    'peso': [
      { type: 'required', message: 'Peso es requerido' },
      { type: 'min', message: 'Peso solo contiene valores 30 y 200 kg' },
      { type: 'max', message: 'Peso solo contiene valores 30 y 200 kg' }
    ],
    'altura': [
      { type: 'required', message: 'Altura es requerido' },
      { type: 'min', message: 'Altura solo contiene valores 130 y 220 cm' },
      { type: 'max', message: 'Altura solo contiene valores 130 y 220 cm' }
    ],
  };
  constructor(private userService: UsuariosService, public router: Router, private formBuilder: FormBuilder,
    private valService: ValidacionesService, private authService: AuthService,
    public toastController: ToastController, public loadingController: LoadingController,
    private AFauth: AngularFireAuth) {
  }

  ngOnInit() {
    this.matching_passwords_group = this.pass_validation();
    this.regForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
      genero: new FormControl('mujer', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      objetivo: new FormControl('perder peso', Validators.required),
      date: new FormControl('1994-09-21', Validators.required),
      peso: new FormControl('', Validators.compose([
        Validators.required, Validators.min(30), Validators.max(200)
      ])),
      altura: new FormControl('', Validators.compose([
        Validators.required, Validators.min(130), Validators.max(220)
      ])),
    }, (formGroup: FormGroup) => {
      return this.valService.areEqual(formGroup);
    });
  }

  pass_validation() {
    return new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return this.valService.areEqual(formGroup);
    });
  }

  registrar() {
    this.user = this.regForm.value;
    this.presentLoadingWithOptions().then(() => {
      this.userService.registrar(this.user);

    });

  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 2560,
      message: 'Registrando ...',
      translucent: true,
      // cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  



}
