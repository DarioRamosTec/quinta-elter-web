import { Component } from '@angular/core';

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgIf} from "@angular/common";
import { User, UserRegister } from '../Models/user.model';
import { AuthService } from '../auth/auth.service';
import { AuthNotComponent } from '../components/auth/auth-not/auth-not.component';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})

export class RegisterFormComponent extends AuthNotComponent {
  public registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    apellido_paterno: new FormControl('', [Validators.required, Validators.minLength(4)]),
    apellido_materno: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  errors: any;
  isSubmitting = false;

  constructor(authService: AuthService, router: Router, protected regService : UsersService) {
    super(authService, router)
  }
 
  onSubmit(){
    this.isSubmitting = true;
    const formValue = this.registerForm.value;
    const user: UserRegister = {
      nombre: formValue.name || '',
      apellido_paterno: formValue.apellido_paterno || '',
      apellido_materno: formValue.apellido_materno || '',
      email: formValue.email || '',
      password: formValue.password || '',
    };
    
    let self = this
    this.regService.registerUser(user).subscribe({
      next(value) {
        self.router.navigate(['/home/login']);
        self.isSubmitting = false;
      },
      error(err) {
        self.isSubmitting = false;
        if (err.error.error){
          self.errors = err.error.error;
        }
      },
    }
    );
  }

}
