import { Component } from '@angular/core';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  routeTo: string = '/tipo_pagos'
  routeId: string = ''

  constructor(private TipoPagosService : TipoPagosService,
    router : Router, authService : AuthService, private activatedRoute: ActivatedRoute) {
      super(authService, router)
      let self = this
      this.routeId = '/' + activatedRoute.snapshot.params['id']

      TipoPagosService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.tipo_pagos = data.data
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
      this.tipo_pagos = this.componentForm.value

      this.TipoPagosService.update(this.tipo_pagos, this.activatedRoute.snapshot.params['id']).subscribe({
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

    set() {
      this.componentForm = new FormGroup({
        nombre: new FormControl(this.tipo_pagos.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
        descripcion: new FormControl(this.tipo_pagos.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      });
    }
  
    componentForm = new FormGroup({
      nombre: new FormControl(this.tipo_pagos.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      descripcion: new FormControl(this.tipo_pagos.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    });

}
