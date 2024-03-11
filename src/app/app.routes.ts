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

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
        canActivate: [authGuestGuard]
    },
    {
        path: 'caracteristicas',
        component: IndexCaracteristicasComponent,
        title: 'Index Caracteristicas',
        canActivate: [authGuestGuard]
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
        component: NotFoundComponent,
        title: 'Login',
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
        path: '**', 
        component: NotFoundComponent
    }
];
