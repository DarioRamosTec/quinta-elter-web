import { Component, Injectable, NgModule } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { AuthComponent } from '../../auth/auth/auth.component';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { FormsModule, NgModel } from '@angular/forms';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { User } from '../user';
import { UsersService } from '../users.service';
import { Role } from '../../roles/role';
import { RolesService } from '../../roles/roles.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modelo } from '../../../modelo';
import { Paquetes } from '../../../Models/Paquetes.model';
import { Cliente } from '../../clientes/cliente';
import { Fechas } from '../../../Models/fechas.models';
import { TipoPagos } from '../../../Models/tipo-pagos.model';
import { EstadosEventos } from '../../../Models/estado-eventos.model';
import { HorasExtras } from '../../../Models/horas_extras.model';
import { Quinta } from '../../quintas/quinta';
import { PaquetesService } from '../../../Services/paquetes.service';
import { ClienteService } from '../../clientes/cliente.service';
import { FechasService } from '../../../Services/fechas.service';
import { TipoPagosService } from '../../../Services/tipo-pagos.service';
import { EstadosEventosService } from '../../../Services/estado-eventos.service';
import { HorasExtrasService } from '../../../Services/horas_extras.service';
import { QuintasService } from '../../quintas/quintas.service';



@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, FormsModule, SidebarComponent, CreateTitleComponent, ReactiveFormsModule, LoadingComponent, SidebarComponent, IndextableComponent, RouterLink, NgIf, NgFor, LoadingComponent, FormsModule, CreateTitleComponent],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.css'
})
export class ShowUsersComponent extends AuthComponent {
  record : User | undefined
  notfound = false
  routeTo: string = '/usuarios'
  roles: Role[] | undefined

  constructor(private caracteristicaService : UsersService,
    router : Router, authService : AuthService, activatedRoute : ActivatedRoute, roleService : RolesService) {
      super(authService, router)
      let self = this

      roleService.index().subscribe(data => {
        this.roles = data.data
      })

      caracteristicaService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.record = data.data
        },
        error(err) {
          self.notfound = true
        },
      })
    }
}
