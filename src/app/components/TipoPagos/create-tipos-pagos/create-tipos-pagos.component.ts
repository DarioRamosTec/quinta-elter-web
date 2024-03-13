import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  constructor(private TipoPagosService : TipoPagosService, router : Router, authService : AuthService) {
    super(authService, router)
  }

  submit(){
    let self = this
    this.tries += 1
    this.submitted = true
    this.TipoPagosService.store(this.tipo_pago).subscribe({
      next: (data) => {
        self.router.navigate(['/tipos_pagos'])
      },
      error: (err) => {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      }
    })
  }
}
