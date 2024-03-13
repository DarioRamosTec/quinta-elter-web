import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-index-clientes',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './index-clientes.component.html',
  styleUrl: './index-clientes.component.css'
})
export class IndexClientesComponent extends AuthComponent {
  constructor(router : Router, authService : AuthService) {
    super(authService, router)
  }
}
