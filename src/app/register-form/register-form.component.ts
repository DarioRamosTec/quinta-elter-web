import { Component } from '@angular/core';

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
// import {UsersService} from "../../Services/users.service";
// import {User} from "../../Models/User.model";
import {Router, RouterLink} from '@angular/router';
// import {AuthService} from "../../Services/auth.service";
import {NgClass, NgIf} from "@angular/common";
// import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf, NgClass, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})

export class RegisterFormComponent {
  public registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  errors: any;
  constructor(
    // private authService: AuthService,
    // private regService: UsersService,
    private router: Router
  ) {}

  // ngOnInit() {
  //   this.authService.isAuthenticated().subscribe(isAuthenticated => {
  //     if (isAuthenticated) {
  //       this.router.navigate(['']);
  //     }
  //   });
  //   console.log(environment.index)
  // }

  public isSubmitting = false;
 
  // onSubmit(){
  //   this.isSubmitting = true;
  //   const formValue = this.registerForm.value;
  //   const user: User = {
  //     name: formValue.name || '',
  //     email: formValue.email || '',
  //     password: formValue.password || '',
  //   };
  //   this.regService.storeUser(user).subscribe(
  //     res => {
  //       this.router.navigate(['/home/login']);
  //       this.isSubmitting = false;
  //     },
  //     err => {
  //       this.isSubmitting = false;
  //       if (err.error.error){
  //         this.errors = err.error.error;
  //       }
  //     }
  //   );
  // }

}
