import { Component } from '@angular/core';

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgFor, NgIf} from "@angular/common";
import { User, UserRegister } from '../Models/user.model';
import { AuthService } from '../auth/auth.service';
import { AuthNotComponent } from '../components/auth/auth-not/auth-not.component';
import { UsersService } from '../Services/users.service';
import { SamePasswordValidator } from '../validators/same-password.directive';
import { LoadingComponent } from '../layout/loading/loading.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, RouterLink, LoadingComponent, NgFor],
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
    confirmar_password: new FormControl('', [Validators.required, SamePasswordValidator('password', 'confirmar_password')]),
  })
  errors: any;
  isSubmitting = false;
  loading = false;

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
      confirmar_password: formValue.confirmar_password || '',
    };
    
    let self = this
    this.regService.registerUser(user).subscribe({
      next(value) {
        self.router.navigate(['/activate']);
        self.isSubmitting = false;
      },
      error(err) {
        self.isSubmitting = false;
        if (err.error.error) {
          self.errors = err.error.error;
        }
      },
    }
    );
  }

}