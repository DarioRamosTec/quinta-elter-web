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
import { authVerifiedGuard } from './auth/auth-verified.guard';
import { AuthComponent } from './components/auth/auth/auth.component';
import { ActivateComponent } from './auth/activate/activate.component';
import { authActivateGuard } from './auth/auth-activate.guard';
import { authOnlyAdminGuard } from './auth/auth-only-admin.guard';
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
        path: 'tipo-eventos',
        component: CreateTipoEventosComponent,
        title: 'Create Tipo Evento',
        canActivate: [authAdminGuard]
    },
    {
        path: 'users',
        component: NotFoundComponent,
        title: 'Ver Usuarios',
        canActivate: [authOnlyAdminGuard]
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
        path: 'auth',
        component: AuthComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        path:'CodigoVerificacion',
        component: CodigoVerificacionComponent,
        title: 'Codigo Verificacion',
        canActivate: [authVerifiedGuard]
    },
    {
        path: 'register',
        component: RegisterFormComponent,
        title: 'Register',
        canActivate: [authGuard]
    },
    {
        path: 'activate',
        component: ActivateComponent,
        title: 'Activate',
        canActivate: [authGuard]
    },
    { 
        path: '**', 
        component: NotFoundComponent
    }
];
