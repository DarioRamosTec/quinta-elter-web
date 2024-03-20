import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { Router, RouterLink } from '@angular/router';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { EventosErrors } from '../eventos-errors';
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
  selector: 'app-create-eventos',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, FormsModule, SidebarComponent, CreateTitleComponent, ReactiveFormsModule, LoadingComponent],
  templateUrl: './create-eventos.component.html',
  styleUrl: './create-eventos.component.css'
})
export class CreateEventosComponent extends AuthComponent {
  record : any = {
    titulo: undefined,
    descripcion: undefined,
    fecha_comienzo: undefined,
    hora_comienzo: undefined,
    horas_extras: undefined,
    costo_horas_extras: undefined,
    costo_horas: undefined,
    costo_paquete: undefined,
    costo_fecha: undefined,
    discount: undefined,
    costo_pagado: undefined,
    paquete: undefined,
    cliente: undefined,
    fecha: undefined,
    tipo_pago: undefined,
    estado_evento: undefined,
    quinta: undefined,
    hora_extra: undefined,
  }
  errors : EventosErrors | undefined
  submitted : boolean = false
  tries : number = 0
  routeTo: string = '/eventos'

  paquetes: Paquetes[] | undefined
  clientes: Cliente[] | undefined
  fechas: Fechas[] | undefined
  tipo_pagos: TipoPagos[] | undefined
  estado_eventos: EstadosEventos[] | undefined
  quintas: Quinta[] | undefined
  hora_extras: HorasExtras[] | undefined

  constructor(private service : EventosService,
    router : Router, authService : AuthService, paqueteService : PaquetesService, clientesService : ClienteService, fechasService : FechasService,
    tiposPagosService : TipoPagosService, estadoEventoService : EstadosEventosService, horasExtrasService : HorasExtrasService,  quintasService : QuintasService) {
      super(authService, router)
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

  }

  submit() {
    let self = this
    this.tries += 1
    this.submitted = true
    this.record = this.componentForm.value
    
    this.service.store(this.record).subscribe({
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
