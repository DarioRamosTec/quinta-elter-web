import { Component } from '@angular/core';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoEventosService } from '../../../Services/tipo-eventos.service'; 
import { TipoEventos} from '../../../Models/tipo-eventos_model'; 
import { ServiciosErrors } from '../servicios-errors'; 
import { ServiciosService } from '../../../Services/Servicios.service'; 
import { CommonModule,NgFor, NgIf, } from '@angular/common'; 
import { Modelo } from '../../../modelo';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { Servicios} from '../../../Models/Servicios.model'; 
import { EventosService } from '../../eventos/eventos.service';
import { Evento } from '../../eventos/evento';
import { EventoServicio } from '../../eventoServicios/evento-servicio';
import { EventoServiciosService } from '../../eventoServicios/evento-servicios.service';

@Component({
  selector: 'app-show-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,CreateTitleComponent,LoadingComponent],
  templateUrl: './show-servicios.component.html',
  styleUrl: './show-servicios.component.css'
})
export class ShowServiciosComponent extends AuthComponent {
 servicio :Servicios | undefined
 notfound = false
 eventos : Evento[] | undefined 
 id: number | undefined
 submiting = false

 constructor(private ServiciosService : ServiciosService,
   router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute, protected eventosService: EventosService,
   protected eventoServicioService : EventoServiciosService) {
     super(authService, router)
     let self = this
     this.id = activatedRoute.snapshot.params['id']

    this.getEventos()
     ServiciosService.show(activatedRoute.snapshot.params['id']).subscribe({
       next(data) {
         self.servicio = data.data
       },
       error(err) {
         self.notfound = true
       },
     })
   }

   reload() {
    let self = this
    self.ServiciosService.show(self.activatedRoute.snapshot.params['id']).subscribe({
      next(data) {
        self.servicio = data.data
        self.getEventos()
      },
      error(err) {
        self.notfound = true
      },
    })
   }

   getEventos() {
    this.eventosService.index().subscribe(data => {
      var vals : Evento[] = []
      var valsiD = []
      if (this.servicio?.eventos){  
        for(var item of this.servicio?.eventos) {
          valsiD.push(item.id)
        }
      }

      for (var item of data.data) {
        if (!valsiD.includes(item.id)) {
          vals.push(item)
        }
      }
      this.eventos = vals
      this.submiting = false
    })
   }

   byeEvento(id: number) {
    if (this.id && !this.submiting) {
      this.submiting = true
      var evento_servicio : EventoServicio = {
        evento: id,
        servicio: this.id
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
        evento: id,
        servicio: this.id
      }
      this.submiting = true
      this.eventoServicioService.store(eventoServicio).subscribe(data => {
        this.reload()
      })
    }
   }
 
}
