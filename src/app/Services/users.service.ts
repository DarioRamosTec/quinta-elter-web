import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserLogin,LoginResponse, codigoVerificacion,
 User, UserRegister
      } 
from '../Models/user.model';
import { Auth } from '../auth/auth';
import { Modelo } from '../modelo';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  authenticate() {
    throw new Error('Method not implemented.');
  }
  
 
  private urlLogin = environment.apiUrl + 'auth/login'
  private urlRegister = environment.apiUrl + 'register'
  private urlVerify = environment.apiUrl + 'auth/verify-code'
 
  constructor(
    private readonly http: HttpClient,
  ) { }

 

  loginUser(user: UserLogin): Observable<Modelo<Auth>>{
    return this.http.post<Modelo<Auth>>(this.urlLogin, user)
  }

  registerUser(user: UserRegister): Observable<UserRegister>{
    return this.http.post<UserRegister>(this.urlRegister, user)
  }

  verifyCode(code: string ): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.urlVerify, { verification_code : code })
  }

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}