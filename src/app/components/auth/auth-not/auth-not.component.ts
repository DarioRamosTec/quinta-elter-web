import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-not',
  standalone: true,
  imports: [],
  templateUrl: './auth-not.component.html',
  styleUrl: './auth-not.component.css'
})
export class AuthNotComponent {

  constructor(authService : AuthService, router: Router) {
    authService.authorize().subscribe(data => {
      if (data) {
        router.navigate(['home'])
      }
    })
  }
}
