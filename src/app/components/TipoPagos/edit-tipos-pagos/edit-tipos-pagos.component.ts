import { Component } from '@angular/core';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoPagosService} from '../../../Services/tipo-pagos.service'; 
import { TipoPagos } from '../../../Models/tipo-pagos.model'; 
import { CommonModule,NgFor, NgIf, } from '@angular/common'; 
import { Modelo } from '../../../modelo';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { tipoPagosErrors } from '../tipo-pagos-errors';
@Component({
  selector: 'app-edit-tipos-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,CreateTitleComponent,LoadingComponent],
  templateUrl: './edit-tipos-pagos.component.html',
  styleUrl: './edit-tipos-pagos.component.css'
})
export class EditTiposPagosComponent extends AuthComponent {

  tipo_pagos : any = {
    nombre : undefined,
    descripcion : undefined
  }

  errors : tipoPagosErrors| undefined
  submitted : boolean = false
  tries : number = 1
  ready : boolean = false
  notfound = false

  constructor(private TipoPagosService : TipoPagosService,
    router : Router, authService : AuthService, private activatedRoute: ActivatedRoute) {
      super(authService, router)
      let self = this
      TipoPagosService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.tipo_pagos = data.data
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
      this.TipoPagosService.update(this.tipo_pagos, this.activatedRoute.snapshot.params['id']).subscribe({
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
