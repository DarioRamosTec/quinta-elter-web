import { Component } from '@angular/core';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoPagosService} from '../../../Services/tipo-pagos.service'; 
import { TipoPagos } from '../../../Models/tipo-pagos.model'; 
import { tipoPagosErrors } from '../tipo-pagos-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common'; 
import { Modelo } from '../../../modelo';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-show-tipos-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,CreateTitleComponent,LoadingComponent],
  templateUrl: './show-tipos-pagos.component.html',
  styleUrl: './show-tipos-pagos.component.css'
})
export class ShowTiposPagosComponent  extends AuthComponent{
  tipo_pagos :TipoPagos | undefined
  notfound = false

  constructor(private TipoPagosService: TipoPagosService,
    router : Router, authService : AuthService, activatedRoute : ActivatedRoute) {
      super(authService, router)
      let self = this
      TipoPagosService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.tipo_pagos = data.data
        },
        error(err) {
        },
      })
    }
  
}
