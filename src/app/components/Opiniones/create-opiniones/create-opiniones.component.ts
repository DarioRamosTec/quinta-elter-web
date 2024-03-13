import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  mostrar :undefined
}

errors : OpinionesErrors | undefined
submitted : boolean = false
tries : number = 0

  constructor(private OpinionesService :OpinionesService,router : Router, authService : AuthService){
    super(authService, router)
  }

  submit(){
    let self = this
    this.OpinionesService.store(this.opiniones).subscribe({
      next(data) {
        self.router.navigate(['/opiniones'])
      },
      error(err) {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      }
    })
  }
}
