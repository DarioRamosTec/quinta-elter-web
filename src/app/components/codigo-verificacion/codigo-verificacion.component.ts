
import { Component, ViewChild } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import {codigoVerificacion} from "../../Models/user.model";
import {UsersService} from "../../Services/users.service";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AuthNotComponent } from '../auth/auth-not/auth-not.component';



@Component({
  selector: 'app-codigo-verificacion',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './codigo-verificacion.component.html',
  styleUrl: './codigo-verificacion.component.css'
})
export class CodigoVerificacionComponent extends AuthNotComponent {
  digit1: string = '';
  digit2: string = '';
  digit3: string = '';
  digit4: string = '';
  digit5: string = '';
  digit6: string = '';

  firstInput: HTMLInputElement | null = null;
    secondInput: HTMLInputElement | null = null;
    thirdInput: HTMLInputElement | null = null;
    fourthInput: HTMLInputElement | null = null;
    fifthInput: HTMLInputElement | null = null;
    sixthInput: HTMLInputElement | null = null;
  public error = false;
  public notfound = false;
  public passwordVerify = false;
  public verificationCodeNotValid = false;
  @ViewChild('verificationForm', { static: false }) verificationForm = NgForm;
  

  constructor(
    private verifyCode: UsersService,
     router: Router,
     authService : AuthService
  ) {
    super(authService, router)
  }

  ngOnInit() {}

  onSubmit() {
    this.notfound = false;
    this.error = false;
    this.passwordVerify = false;
    
    const code = this.digit1 + this.digit2 + this.digit3 + this.digit4 + this.digit5 + this.digit6;
    this.verifyCode.verifyCode(code).subscribe(
      res => {
        this.authService.saveMe(code);
        this.router.navigate(['/home']);
      },
      error => {
        if (code.length === 0) {
          this.verificationCodeNotValid = true;
          return;
        }
        if (error.status == 404) {
          this.notfound = true;
        } else if (error.status == 401) {
          this.passwordVerify = true;
        } else {
          this.error = true;
        }
      }
    );
  }
  moveToNextOrPrev(currentInput: EventTarget | null, nextInput: HTMLInputElement | null, prevInput: HTMLInputElement | null) {
    if (currentInput instanceof HTMLInputElement) {
        if (currentInput.value.length === 1 && nextInput) {
            nextInput.focus();
        } else if (currentInput.value.length === 0 && prevInput) {
            prevInput.focus();
        }
    }
}


}