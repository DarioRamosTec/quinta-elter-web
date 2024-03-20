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
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
@Component({
  selector: 'app-create-paquetes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './create-paquetes.component.html',
  styleUrl: './create-paquetes.component.css'
})
export class CreatePaquetesComponent extends AuthComponent {

  paquetes : any = {
    nombre : undefined,
    descripcion : undefined,
    precio: undefined
  }
  errors : PaquetesErrors | undefined
  sumbitted : boolean = false
  tries : number = 0
  routeTo: string = '/paquetes'

  constructor(private PaquetesService : PaquetesService, router : Router, authService : AuthService) {
    super(authService, router)
  }

  submit(){
    let self = this
    this.tries += 1
    this.sumbitted = true
    this.paquetes = this.componentForm.value

    this.PaquetesService.store(this.paquetes).subscribe({
      next : (data) => {
        self.router.navigate([self.routeTo])
      },
      error : (err) => {
        self.errors = err
        self.tries -= 1
      }
    })
  }

  componentForm = new FormGroup({
    nombre: new FormControl(this.paquetes.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    descripcion: new FormControl(this.paquetes.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
    precio: new FormControl(this.paquetes.precio, [Validators.required, Validators.min(0)]),
  });

}
