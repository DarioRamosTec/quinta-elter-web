import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  descripccion : undefined,
  precio: undefined
 }
 errors : PaquetesErrors | undefined
 tries : number = 1
 submitted : boolean = false
 ready : boolean = false
 notfound = false

 constructor(private PaquetesService : PaquetesService, router : Router, authService : AuthService, activatedRoute: ActivatedRoute) {
   super(authService, router)
   let self = this
   PaquetesService.show(activatedRoute.snapshot.params['id']).subscribe({
     next(data) {
       self.paquetes = data.data
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
  this.PaquetesService.store(this.paquetes).subscribe({
    next: (data) => {
      self.router.navigate(['/paquetes'])
    },
    error: (err) => {
      self.errors = err.error.errors
      self.submitted = false
      self.checkStatus(err.status)
    }
  })
 }
}
