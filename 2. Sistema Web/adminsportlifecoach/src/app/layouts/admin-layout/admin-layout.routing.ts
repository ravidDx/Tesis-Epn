import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

/*COMPONENTES ROL ADMIN*/
import { DeportistasComponent } from '../../admin/deportistas/deportistas.component';
import { DeportistaComponent } from '../..//admin/deportista/deportista.component';
import { EjerciciosComponent } from '../..//admin/ejercicios/ejercicios.component';
import { EjercicioComponent } from '../..//admin/ejercicio/ejercicio.component';
import { DietaComponent } from '../..//admin/dieta/dieta.component';
import { DietasComponent } from '../..//admin/dietas/dietas.component';
import { PromocionesComponent } from 'app/admin/promociones/promociones.component';
import { PromocionComponent } from 'app/admin/promocion/promocion.component';
import { CategoriasComponent } from '../../admin/categorias/categorias.component';
import { EstadisticasComponent } from '../../admin/estadisticas/estadisticas.component';
import { RutinasComponent } from '../../admin/rutinas/rutinas.component';
import { RutinaComponent } from '../../admin/rutina/rutina.component';
import { EntrenamientoComponent } from '../../admin/entrenamiento/entrenamiento.component';
import { EntrenamientosComponent } from '../../admin/entrenamientos/entrenamientos.component';


/*COMPONENTES ROL SUPER ADMIN*/
import { SlidersComponent } from '../../super/sliders/sliders.component';
import { AboutComponent } from '../../super/about/about.component';
import { ServicesComponent } from '../../super/services/services.component';
import { PortafolioComponent } from '../../super/portafolio/portafolio.component';
import { PostsComponent } from '../../super/posts/posts.component';
import { ContactoComponent } from '../../super/contacto/contacto.component';
import { CredencialesComponent } from '../../super/credenciales/credenciales.component';


import {RoleGuard} from '../../guards/role-guard.guard';

export const AdminLayoutRoutes: Routes = [
   
    {
             path: 'admin', canActivate:[RoleGuard],data:{role:'admin'},
             children: [ 
                { path: 'dashboard',                component: DashboardComponent},
                { path: 'deportista-list',          component: DeportistasComponent },
                { path: 'deportista-profile/:_id',  component: DeportistaComponent},
                { path: 'ejercicios',               component: EjerciciosComponent},
                { path: 'ejercicio/:_id',           component: EjercicioComponent },
                { path: 'rutinas',                  component: RutinasComponent},
                { path: 'rutina/:_id',              component: RutinaComponent},
                { path: 'entrenamientos',           component: EntrenamientosComponent},
                { path: 'entrenamiento/:_id',       component: EntrenamientoComponent},
                { path: 'dietas',                   component: DietasComponent},
                { path: 'dieta/:_id',               component: DietaComponent },
                { path: 'promociones',              component: PromocionesComponent },
                { path: 'promocion/:_id',           component: PromocionComponent},
                { path: 'user-profile',             component: UserProfileComponent },
                { path: 'table-list',               component: TableListComponent },
                { path: 'typography',               component: TypographyComponent },
                { path: 'icons',                    component: IconsComponent },
                { path: 'maps',                     component: MapsComponent },
                { path: 'notifications',            component: NotificationsComponent },
                { path: 'upgrade',                  component: UpgradeComponent },
                { path: 'categorias',               component: CategoriasComponent },
                { path: 'estadistica/:_id',             component: EstadisticasComponent },
                { path: '**',           redirectTo: 'dashboard'}, 
             ]
    },
    {
             path: 'sadmin', canActivate:[RoleGuard],data:{role:'super'},
             children: [ 
                { path: 'inicio',                   component: SlidersComponent },
                { path: 'about',                    component: AboutComponent },
                { path: 'services',                 component: ServicesComponent },
                { path: 'portafolio',               component: PortafolioComponent },
                { path: 'posts',                    component: PostsComponent},
                { path: 'contacto',                 component: ContactoComponent},
                { path: 'credenciales',             component: CredencialesComponent},
                { path: '**',           redirectTo: 'inicio'}, 

             ]
    }

];

