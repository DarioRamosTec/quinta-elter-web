import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthNotComponent } from '../components/auth/auth-not/auth-not.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent extends AuthNotComponent {
  constructor(authService : AuthService, router: Router) {
    super(authService, router)
  }
}
