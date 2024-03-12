import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(protected authService : AuthService, protected router : Router) {
  }

  logout() {
    let self = this
    this.authService.bye().subscribe(data => {
      if (data) {
        self.router.navigate(['login'], {
          replaceUrl: true
        })
      }
    })
  }
}
