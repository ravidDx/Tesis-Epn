import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// importando variable de firebase
import {firebaseConfig} from '../environments/environment';

// importar para servicio restful
import { HttpClientModule } from '@angular/common/http'; 

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';

// importando facebook
import { Facebook } from '@ionic-native/facebook/ngx';

// importando googleplus
import {GooglePlus} from '@ionic-native/google-plus/ngx';

// plugin para escoger imagen en perfil de usuario
import { ImagePicker } from '@ionic-native/image-picker/ngx';

/*services*/
import {EjericicosService} from './servicios/ejericicos.service';
import {StorageService} from './servicios/storage.service';


import { AuthGuardService } from './servicios/auth-guard.service';
import { EntrenamientosPipe } from './afiliado/entrenamientos.pipe';

/*NOTIFICACIONES*/
import { FCM } from '@ionic-native/fcm/ngx';

@NgModule({
  declarations: [AppComponent, EntrenamientosPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule
    // ReactiveFormsModule, FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    AngularFireDatabase,
    ImagePicker,
    EjericicosService,
    StorageService,
    AuthGuardService,FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
