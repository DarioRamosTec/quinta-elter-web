import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { AuthComponent } from '../components/auth/auth/auth.component';
import { AuthService } from '../auth/auth.service';
import { WebsocketService } from '../Services/websocket.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RouterOutlet, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends AuthComponent {
  constructor(authService: AuthService, router: Router) {
    super(authService, router)
  }
}
