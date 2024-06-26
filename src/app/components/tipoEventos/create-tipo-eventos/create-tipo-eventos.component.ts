import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoEventosService } from '../../../Services/tipo-eventos.service'; 
import { TipoEventos} from '../../../Models/tipo-eventos_model'; 
import { tipoEventosErrors } from '../tipo-eventos-errors'; 
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
@Component({
  selector: 'app-create-tipo-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './create-tipo-eventos.component.html',
  styleUrl: './create-tipo-eventos.component.css'
})
export class CreateTipoEventosComponent extends AuthComponent {

  tipoEventos :any = {
    nombre:undefined,
    descripcion:undefined
  }

  errors : tipoEventosErrors | undefined
  submitted : boolean = false
  tries : number = 0
  routeTo: string = '/tipo_eventos'

  constructor(private tipoEventosService : TipoEventosService,
    router :Router , authService : AuthService) {
      super(authService, router)
    }

  submit(){
    let self = this
    this.tries += 1
    this.submitted = true
    this.tipoEventos = this.componentForm.value
    this.tipoEventos.descripcion = this.tipoEventos.descripcion == '' ? null : this.tipoEventos.descripcion
    
    this.tipoEventosService.store(this.tipoEventos).subscribe({
      next(value) {
        self.router.navigate(['/tipo_eventos'])
      },
      error(err) {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      },
    })
  }

  componentForm = new FormGroup({
    nombre: new FormControl(this.tipoEventos.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    descripcion: new FormControl(this.tipoEventos.descripcion, [Validators.minLength(10), Validators.maxLength(255)]),
  });
}