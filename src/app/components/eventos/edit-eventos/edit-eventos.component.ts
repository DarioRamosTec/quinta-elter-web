import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { EventosService } from '../eventos.service';
import { EventosErrors } from '../eventos-errors';
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
import { Pagination } from '../../../Models/pagination';
import { PageSliderComponent } from '../../../utilities/page-slider/page-slider.component';


@Component({
  selector: 'app-edit-eventos',
  standalone: true,
  imports: [DatePipe, RouterLink, NgIf, NgFor, PageSliderComponent, FormsModule, SidebarComponent, CreateTitleComponent, ReactiveFormsModule, LoadingComponent],
  templateUrl: './edit-eventos.component.html',
  styleUrl: './edit-eventos.component.css'
})
export class EditEventosComponent  extends AuthComponent {
  record : any = {
  }
  errors : EventosErrors | undefined
  submitted : boolean = false
  ready : boolean = false
  tries : number = 1
  notfound = false
  routeTo: string = '/eventos'
  routeId: string = ''

  paquetes: Paquetes[] | undefined
  clientes: Cliente[] | undefined
  fechas: Fechas[] | undefined
  tipo_pagos: TipoPagos[] | undefined
  estado_eventos: EstadosEventos[] | undefined
  quintas: Quinta[] | undefined
  hora_extras: HorasExtras[] | undefined

  pagesEstadoEventos: Pagination<EstadosEventos> | undefined

  constructor(private service : EventosService,
    router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute, paqueteService : PaquetesService, clientesService : ClienteService, fechasService : FechasService,
    tiposPagosService : TipoPagosService, protected estadoEventoService : EstadosEventosService, horasExtrasService : HorasExtrasService,  quintasService : QuintasService) {
      super(authService, router)
      let self = this
      this.routeId = '/' + activatedRoute.snapshot.params['id']


      this.indexEstadoEvento()
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

      service.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.record = data.data
          self.set()
          self.ready = true
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

  submit() {
    let self = this
    this.tries += 1
    this.submitted = true
    this.record = this.componentForm.value

    this.service.update(this.record, this.activatedRoute.snapshot.params['id']).subscribe({
      next(value) {
        self.router.navigate([self.routeTo])
      },
      error(err) {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      },
    })
  }

  set () {
    this.componentForm = new FormGroup({
      titulo: new FormControl(this.record.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      descripcion: new FormControl(this.record.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      fecha_comienzo: new FormControl(this.record.fecha_comienzo, [Validators.required]),
      hora_comienzo: new FormControl(this.record.hora_comienzo, [Validators.required]),
      discount: new FormControl(this.record.discount, [Validators.required, Validators.min(0)]),
      costo_pagado: new FormControl(this.record.costo_pagado, [Validators.required, Validators.min(0)]),
      paquete: new FormControl(this.record.paquete, [Validators.required]),
      cliente: new FormControl(this.record.cliente, [Validators.required]),
      fecha: new FormControl(this.record.fecha, [Validators.required]),
      tipo_pago: new FormControl(this.record.tipo_pago, [Validators.required]),
      estado_evento: new FormControl(this.record.estado_evento, [Validators.required]),
      quinta: new FormControl(this.record.quinta, [Validators.required]),
      hora_extra: new FormControl(this.record.hora_extra, [Validators.required]),
    });
  }

  componentForm = new FormGroup({
    titulo: new FormControl(this.record.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    descripcion: new FormControl(this.record.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    fecha_comienzo: new FormControl(this.record.fecha_comienzo, [Validators.required]),
    hora_comienzo: new FormControl(this.record.hora_comienzo, [Validators.required]),
    discount: new FormControl(this.record.discount, [Validators.required, Validators.min(0)]),
    costo_pagado: new FormControl(this.record.costo_pagado, [Validators.required, Validators.min(0)]),
    paquete: new FormControl(this.record.paquete, [Validators.required]),
    cliente: new FormControl(this.record.cliente, [Validators.required]),
    fecha: new FormControl(this.record.fecha, [Validators.required]),
    tipo_pago: new FormControl(this.record.tipo_pago, [Validators.required]),
    estado_evento: new FormControl(this.record.estado_evento, [Validators.required]),
    quinta: new FormControl(this.record.quinta, [Validators.required]),
    hora_extra: new FormControl(this.record.hora_extra, [Validators.required]),
  });

}

