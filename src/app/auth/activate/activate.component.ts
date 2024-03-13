import { Component } from '@angular/core';
import { AuthNotComponent } from '../../components/auth/auth-not/auth-not.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.css'
})
export class ActivateComponent extends AuthNotComponent {
  constructor(authService: AuthService, router: Router) {
    super(authService, router)
  }
}
