import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadosEventosService } from '../../../Services/estado-eventos.service'; 
import { EstadosEventos} from '../../../Models/estado-eventos.model'; 
import { OpinionesErrors } from '../opiniones-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { OpinionesService } from '../../../Services/opiniones.service';
import { Title } from '@angular/platform-browser';
import { QuintasService } from '../../quintas/quintas.service';
import { Quinta } from '../../quintas/quinta';
import { Cliente } from '../../clientes/cliente';
import { ClienteService } from '../../clientes/cliente.service';
import { Evento } from '../../eventos/evento';
import { EventosService } from '../../eventos/eventos.service';
@Component({
  selector: 'app-create-opiniones',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './create-opiniones.component.html',
  styleUrl: './create-opiniones.component.css'
})
export class CreateOpinionesComponent extends AuthComponent {
  opiniones : any = {
    titulo:undefined,
    descripcion :undefined,
    calificacion :undefined,
    quinta: undefined
  }

  errors : OpinionesErrors | undefined
  submitted : boolean = false
  tries : number = 0
  routeTo: string = '/opiniones'
  clientes: Cliente[] | undefined
  eventos: Evento[] | undefined

  constructor(private OpinionesService : OpinionesService, router : Router, authService : AuthService,
    clientesService : ClienteService, protected eventosService : EventosService){
    super(authService, router)
    
    clientesService.index().subscribe(data => {
      this.clientes = data.data
    })

  }

  getEventos() {
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

    this.OpinionesService.store(this.opiniones).subscribe({
      next(data) {
        self.router.navigate([self.routeTo])
      },
      error(err) {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      }
    })
  }

  componentForm = new FormGroup({
    titulo: new FormControl(this.opiniones.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    descripcion: new FormControl(this.opiniones.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    calificacion: new FormControl(this.opiniones.calificacion, [Validators.required, Validators.min(0), Validators.max(5)]),
    cliente: new FormControl(this.opiniones.cliente, [Validators.required]),
    evento: new FormControl(this.opiniones.evento, [Validators.required]),
  });
  
}
