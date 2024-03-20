import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpinionesErrors } from '../opiniones-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { OpinionesService } from '../../../Services/opiniones.service';
import { QuintasService } from '../../quintas/quintas.service';
import { Quinta } from '../../quintas/quinta';
import { Cliente } from '../../clientes/cliente';
import { Evento } from '../../eventos/evento';
import { ClienteService } from '../../clientes/cliente.service';
import { EventosService } from '../../eventos/eventos.service';

@Component({
  selector: 'app-edit-opiniones',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './edit-opiniones.component.html',
  styleUrl: './edit-opiniones.component.css'
})
export class EditOpinionesComponent extends AuthComponent {
  opiniones : any = {
    titulo :undefined,
    descripcion :undefined,
    calificacion :undefined,
    quinta :undefined
  }
  errors : OpinionesErrors | undefined
  submitted : boolean = false
  ready : boolean = false
  tries : number = 1
  notfound = false
  clientes: Cliente[] | undefined
  eventos: Evento[] | undefined
  routeTo: string = '/opiniones'
  routeId: string = ''


  constructor(private OpinionesService : OpinionesService,router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute,
    clientesService : ClienteService, protected eventosService : EventosService) {
    super(authService, router)
    let self = this
    this.routeId = '/' + activatedRoute.snapshot.params['id']

    clientesService.index().subscribe(data => {
      this.clientes = data.data
    })

    OpinionesService.show(activatedRoute.snapshot.params['id']).subscribe({
      next(data) {
        self.opiniones = data.data
        self.set()
        self.getEventos()
        self.ready = true
      },
      error(err) {
        self.notfound = true
      },
    })
  }

  getEventos() {
    this.eventosService.index().subscribe(data => {
      var values : Evento[] = []
      for (let item of data.data) {
        if (item.id == this.opiniones?.evento) {
          this.opiniones.cliente = item.cliente
          this.componentForm.get('cliente')?.setValue(item.cliente)
          break
        }
      }

      for (let item of data.data) {
        if (item.cliente == this.opiniones.cliente) {
          values?.push(item)
        }
      }
      this.eventos = values
    })
  }

  getEventosRenew() {
    this.componentForm.get('evento')?.setValue(null)

    this.eventosService.index().subscribe(data => {
      var values : Evento[] = []
      for (let item of data.data) {
        if (item.cliente == this.componentForm.get('cliente')?.value) {
          values?.push(item)
        }
      }
      this.eventos = values
    })
  }

  submit(){
    let self = this
    this.tries += 1
    this.submitted = true
    this.opiniones = this.componentForm.value

    this.OpinionesService.update(this.opiniones, this.activatedRoute.snapshot.params['id']).subscribe({
      next: (data) => {
        self.router.navigate(['/opiniones'])
      },
      error: (err) => {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      },
    })
  }

  set() {
    this.componentForm = new FormGroup({
      titulo: new FormControl(this.opiniones.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      descripcion: new FormControl(this.opiniones.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      calificacion: new FormControl(this.opiniones.calificacion, [Validators.required, Validators.min(0), Validators.max(5)]),
      cliente: new FormControl(this.opiniones.cliente, [Validators.required]),
      evento: new FormControl(this.opiniones.evento, [Validators.required]),
    });
  }

  componentForm = new FormGroup({
    titulo: new FormControl(this.opiniones.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    descripcion: new FormControl(this.opiniones.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    calificacion: new FormControl(this.opiniones.calificacion, [Validators.required, Validators.min(0), Validators.max(5)]),
    cliente: new FormControl(this.opiniones.cliente, [Validators.required]),
    evento: new FormControl(this.opiniones.evento, [Validators.required]),
  });
}
