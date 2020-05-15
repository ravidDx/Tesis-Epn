import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../share/user.class';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


import { UserolesService } from '../servicios/useroles.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuario: User;
  nombre: string;
  apellido: string;
  /*credenciales*/
  isInvalid: boolean = false;
  isAccessInvalid: boolean = true;
  constructor(private AFauth: AngularFireAuth, private router: Router, public toastController: ToastController,
    private DBFire: AngularFireDatabase, private _userolesService: UserolesService) { }

  // METODO GENERICO DE REGISTRO EN REALTIME DATABASE FIREBASE PARA REDES SOCIALES
  generic_register(usuario: any, user: User) {
    // ingresar en la base de datos realtime con el mismo id del login
    return new Promise((resolve, rejected) => {
      this.DBFire.object('usuarios/' + usuario.uid).set(user = {
        nombre: user.nombre,
        apellido: user.apellido,
        genero: user.genero,
        foto: usuario.photoURL,
        altura: user.altura,
        peso: user.peso,
        date: user.date,
        objetivo: user.objetivo,
        rol: 'no afiliado',
        email: user.email
      }).then(c => { resolve(c); })
        .catch(e => { rejected(e); });
    });
  }

  // REGISTRO EN LA BASE REALTIME UTILIZADO POR EL METODO REGISTRAR PRIMERO POR CORREO Y CONTRASEÑA
  async realtime(user: any, us: User) {
    // ingresar en la base de datos realtime con el mismo id del login
    return this.DBFire.object('usuarios/' + user.user.uid).set(us = {
      nombre: us.nombre,
      apellido: us.apellido,
      genero: us.genero,
      foto: 'assets/video/user.jpg',
      altura: us.altura,
      peso: us.peso,
      date: us.date,
      objetivo: us.objetivo,
      rol: 'no afiliado',
      email: us.email
    }).then(c => { console.log('desde serv: usuario  creado en la bdd'); }) // lo creo correctamente
      .catch(e => { console.log('desde serv: usuario no creado en la bdd'); }); // error en la creacion
  }

  // PARA LOGEARSE EN LA APP MEDIANTE USUARIO Y CONTRASEÑA
  loginFire(email: any, password: any) {
    this.AFauth.auth.signInWithEmailAndPassword(email, password).then(() => {
      console.log('el usuario se ha creado exitosamente'); // ** este es un toast
      this.OKToast();
      /********* */
      let long = 0;
      this._userolesService.getTipoUser()
        .snapshotChanges()
        .subscribe(item => {
          item.forEach(element => {
            long++;
            let data = element.payload.toJSON();
            if (data['email'] == email) {
              console.log(data['rol']);
              this.isAccessInvalid = false;
              localStorage.setItem('rol', data['rol']);
              localStorage.setItem('email', email);
              this.onLoginRedirect();
            }


          });

          if (item.length == long && this.isAccessInvalid == true) {
            let msg = 'No tiene Acceso al sistema';
            //this.toasterService.Error(msg);
            this.isInvalid = false;
            console.log(msg)
          }

        })
      // this.router.navigate(['/tabs/home']);
    });
  }
  // REGISTRO Y LOGIN  DE USUARIOS POR MEDIO DE CORREO Y CONTRASEÑA Y TAMBIEN LO CREA EN BD REALTIME AL MISMO TIEMPO
  registrar(user: any) {
    this.AFauth.auth.createUserWithEmailAndPassword(user.email, user.matching_passwords.password).
      then(auth => { // lo crea en database authentication
        this.realtime(auth, user); // lo crea en database realtime firebase*/
        console.log('se guardó serv autenti', auth);
        this.guardarUserRole(user.email, user.matching_passwords.password);


      }).catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          console.log('Usuario no creado : el email ingresado esta siendo usado por otra cuenta '); // **ese es un toast**
          this.Bad_Toast();
        } else {
          console.log('Usuario no creado : Verifique su conexion a internet '); // **ese es un toast**
          this.Bad1_Toast();
        }
      });
  }
  /*MENSAJES DEL REGISTRO DE NUEVA CUENTA  */
  async OKToast() {
    const toast = await this.toastController.create({
      message: 'El usuario se ha logeado con exitosamente',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }
  async Bad_Toast() {
    const toast = await this.toastController.create({
      message: 'Usuario no creado : el email ingresado esta siendo usado por otra cuenta',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }
  async Bad1_Toast() {
    const toast = await this.toastController.create({
      message: 'Usuario no creado : Verifique su conexion a internet',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }

  // MODIFICAR PERFIL DE USUARIO EN LA BASE DE DATOS REALTIME DE FIREBASE
  async updateUser(user: User) {
    this.AFauth.authState.subscribe(auth => {
      this.DBFire.object('usuarios/' + auth.uid).update(user).then(() => {
        this.upd_ok(); // Se actualizo
      }).catch(() => {
        this.upd_bad(); // hubo error en la actualización
      });
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



  guardarUserRole(emaill: any, pass: any) {

    let userole: any = {
      email: emaill,
      rol: 'no afiliado'
    }
    this._userolesService.newUserRole(userole).subscribe(
      data => {
        console.log(data);
        this.loginFire(emaill, pass);

        // this.refresh(this.deportistaEdit)
      },
      error => {
        console.log(error);

      }

    );

  }

  onLoginRedirect() {
    console.log('onLoginRedirect');
    const rol = localStorage.getItem('rol');

    if (rol === 'Afiliado') {
      console.log('afil');
      //this._router.navigate(['/sadmin/inicio']);
      this.router.navigate(['afiliado/tabs/recetas']);
      //this.router.navigate(['/tabs/home']);
    } else if (rol === 'no afiliado') {
      //this._router.navigate(['/admin/dashboard']);
      this.router.navigate(['/tabs/home']);
      console.log('no afil');
    }

    //this.isInvalid=false;
  }



}
