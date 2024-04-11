import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../users/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  user: User | undefined;

  constructor(protected authService: AuthService, protected router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.user
    //this.authenticate();
  }

  authenticate() {
    this.authService.authenticate().subscribe(data => {
      this.user = data
      if (this.user == undefined) {
        this.router.navigate(['/login'])
      }
    })
  }

  checkStatus(status : number) {
    switch (status) {
      case 401:
        this.authenticate()
      break;
      case 403:
        this.router.navigate(['home'])
      break;
    }
  }

  insideErrors(data : any) {
    let vls : String[] = []
    for (let obj in data) {
      for (let obj_ of data[obj]) {
        vls.push(`${obj}: ${obj_}`)
      }
    }
    return vls
  }

  insideValues(data : any) {
    let vls : String[] = []
    for (let obj in data) {
      vls.push(`${obj}: ${data[obj]}`)
    }
    return vls
  }
}
