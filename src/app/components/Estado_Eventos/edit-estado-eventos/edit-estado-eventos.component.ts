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
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';

@Component({
  selector: 'app-edit-estado-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './edit-estado-eventos.component.html',
  styleUrl: './edit-estado-eventos.component.css'
})
export class EditEstadoEventosComponent extends AuthComponent {

  estado_eventos : any ={
    nombre : undefined,
    descripcion : undefined  
  }
  errors : EstadoEventosErrors | undefined
  submitted : boolean = false
  ready : boolean = false
  tries : number = 1
  notfound = false
  routeId : string = ''

  constructor(private EstadosEventosService : EstadosEventosService,
    router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute) {
      super(authService, router)
      let self = this
      this.routeId = '/' + activatedRoute.snapshot.params['id']

      EstadosEventosService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.estado_eventos = data.data
          self.set()
          self.ready = true
        },
        error(err) {
          self.notfound = true
        },
      })
    }
  
    submit(){
      let self = this
      this.tries += 1
      this.submitted = true
      this.estado_eventos = this.componentForm.value

      this.EstadosEventosService.update(this.estado_eventos, this.activatedRoute.snapshot.params['id']).subscribe({
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

    

  set () {
    this.componentForm = new FormGroup({
      nombre: new FormControl(this.estado_eventos.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      descripcion: new FormControl(this.estado_eventos.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    });
  }

  componentForm = new FormGroup({
    nombre: new FormControl(this.estado_eventos.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    descripcion: new FormControl(this.estado_eventos.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
  });
}
