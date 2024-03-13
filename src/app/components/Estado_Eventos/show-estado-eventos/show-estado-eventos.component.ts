import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstadosEventosService } from '../../../Services/estado-eventos.service'; 
import { EstadosEventos} from '../../../Models/estado-eventos.model'; 
import { EstadoEventosErrors } from '../estado_eventos-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
@Component({
  selector: 'app-show-estado-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './show-estado-eventos.component.html',
  styleUrl: './show-estado-eventos.component.css'
})
export class ShowEstadoEventosComponent extends AuthComponent {

  estado_eventos : EstadosEventos | undefined
  notfound : boolean = false

  constructor(private EstadosEventosService : EstadosEventosService,
  router : Router, authService : AuthService, activatedRoute : ActivatedRoute){
    super(authService, router)
    let self = this
    EstadosEventosService.show(activatedRoute.snapshot.params['id']).subscribe({
      next(data) {
        self.estado_eventos = data.data
      },
      error(err) {
        self.notfound = true
      },
    })
  }
}
