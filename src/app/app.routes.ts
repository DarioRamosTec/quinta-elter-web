import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IndexCaracteristicasComponent } from './components/caracteristicas/index-caracteristicas/index-caracteristicas.component';
import { authAdminGuard } from './auth/auth-admin.guard';
import { authUserGuard } from './auth/auth-user.guard';
import { authGuestGuard } from './auth/auth-guest.guard';
import { authGuard } from './auth/auth.guard';
import { authNotGuard } from './auth/auth-not.guard';
import { IndexClientesComponent } from './components/clientes/index-clientes/index-clientes.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { CreateCaracteristicasComponent } from './components/caracteristicas/create-caracteristicas/create-caracteristicas.component';
import { CodigoVerificacionComponent } from './components/codigo-verificacion/codigo-verificacion.component';
import { CreateTipoEventosComponent } from './components/tipoEventos/create-tipo-eventos/create-tipo-eventos.component';
import { ShowCaracteristicasComponent } from './components/caracteristicas/show-caracteristicas/show-caracteristicas.component';
import { EditCaracteristicasComponent } from './components/caracteristicas/edit-caracteristicas/edit-caracteristicas.component';
import { IndexTipoEventosComponent } from './components/tipoEventos/index-tipo-eventos/index-tipo-eventos.component';
import { ShowTipoEventosComponent } from './components/tipoEventos/show-tipo-eventos/show-tipo-eventos.component'
import { EditTipoEventosComponent } from './components/tipoEventos/edit-tipo-eventos/edit-tipo-eventos.component';
import { CreateServiciosComponent } from './components/Servicios/create-servicios/create-servicios.component';
import { IndexServiciosComponent } from './components/Servicios/index-servicios/index-servicios.component';
import { ShowServiciosComponent } from './components/Servicios/show-servicios/show-servicios.component';
import { EditServiciosComponent } from './components/Servicios/edit-servicios/edit-servicios.component';
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
        canActivate: [authGuestGuard]
    }, 
    {
        path: 'home',
        redirectTo: '', 
        pathMatch: 'full'
    },
    {
        path: 'caracteristicas',
        component: IndexCaracteristicasComponent,
        title: 'Ver Caracteristicas',
        canActivate: [authGuestGuard]
    },
    {
        path: 'caracteristicas/create',
        component: CreateCaracteristicasComponent,
        title: 'Crear Caracteristica',
        canActivate: [authAdminGuard]
    },
    {
        path: 'caracteristicas/:id',
        component: ShowCaracteristicasComponent,
        title: 'Mostrar Caracteristica',
        canActivate: [authGuestGuard]
    },
    {
        path: 'caracteristicas/:id/edit',
        component: EditCaracteristicasComponent,
        title: 'Editar Caracteristica',
        canActivate: [authAdminGuard]
    },
    {
        path: 'clientes',
        component: IndexClientesComponent,
        title: 'Index Clientes',
        canActivate: [authGuestGuard]
    },
    {
        path: 'logout',
        component: NotFoundComponent,
        title: 'Logout',
        canActivate: [authNotGuard]
    },
    {
        path: 'login',
        component: LoginFormComponent,
        title: 'Login',
        canActivate: [authGuard]
    },
    {
        path:'CodigoVerificacion',
        component: CodigoVerificacionComponent,
        title: 'Codigo Verificacion',
        canActivate: [authGuard]
    },
    {
        path: 'Register',
        component: RegisterFormComponent,
        title: 'Register',
        canActivate: [authGuard]
    },
    {
        path: 'activate',
        component: NotFoundComponent,
        title: 'Activate',
        canActivate: [authGuard]
    },
    {
        path: 'verificate',
        component: NotFoundComponent,
        title: 'Verificate',
        canActivate: [authGuard]
    },
    {
        path: 'tipo_eventos',
        component: IndexTipoEventosComponent,
        title: 'Create Tipo Evento',
        canActivate: [authAdminGuard]
    },
    {
        path: 'tipo_eventos/:id',
        component: ShowTipoEventosComponent,
        canActivate: [authAdminGuard]
    },
    {
        path: 'tipo_eventos/create',
        component: CreateTipoEventosComponent,
        title: 'Create Tipo Evento',
        canActivate: [authAdminGuard]
    },
    {
        path: 'tipo_eventos/:id/edit',
        component: EditTipoEventosComponent,
        title: 'Edit Tipo Evento',
        canActivate: [authAdminGuard]
    },
    {
        path: 'servicios',
        component: IndexServiciosComponent,
        title: 'Index Servicios',
        canActivate: [authAdminGuard]
    
    },
    {
        path: 'servicios/create',
        component: CreateServiciosComponent,
        title: 'Create Servicio',
        canActivate: [authAdminGuard]
    },
    {
        path: 'servicios/:id',
        component: ShowServiciosComponent,
        canActivate: [authAdminGuard]
    },
    {
        path: 'servicios/:id/edit',
        component: EditServiciosComponent,
        title: 'Edit Servicio',
        canActivate: [authAdminGuard]
    },
    { 
        path: '**', 
        component: NotFoundComponent
    }
];
