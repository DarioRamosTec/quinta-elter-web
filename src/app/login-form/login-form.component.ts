import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthNotComponent } from '../components/auth/auth-not/auth-not.component';
import { Route, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import {UserLogin} from "../Models/user.model";
import {UsersService} from "../Services/users.service";

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ FormsModule, CommonModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  
})

export class LoginFormComponent extends AuthNotComponent {
  
  public email = '';
  public password = '';
  public notfound = false;
  public error = false;
  public passwordVerify = false;
  constructor( 
    private loginService: UsersService,
    private authService: AuthService,
    private router: Router
    ) {
      super(authService, router)
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
 
  }
  onSubmit() {
    this.notfound = false;
    this.error = false;
    this.passwordVerify = false;
    const user: UserLogin = {
      email: this.email || '',
      password: this.password || '',
    };
    this.loginService.loginUser(user).subscribe(
      res => {
        this.authService.saveTokenResponse(res.jwt, res.data)
        this.router.navigate(['/CodigoVerificacion']);
        
        
      },
      error => {
        if (error.status == 404){
          this.notfound = true;
        } else if(error.status == 401) {
          this.passwordVerify = true;
        }else {
          this.error = true
        }
      }
    );  


  }
}
