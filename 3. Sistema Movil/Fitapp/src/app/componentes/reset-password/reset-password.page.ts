import { Component, OnInit } from '@angular/core';
// Para validar el formulario
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AuthService} from '../../servicios/auth.service'; // importando servicio para restablecer contraseña

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  // del formulario
  reset_form: FormGroup;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email es requerido' },
      { type: 'pattern', message: 'Ingrese un email válido' }
    ],
  };

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.reset_form = this.createFormGroup();
  }

   // para crear y validar formulario
   createFormGroup() {
    return this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
      });
    }

  // restablecer contraseña
  resetPass() {
    this.authService.reset_password(this.reset_form.value.email);
  }
}
