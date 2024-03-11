import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserLogin,LoginResponse
      } 
from '../Models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  authenticate() {
    throw new Error('Method not implemented.');
  }
  
 
  private urlLogin = environment.login
 
  constructor(
    private readonly http: HttpClient,
  ) { }

 

  loginUser(user: UserLogin): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.urlLogin, user)
  }
  
}