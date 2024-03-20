import { Component } from '@angular/core';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
@Component({
  selector: 'app-edit-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,CreateTitleComponent,LoadingComponent],
  templateUrl: './edit-servicios.component.html',
  styleUrl: './edit-servicios.component.css'
})
export class EditServiciosComponent  extends AuthComponent{
   servicios : any = {
     nombre :undefined,
     descripcion : undefined
   }
   errors : ServiciosErrors | undefined
   submitted : boolean = false
   ready : boolean = false
   tries : number = 1
   notfound = false
   routeTo: string = '/servicios'
   routeId: string = ''

  constructor(private ServiciosService : ServiciosService,
    router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute) {
      super(authService, router)
      let self = this
      this.routeId = '/' + activatedRoute.snapshot.params['id']

      ServiciosService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.servicios = data.data
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
    this.servicios = this.componentForm.value

    this.ServiciosService.update(this.servicios, this.activatedRoute.snapshot.params['id']).subscribe({
      next(value) {
        self.router.navigate(['/servicios'])
      },
      error(err) {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      },
    })
  }

  set() {
    this.componentForm = new FormGroup({
     nombre: new FormControl(this.servicios.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
     descripcion: new FormControl(this.servicios.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
     });
  }

  componentForm = new FormGroup({
   nombre: new FormControl(this.servicios.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
   descripcion: new FormControl(this.servicios.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
   });
}
