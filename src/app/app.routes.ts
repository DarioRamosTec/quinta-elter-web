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
import { IndexTipoEventosComponent } from './components/tipoEventos/index-tipo-eventos/index-tipo-eventos.component';
import { ShowTipoEventosComponent } from './components/tipoEventos/show-tipo-eventos/show-tipo-eventos.component'
import { EditTipoEventosComponent } from './components/tipoEventos/edit-tipo-eventos/edit-tipo-eventos.component';
import { CreateServiciosComponent } from './components/Servicios/create-servicios/create-servicios.component';
import { IndexServiciosComponent } from './components/Servicios/index-servicios/index-servicios.component';
import { ShowServiciosComponent } from './components/Servicios/show-servicios/show-servicios.component';
import { EditServiciosComponent } from './components/Servicios/edit-servicios/edit-servicios.component';
import { CreateTiposPagosComponent } from './components/TipoPagos/create-tipos-pagos/create-tipos-pagos.component';
import { IndexTiposPagosComponent } from './components/TipoPagos/index-tipos-pagos/index-tipos-pagos.component';
import { ShowTiposPagosComponent } from './components/TipoPagos/show-tipos-pagos/show-tipos-pagos.component';
import { EditTiposPagosComponent } from './components/TipoPagos/edit-tipos-pagos/edit-tipos-pagos.component';
import { EditPaquetesComponent } from './components/Paquetes/edit-paquetes/edit-paquetes.component';
import { ShowPaquetesComponent } from './components/Paquetes/show-paquetes/show-paquetes.component';
import { IndexPaquetesComponent } from './components/Paquetes/index-paquetes/index-paquetes.component';
import { CreatePaquetesComponent } from './components/Paquetes/create-paquetes/create-paquetes.component';
import { EditEstadoEventosComponent } from './components/Estado_Eventos/edit-estado-eventos/edit-estado-eventos.component';
import { ShowEstadoEventosComponent } from './components/Estado_Eventos/show-estado-eventos/show-estado-eventos.component';
import { IndexEstadoEventosComponent } from './components/Estado_Eventos/index-estado-eventos/index-estado-eventos.component';
import { CreateEstadoEventosComponent } from './components/Estado_Eventos/create-estado-eventos/create-estado-eventos.component';
import { EditOpinionesComponent } from './components/Opiniones/edit-opiniones/edit-opiniones.component';
import { ShowOpinionesComponent } from './components/Opiniones/show-opiniones/show-opiniones.component';
import { IndexOpinionesComponent } from './components/Opiniones/index-opiniones/index-opiniones.component';
import { CreateOpinionesComponent } from './components/Opiniones/create-opiniones/create-opiniones.component';
import { EditFechaComponent } from './components/Fechas/edit-fecha/edit-fecha.component';   
import { ShowFechaComponent } from './components/Fechas/show-fecha/show-fecha.component';
import { IndexFechaComponent } from './components/Fechas/index-fecha/index-fecha.component';
import { CreateFechaComponent } from './components/Fechas/create-fecha/create-fecha.component';
import { EditHorasExtrasComponent } from './components/Horas_extras/edit-horas-extras/edit-horas-extras.component';
import { ShowHorasExtrasComponent } from './components/Horas_extras/show-horas-extras/show-horas-extras.component';
import { IndexHorasExtrasComponent } from './components/Horas_extras/index-horas-extras/index-horas-extras.component';
import { CreateHorasExtrasComponent } from './components/Horas_extras/create-horas-extras/create-horas-extras.component';
import { CreateClientesComponent } from './components/clientes/create-clientes/create-clientes.component';
import { EditClientesComponent } from './components/clientes/edit-clientes/edit-clientes.component';
import { ShowClientesComponent } from './components/clientes/show-clientes/show-clientes.component';
import { IndexEventosComponent } from './components/eventos/index-eventos/index-eventos.component';
import { CreateEventosComponent } from './components/eventos/create-eventos/create-eventos.component';
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
        path: 'clientes/create',
        component: CreateClientesComponent,
        title: 'Crear Cliente',
        canActivate: [authAdminGuard]
    },
    {
        path: 'clientes/:id',
        component: ShowClientesComponent,
        title: 'Ver Clientes',
        canActivate: [authGuestGuard]
    },
    {
        path: 'clientes/:id/edit',
        component: EditClientesComponent,
        title: 'Index Clientes',
        canActivate: [authAdminGuard]
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
        path: 'tipo_eventos',
        component: IndexTipoEventosComponent,
        title: 'Index Tipo Evento',
        canActivate: [authGuestGuard]
    },
    {
        path: 'tipo_eventos/create',
        component: CreateTipoEventosComponent,
        title: 'Create Tipo Evento',
        canActivate: [authUserGuard]
    },
    {
        path: 'tipo_eventos/:id',
        component: ShowTipoEventosComponent,
        canActivate: [authGuestGuard]
    },
    {
        path: 'tipo_eventos/:id/edit',
        component: EditTipoEventosComponent,
        title: 'Edit Tipo Evento',
        canActivate: [authUserGuard]
    },
    {
        path: 'servicios',
        component: IndexServiciosComponent,
        title: 'Index Servicios',
        canActivate: [authGuestGuard]
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
        canActivate: [authGuestGuard]
    },
    {
        path: 'servicios/:id/edit',
        component: EditServiciosComponent,
        title: 'Edit Servicio',
        canActivate: [authAdminGuard]
    },
    {
        path: 'tipos_pagos',
        component: IndexTiposPagosComponent,
        title: 'Index Tipos Pagos',
        canActivate: [authGuestGuard]
    },
    {
        path: 'tipos_pagos/create',
        component: CreateTiposPagosComponent,
        title: 'Create Tipo Pago',
        canActivate: [authUserGuard]
    },
    {
        path: 'tipos_pagos/:id',
        component: ShowTiposPagosComponent,
        canActivate: [authGuestGuard]
    },
    {
        path: 'tipos_pagos/:id/edit',
        component: EditTiposPagosComponent,
        title: 'Edit Tipo Pago',
        canActivate: [authUserGuard]
    },
    {
        path: 'paquetes',
        component: IndexPaquetesComponent,
        title: 'Index Paquetes',
        canActivate: [authGuestGuard]
    },
    {
        path: 'paquetes/create',
        component: CreatePaquetesComponent,
        title: 'Create Paquetes',
        canActivate: [authAdminGuard]
    },
    {
        path: 'paquetes/:id',
        component: ShowPaquetesComponent,
        canActivate: [authGuestGuard]
    },
    {
        path: 'paquetes/:id/edit',
        component: EditPaquetesComponent,
        title: 'Edit Paquetes',
        canActivate: [authAdminGuard]
    },
    {
        path: 'estado_eventos',
        component: IndexEstadoEventosComponent,
        title: 'Index Estado Eventos',
        canActivate: [authGuestGuard]
    },
    {
        path: 'estado_eventos/create',
        component: CreateEstadoEventosComponent,
        title: 'Create Estado Eventos',
        canActivate: [authUserGuard]
    },
    {
        path: 'estado_eventos/:id',
        component: ShowEstadoEventosComponent,
        canActivate: [authGuestGuard]
    },
    {
        path: 'estado_eventos/:id/edit',
        component: EditEstadoEventosComponent,
        title: 'Edit Estado Eventos',
        canActivate: [authUserGuard]
    },
    {
        path: 'eventos',
        component: IndexEventosComponent,
        title: 'Index Eventos',
        canActivate: [authGuestGuard]
    },
    {
        path: 'eventos/create',
        component: CreateEventosComponent,
        title: 'Create Eventos',
        canActivate: [authAdminGuard]
    },
    {
        path:'opiniones',
        component: IndexOpinionesComponent,
        title: 'Index Opiniones',
        canActivate: [authGuestGuard]
    },
    {
        path:'opiniones/create',
        component: CreateOpinionesComponent,
        title: 'Create Opiniones',
        canActivate: [authAdminGuard]
    },
    {
        path:'opiniones/:id',
        component: ShowOpinionesComponent,
        canActivate: [authGuestGuard]  
    },
    {
        path:'opiniones/:id/edit',
        component: EditOpinionesComponent,
        title: 'Edit Opiniones',
        canActivate: [authAdminGuard]
    },
    {
        path:'fechas',
        component: IndexFechaComponent,
        title: 'Index Fechas',
        canActivate: [authGuestGuard]
    },
    {
        path:'fechas/create',
        component: CreateFechaComponent,
        title: 'Create Fechas',
        canActivate: [authUserGuard]
    },
    {
        path:'fechas/:id',
        component: ShowFechaComponent,
        canActivate: [authGuestGuard]
    },
    {
        path:'fechas/:id/edit',
        component: EditFechaComponent,
        title: 'Edit Fechas',
        canActivate: [authUserGuard]
    },
    {
        path:'horas_extras',
        component: IndexHorasExtrasComponent,
        title: 'Index Horas Extras',
        canActivate: [authGuestGuard]
    },
    {
        path:'horas_extras/create',
        component: CreateHorasExtrasComponent,
        title: 'Create Horas Extras',
        canActivate: [authUserGuard]
    },
    {
        path:'horas_extras/:id',
        component: ShowHorasExtrasComponent,
        canActivate: [authGuestGuard]
    },
    {
        path:'horas_extras/:id/edit',
        component: EditHorasExtrasComponent,
        title: 'Edit Horas Extras',
        canActivate: [authUserGuard]
    },
    { 
        path: '**', 
        component: NotFoundComponent
    }
];
