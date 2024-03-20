import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoPagosService} from '../../../Services/tipo-pagos.service'; 
import { TipoPagos } from '../../../Models/tipo-pagos.model'; 
import { tipoPagosErrors } from '../tipo-pagos-errors'; 
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
@Component({
  selector: 'app-create-tipos-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,CreateTitleComponent,LoadingComponent],
  templateUrl: './create-tipos-pagos.component.html',
  styleUrl: './create-tipos-pagos.component.css'
})
export class CreateTiposPagosComponent extends AuthComponent {

  tipo_pago : any = {
    nombre : undefined,
    descripcion : undefined
  }
  errors : tipoPagosErrors | undefined
  submitted : boolean = false
  tries : number = 0
  routeTo: string = '/tipo_pagos'


  constructor(private TipoPagosService : TipoPagosService, router : Router, authService : AuthService) {
    super(authService, router)
  }

  submit(){
    let self = this
    this.tries += 1
    this.submitted = true
    this.tipo_pago = this.componentForm.value

    this.TipoPagosService.store(this.tipo_pago).subscribe({
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

  componentForm = new FormGroup({
    nombre: new FormControl(this.tipo_pago.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    descripcion: new FormControl(this.tipo_pago.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
  });

}
