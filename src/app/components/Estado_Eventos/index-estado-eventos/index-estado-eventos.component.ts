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
  selector: 'app-index-estado-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './index-estado-eventos.component.html',
  styleUrl: './index-estado-eventos.component.css'
})
export class IndexEstadoEventosComponent extends AuthComponent{
estado_eventos : EstadosEventos[] | undefined
loading : boolean = true

constructor(private  EstadosEventosService : EstadosEventosService,
  authService: AuthService , router : Router) {
    super(authService, router)
    this.index()
  }

  index(){
    let self = this
    this.estado_eventos  = undefined
    this.EstadosEventosService.index().subscribe({
      next(data){
        self.estado_eventos = data.data
      },
      error(err){
        self.checkStatus(err.status)
      }
    })
  }

  destroy(id : number){
    let self = this
    this.loading = true
    this.EstadosEventosService.destroy(id).subscribe({
      next(){
        self.loading = false
        self.index()
      },
      error(err){
        self.checkStatus(err.status)
        self.loading = false
        self.index()
      },
      complete(){

      },
    })
  }
}


