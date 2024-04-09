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
import Echo from 'laravel-echo';
import { WebsocketService } from '../../../Services/websocket.service';

@Component({
  selector: 'app-index-tipos-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,CreateTitleComponent,LoadingComponent],
  templateUrl: './index-tipos-pagos.component.html',
  styleUrl: './index-tipos-pagos.component.css'
})
export class IndexTiposPagosComponent  extends AuthComponent{
tipos_pagos: TipoPagos[] | undefined
loading: boolean = true

constructor(private TiposPagosService: TipoPagosService, authService: AuthService,router: Router,
  protected websocketService : WebsocketService) {
  super(authService, router)
  this.index();
}

index () {
  let self = this
  let tipo_pagos = undefined
  this.TiposPagosService.index().subscribe({
    next: function (data) {
      self.tipos_pagos = data.data
      self.loading = false
    },
    error: function (data) {
      self.loading = false
    }
  })
}

destroy(id : number) {
  let self = this
  this.loading = true
  this.TiposPagosService.destroy(id).subscribe({
    next() {
      self.loading = false
      self.index()
    },
    error(err) {
      self.checkStatus(err.status)
      self.loading = false
      self.index()
    },
    complete() {
    },
    });
  }

}
