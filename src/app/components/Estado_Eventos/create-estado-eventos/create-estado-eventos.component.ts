import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadosEventosService } from '../../../Services/estado-eventos.service'; 
import { EstadosEventos} from '../../../Models/estado-eventos.model'; 
import { EstadoEventosErrors } from '../estado_eventos-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';

@Component({
  selector: 'app-create-estado-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './create-estado-eventos.component.html',
  styleUrl: './create-estado-eventos.component.css'
})
export class CreateEstadoEventosComponent extends AuthComponent {
  estado_eventos : any = {
    nombre : undefined,
    descripcion : undefined

  }
  errors : EstadoEventosErrors | undefined
  submitted : boolean = false
  tries : number = 0

  constructor(private EstadosEventosService : EstadosEventosService,
    router : Router, authService : AuthService) {
      super(authService, router)
    }
  
  submit(){
    let self = this
    this.tries += 1
    this.submitted = true
    this.estado_eventos = this.componentForm.value
    
    this.EstadosEventosService.store(this.estado_eventos).subscribe({
      next(value) {
        self.router.navigate(['/estado_eventos'])
      },
      error(err) {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      },
    })
  }

  componentForm = new FormGroup({
    nombre: new FormControl(this.estado_eventos.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    descripcion: new FormControl(this.estado_eventos.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
  });
}
