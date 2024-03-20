import { Component } from '@angular/core';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoEventosService } from '../../../Services/tipo-eventos.service'; 
import { TipoEventos} from '../../../Models/tipo-eventos_model'; 
import { tipoEventosErrors } from '../tipo-eventos-errors'; 
import { CommonModule,NgFor, NgIf, } from '@angular/common'; 
import { Modelo } from '../../../modelo';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-edit-tipo-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,CreateTitleComponent,LoadingComponent],
  templateUrl: './edit-tipo-eventos.component.html',
  styleUrl: './edit-tipo-eventos.component.css'
})
export class EditTipoEventosComponent  extends AuthComponent{

  tipoEventos: any = {
     nombre : undefined,
     descripcion : undefined
  }
  errors: tipoEventosErrors | undefined
  submitted: boolean = false
  ready : boolean = false
  tries : number = 1
  notfound = false
  routeTo: string = '/tipo_eventos'
  routeId: string = ''

  constructor(private tipoEventosService : TipoEventosService,
    router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute) {
      super(authService, router)
      let self = this
      this.routeId = '/' + activatedRoute.snapshot.params['id']

      tipoEventosService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.tipoEventos = data.data
          self.set()
          self.ready = true
        },
        error(err) {
          self.notfound = true
        },
      })
    }
    submit() {
      let self = this;
      this.tries += 1;
      this.submitted = true;
      this.tipoEventos = this.componentForm.value
      this.tipoEventos.descripcion = this.tipoEventos.descripcion == '' ? null : this.tipoEventos.descripcion

      this.tipoEventosService.update(this.tipoEventos, this.activatedRoute.snapshot.params['id']).subscribe({
        next(value) {
          self.router.navigate([self.routeTo]);
        },
        error(err) {
          self.errors = err.error.errors;
          self.submitted = false;
          self.checkStatus(err.status);
        }
      });
    }

    set() {
      this.componentForm = new FormGroup({
       nombre: new FormControl(this.tipoEventos.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
       descripcion: new FormControl(this.tipoEventos.descripcion, [Validators.minLength(10), Validators.maxLength(255)]),
     });
    }
   
    componentForm = new FormGroup({
      nombre: new FormControl(this.tipoEventos.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      descripcion: new FormControl(this.tipoEventos.descripcion, [Validators.minLength(10), Validators.maxLength(255)]),
    });
    
}
