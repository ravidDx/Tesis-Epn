import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';



/*FIREBASE */
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';


/*Data Tables*/
import { DataTablesModule } from 'angular-datatables';

//Restfull
import {HttpClientModule} from '@angular/common/http';

/*Rutas*/
import { AppRoutingModule } from './app.routing';

//Services
import {DeportistaService} from './services/deportista.service';
import {AuthService} from './services/auth.service';
import {ToasterService} from './services/toaster.service';

/*Componenentes*/
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeportistasComponent } from './admin/deportistas/deportistas.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ContentComponent } from './pages/content/content.component';
import { SingleComponent } from './pages/single/single.component';
import { HeaderComponent } from './shared/header/header.component';
import { SocialComponent } from './shared/social/social.component';
import { ModalComponent } from './modal/modal.component';
import { SigninComponent } from './auth/signin/signin.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    DataTablesModule,    
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ContentComponent,
    SingleComponent,
    HeaderComponent,
    SocialComponent,
    ModalComponent,
    SigninComponent
  ],
  providers: [AngularFireAuth, AuthService,DeportistaService,ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
