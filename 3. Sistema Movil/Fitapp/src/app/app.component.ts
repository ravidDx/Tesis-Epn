import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SlidePage } from './componentes/slide/slide.page';
import { LoginPage } from './componentes/login/login.page';
import { timer } from 'rxjs';

import { AuthService } from './servicios/auth.service';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

// para traer usuario de la base realtime
import { AngularFireDatabase } from '@angular/fire/database';

//
import { DeportistasService } from './servicios/deportistas.service';

import { Deportista } from './interfaces/deportista.interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss'],
})
export class AppComponent {

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

  rol:any='';
  email:any='';
  rootPage: any = SlidePage;
  showSplash = true; // <-- show animation
  public usuario: any = {}; // para llenar el usuario en caso que si existir un usuario logeado
  public provFb: Boolean ;
  public provGp: Boolean ;
  public provFi: Boolean ;



  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    public router: Router, private AFauth: AngularFireAuth, private DBFire: AngularFireDatabase,
    private _deportistaService:DeportistasService
  ) {
    
    this.initializeApp();
    // para saber si existe un usuario logeado
    this.AFauth.authState.subscribe(user => {
      // console.log('Estado del usuario', user);
      // this.usuario.uid = user.uid;
      // console.log(this.usuario.uid + 'uid');
      // this.usuario.nombre = user.displayName;
      // console.log(this.usuario.nombre + 'uid');

        if (!user) {
          this.usuario.nombre = 'Nuevo Usuario';
          console.log(this.usuario.nombre);
          this.router.navigate(['/login']);
        } else {

          if (user.providerData[0].providerId === 'facebook.com') {
            console.log('facebook');
            this.provFb = true;
            this.provGp = false;
            this.provFi = false;
          } else if (user.providerData[0].providerId === 'google.com') {
            console.log('gmail');
            this.provGp = true;
            this.provFb = false;
            this.provFi = false;
          } else if (user.providerData[0].providerId === 'password') {
            console.log('firebase');
            this.provFi = true;
            this.provGp = false;
            this.provFb = false;
          }

          // console.log('dentro else app');
          this.router.navigate(['/tabs/home']);
          this.rol = localStorage.getItem('rol');
          this.email = localStorage.getItem('email');

          if(this.rol === 'Afiliado'){
            this.getDeportista();
            // console.log(this.getDeportista());
           
          }else{
            this.DBFire.object('usuarios/' + user.uid).valueChanges().subscribe( us => {
              this.usuario = us;
            });
          }
        }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false);
    });
  }

  logout() {
    this.authService.logout();
  }

  logoutFB() {
    this.authService.logOutOfFacebook();
  }

  logoutGP() {
    this.authService.logOutGooglePlus();
  }


  getDeportista(){
    this._deportistaService.consultarDesportistas()
    .subscribe(
      data=>{

        for(let key$ in data){
          let deportista = data[key$];
          deportista['_id']=key$;

          if(deportista.email === this.email){
            this.deportista = deportista;
            break;
          }
       
        }

        console.log(this.deportista)
      
               
      },
      error=>{
        console.log(error);
      }

    );
  }
}
