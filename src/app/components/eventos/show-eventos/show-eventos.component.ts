import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { AuthComponent } from '../../auth/auth/auth.component';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { Evento } from '../evento';
import { EventosService } from '../eventos.service';
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
  selector: 'app-show-eventos',
  standalone: true,
  imports: [DatePipe, SidebarComponent, IndextableComponent, RouterLink, NgIf, NgFor, LoadingComponent, FormsModule, CreateTitleComponent],
  templateUrl: './show-eventos.component.html',
  styleUrl: './show-eventos.component.css'
})
export class ShowEventosComponent extends AuthComponent {
  record : Evento | undefined
  notfound = false
  routeTo: string = '/eventos'
  errors: any
  tries = 0

  paquetes: Paquetes[] | undefined
  clientes: Cliente[] | undefined
  fechas: Fechas[] | undefined
  tipo_pagos: TipoPagos[] | undefined
  estado_eventos: EstadosEventos[] | undefined
  quintas: Quinta[] | undefined
  hora_extras: HorasExtras[] | undefined

  constructor(private service : EventosService,
    router : Router, authService : AuthService, activatedRoute : ActivatedRoute, paqueteService : PaquetesService, clientesService : ClienteService, fechasService : FechasService,
    tiposPagosService : TipoPagosService, estadoEventoService : EstadosEventosService, horasExtrasService : HorasExtrasService,  quintasService : QuintasService) {
      super(authService, router)
      let self = this


      paqueteService.index().subscribe(data => {
        this.paquetes = data.data
      })
      clientesService.index().subscribe(data => {
        this.clientes = data.data
      })
      fechasService.index().subscribe(data => {
        this.fechas = data.data
      })
      tiposPagosService.index().subscribe(data => {
        this.tipo_pagos = data.data
      })
      estadoEventoService.index().subscribe(data => {
        this.estado_eventos = data.data
      })
      quintasService.index().subscribe(data => {
        this.quintas = data.data
      })
      horasExtrasService.index().subscribe(data => {
        this.hora_extras = data.data
      })

      service.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.record = data.data
        },
        error(err) {
          self.notfound = true
        },
      })
    }

}
