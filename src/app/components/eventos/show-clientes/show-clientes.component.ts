import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Cliente } from '../cliente';
import { ClienteService } from '../eventos.service';
import { AuthService } from '../../../auth/auth.service';
import { AuthComponent } from '../../auth/auth/auth.component';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';

@Component({
  selector: 'app-show-clientes',
  standalone: true,
  imports: [SidebarComponent, IndextableComponent, RouterLink, NgIf, NgFor, LoadingComponent, FormsModule, CreateTitleComponent],
  templateUrl: './show-clientes.component.html',
  styleUrl: './show-clientes.component.css'
})
export class ShowClientesComponent extends AuthComponent {
  record : Cliente | undefined
  notfound = false
  routeTo: string = '/clientes'

  constructor(private service : ClienteService,
    router : Router, authService : AuthService, activatedRoute : ActivatedRoute) {
      super(authService, router)
      let self = this

      service.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.record = data.data
        },
        error(err) {
          self.notfound = true
        },
      })
    }

}
