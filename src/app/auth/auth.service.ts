import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Auth } from './auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Modelo } from '../modelo';
import { User } from '../components/users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated : Boolean = true // false
  private verified : Boolean = true // false
  private activated : Boolean = true // false
  private role : Number = 1 // 0
  
  private url : String = "auth"

  constructor(private cookieService : CookieService, private http: HttpClient) { }

  getToken() : String {
    return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTcxMDEzODMyNSwiZXhwIjoxNzEwMTQxOTI1LCJuYmYiOjE3MTAxMzgzMjUsImp0aSI6InJhek5zV00wVzdKSnlCNHUiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Q_p-SC9wvn5QghL7M4P3ALsyhAfH6FomnHbqqjJAB4M" // this.cookieService.get('tokenElter')
  }

  getTokenType() : String {
    return "bearer" // this.cookieService.get('tokenType')
  }

  login() : Observable<Modelo<Auth>> {
    return this.http.get<Modelo<Auth>>(environment.apiUrl + this.url + '/login');
  }

  refresh() : Observable<Modelo<Auth>> {
    return this.http.get<Modelo<Auth>>(environment.apiUrl + this.url + '/refresh');
  }

  logout() : Observable<Modelo<Auth>> {
    return this.http.get<Modelo<Auth>>(environment.apiUrl + this.url + '/logout');
  }

  me() : Observable<User> {
    return this.http.get<User>(environment.apiUrl + this.url + '/me');
  }

  isAuthenticated() : Boolean {
    return this.authenticated;
  }

  isVerified() : Boolean {
    return this.verified;
  }

  isActived() : Boolean {
    return this.activated;
  }

  getRole() : Number | undefined {
    return this.role
  }

}
