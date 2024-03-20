import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiciosService } from '../../../Services/Servicios.service'; 
import { Servicios} from '../../../Models/Servicios.model'; 
import { ServiciosErrors } from '../servicios-errors'; 
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
@Component({
  selector: 'app-create-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './create-servicios.component.html',
  styleUrl: './create-servicios.component.css'
})
export class CreateServiciosComponent extends AuthComponent {
 servicios : any = {
  nombre : undefined,
  descripcion : undefined
 }
 errors : ServiciosErrors | undefined
 submitted : boolean = false
 tries : number = 0
 constructor(private ServiciosService : ServiciosService, router : Router, authService : AuthService) {
   super(authService, router)
 }
 
 submit(){
   let self = this
   this.tries += 1
   this.submitted = true
   this.servicios.descripcion = this.servicios.descripcion == null ? undefined : this.servicios .descripcion
   this .ServiciosService.store(this.servicios).subscribe({
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
}
