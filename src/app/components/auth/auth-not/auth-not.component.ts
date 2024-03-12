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
  readyToSee : Boolean = false

  constructor(protected authService : AuthService, protected router: Router) {
    this.authorize()
  }

  authorize() {
    let self = this
    this.authService.authorize().subscribe({
      next(data) {
        if (data) {
          self.router.navigate(['home'])
        }
        self.readyToSee = true
      },
      error(err) {
        self.readyToSee = true
      },
    })
  }

}
