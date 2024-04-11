import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthNotComponent } from '../components/auth/auth-not/auth-not.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserLogin } from "../Models/user.model";
import { UsersService } from "../Services/users.service";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../layout/loading/loading.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, LoadingComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  
})

export class LoginFormComponent extends AuthNotComponent {
  
  public email = '';
  public password = '';
  public notfound = false;
  public error = false;
  public passwordVerify = false;
  public submiting = false;
  
  constructor(private loginService: UsersService, authService : AuthService, router: Router) {
    super(authService, router)
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
 
  }
  onSubmit() {
    this.submiting = true;
    this.notfound = false;
    this.error = false;
    this.passwordVerify = false;
    const user: UserLogin = {
      email: this.email || '',
      password: this.password || '',
    };
    let self = this
    this.loginService.loginUser(user).subscribe({
      error(error) {
        if (error.status == 404){
          self.notfound = true;
        } else if(error.status == 401) {
          self.passwordVerify = true;
        } else if(error.status == 403) {
          self.router.navigate(['/activate'])
        } else {
          self.error = true
        }
        self.submiting = false;
      },
      next(value) {
        self.authService.setTokens(value.data)
        //self.verify()
        self.router.navigate(['/CodigoVerificacion'])
      }
    });  
  }
}
