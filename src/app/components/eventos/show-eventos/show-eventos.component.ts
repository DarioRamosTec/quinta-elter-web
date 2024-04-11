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
import { ServiciosService } from '../../../Services/Servicios.service';
import { Servicios } from '../../../Models/Servicios.model';
import { EventoServicio } from '../../eventoServicios/evento-servicio';
import { EventoServiciosService } from '../../eventoServicios/evento-servicios.service';
import { Pagination } from '../../../Models/pagination';
import { PageSliderComponent } from '../../../utilities/page-slider/page-slider.component';

@Component({
  selector: 'app-show-eventos',
  standalone: true,
  imports: [PageSliderComponent, DatePipe, SidebarComponent, IndextableComponent, RouterLink, NgIf, NgFor, LoadingComponent, FormsModule, CreateTitleComponent],
  templateUrl: './show-eventos.component.html',
  styleUrl: './show-eventos.component.css'
})
export class ShowEventosComponent extends AuthComponent {
  record : Evento | undefined
  notfound = false
  routeTo: string = '/eventos'
  errors: any | undefined = undefined
  tries = 0
  submiting = false
  id: number | undefined

  paquetes: Paquetes[] | undefined
  clientes: Cliente[] | undefined
  fechas: Fechas[] | undefined
  tipo_pagos: TipoPagos[] | undefined
  estado_eventos: EstadosEventos[] | undefined
  quintas: Quinta[] | undefined
  hora_extras: HorasExtras[] | undefined

  servicios : Servicios[] | undefined 

  pagesEstadoEventos: Pagination<EstadosEventos> | undefined

  constructor(private service : EventosService,
    router : Router, authService : AuthService, protected activatedRoute : ActivatedRoute, paqueteService : PaquetesService, clientesService : ClienteService, fechasService : FechasService,
    tiposPagosService : TipoPagosService, protected estadoEventoService : EstadosEventosService, horasExtrasService : HorasExtrasService,  quintasService : QuintasService,
    protected serviciosService : ServiciosService, protected eventoServicioService : EventoServiciosService) {
      super(authService, router)
      let self = this
      this.id = activatedRoute.snapshot.params['id']

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
      quintasService.index().subscribe(data => {
        this.quintas = data.data
      })
      horasExtrasService.index().subscribe(data => {
        this.hora_extras = data.data
      })
      this.indexEstadoEvento()

      service.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.record = data.data
          self.getServicios()
        },
        error(err) {
          self.notfound = true
        },
      })
    }

    indexEstadoEvento(page : number | undefined = undefined) {
      let self = this
      this.estadoEventoService.indexPage(page).subscribe({
        next(data){
          self.pagesEstadoEventos = data.data
          self.estado_eventos = data.data.data
        },
        error(err){
          self.checkStatus(err.status)
        }
      })
    }

    reload() {
     let self = this
     self.service.show(self.activatedRoute.snapshot.params['id']).subscribe({
       next(data) {
         self.record = data.data
         self.getServicios()
       },
       error(err) {
         self.notfound = true
       },
     })
    }
 
    getServicios() {
     this.serviciosService.index().subscribe(data => {
       var vals : Servicios[] = []
       var valsiD = []
       if (this.record?.servicios){  
         for(var item of this.record?.servicios) {
           valsiD.push(item.id)
         }
       }
 
       for (var item of data.data) {
         if (!valsiD.includes(item.id)) {
           vals.push(item)
         }
       }
       this.servicios = vals
       this.submiting = false

     })
    }
 
    byeEvento(id: number) {
     if (this.id && !this.submiting) {
       this.submiting = true
       var evento_servicio : EventoServicio = {
        servicio: id,
        evento: this.id
       } 
       this.eventoServicioService.bye(evento_servicio).subscribe(data => {
         this.reload()
       })
     }
    }
 
    addEvento(data : any) {
     if (this.id && data.target.value && !this.submiting) {
       let id = data.target.value
       var eventoServicio : EventoServicio = {
        servicio: id,
        evento: this.id
       }
       this.submiting = true
       this.eventoServicioService.store(eventoServicio).subscribe(data => {
         this.reload()
       })
     }
    }

}
