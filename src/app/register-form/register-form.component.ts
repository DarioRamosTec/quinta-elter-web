import { Component } from '@angular/core';

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../Services/users.service";
import {User} from "../Models/user.model";
import {Router, RouterLink} from '@angular/router';
import {AuthService} from "../Services/auth.service";
import {NgClass, NgIf} from "@angular/common";
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf, NgClass, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})

export class RegisterFormComponent {
  public registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    apellido_paterno: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    apellido_materno: new FormControl('', [Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  errors: any;
  constructor(
    private authService: AuthService,
    private regService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
   
  }

  public isSubmitting = false;
  public registrationSuccess = true;
 
  onSubmit(){
    this.isSubmitting = true;
    const formValue = this.registerForm.value;
    const user: User = {
      nombre: formValue.nombre || '',
      apellido_paterno: formValue.apellido_paterno || '',
      apellido_materno: formValue.apellido_materno || '',
      email: formValue.email || '',
      password: formValue.password || '',
    };
    this.regService.registerUser(user).subscribe(
      res => {
        this.registrationSuccess = true;
        // this.router.navigate(['/login']);
        this.isSubmitting = false;
        this.registerForm.reset(); 
      },
      err => {
        this.isSubmitting = false;
        if (err.error.error){
          this.errors = err.error.error;
        }
      }
    );
  }

}