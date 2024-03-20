import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaquetesService} from '../../../Services/paquetes.service'; 
import { Paquetes } from '../../../Models/Paquetes.model'; 
import { PaquetesErrors } from '../paquetes.errors'; 
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
@Component({
  selector: 'app-edit-paquetes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './edit-paquetes.component.html',
  styleUrl: './edit-paquetes.component.css'
})
export class EditPaquetesComponent extends AuthComponent {
 paquetes : any = {
  nombre : undefined,
  descripcion : undefined,
  precio: undefined
 }
 errors : PaquetesErrors | undefined
 tries : number = 1
 submitted : boolean = false
 ready : boolean = false
 notfound = false
 routeTo: string = '/paquetes'
 routeId: string = ''

 constructor(private PaquetesService : PaquetesService, router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute) {
   super(authService, router)
   let self = this
   this.routeId = '/' + activatedRoute.snapshot.params['id']

   PaquetesService.show(activatedRoute.snapshot.params['id']).subscribe({
     next(data) {
       self.paquetes = data.data
       self.set()
       self.ready = true
     },
     error(err) {
       self.notfound = true
     },
   })
 }

 
 submit() {
  let self = this
  this.tries += 1
  this.submitted = true
  this.paquetes = this.componentForm.value

  this.PaquetesService.update(this.paquetes, this.activatedRoute.snapshot.params['id']).subscribe({
    next: (data) => {
      self.router.navigate([self.routeTo])
    },
    error: (err) => {
      self.errors = err.error.errors
      self.submitted = false
      self.checkStatus(err.status)
    }
  })
 }

 set () {
   this. componentForm = new FormGroup({
    nombre: new FormControl(this.paquetes.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    descripcion: new FormControl(this.paquetes.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
    precio: new FormControl(this.paquetes.precio, [Validators.required, Validators.min(0)]),
  });
 }

 componentForm = new FormGroup({
   nombre: new FormControl(this.paquetes.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
   descripcion: new FormControl(this.paquetes.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
   precio: new FormControl(this.paquetes.precio, [Validators.required, Validators.min(0)]),
 });

}
