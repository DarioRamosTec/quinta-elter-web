
import { Component, ViewChild } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import {codigoVerificacion} from "../../Models/user.model";
import {UsersService} from "../../Services/users.service";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-codigo-verificacion',
  standalone: true,
  imports: [ FormsModule, CommonModule, RouterLink],
  templateUrl: './codigo-verificacion.component.html',
  styleUrl: './codigo-verificacion.component.css'
})

export class CodigoVerificacionComponent {
  public verificationCode = '';
  
  public error = false;
  public notfound = false;
  public passwordVerify = false;
  public verificationCodeNotValid = false;
  @ViewChild('verificationForm', { static: false }) verificationForm = NgForm;
  

  constructor(
    private verifyCode: UsersService,
    private router: Router,
    
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.notfound = false;
    this.error = false;
    this.passwordVerify = false;
    const code: codigoVerificacion = {
      verificationCode: this.verificationCode || '',
     
    };
    this.verifyCode.verifyCode(this.verificationCode).subscribe(
      res => {
        this.router.navigate(['/home/login']);
      },
      error => {
        if (this.verificationCode.length === 0) {
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
  moveToNextOrPrev(currentInput: HTMLInputElement, nextInput: HTMLInputElement | null, prevInput: HTMLInputElement | null) {
    if (currentInput.value.length === 1 && nextInput) {
      nextInput.focus();
    } else if (currentInput.value.length === 0 && prevInput) {
      prevInput.focus();
    }
  }

}