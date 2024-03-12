import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Auth } from './auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Modelo } from '../modelo';
import { User } from '../components/users/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : User | undefined
  private url : String = "auth"

  constructor(private cookieService : CookieService, private http: HttpClient, private router: Router) { }

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

  authenticate() : Observable<User> {
    let self = this
    return new Observable<User>(ele => {  
      this.me().subscribe({
        next(data) {
          self.user = data
          ele.next(self.user)
        },
        error() {
          ele.next(undefined)
        },
      }); 
    })
  }

  authorize() : Observable<boolean> {
    let self = this
    return new Observable<boolean>(ele => {  
      this.me().subscribe({
        next(data) {
          self.user = data
          self.soda()
          ele.next(true)
        },
        error() {
          self.deleteTokens()
          ele.next(false)
        },
      }); 
    })
  }

  soda() {
    this.refresh().subscribe(data => {
      this.setTokens(data.data)
    }); 
  }

  setTokens(data : Auth) {
    this.cookieService.set('tokenElter', data.access_token, data.expires_in, '/')
    this.cookieService.set('tokenType', data.token_type, data.expires_in, '/')
  }

  deleteTokens() {
    this.cookieService.delete('tokenElter')
    this.cookieService.delete('tokenType')
  }

  isAuthenticated() : Boolean {
    return this.getToken() != undefined && this.getToken() != '' && this.user != undefined;
  }

  isVerified() : Boolean | undefined {
    return this.user?.verificado;
  }

  isActived() : Boolean | undefined {
    return this.user?.activado;
  }

  getRole() : Number | undefined {
    return this.user?.role
  }
  
  getToken() : String {
    return this.cookieService.get('tokenElter')
  }

  getTokenType() : String {
    return this.cookieService.get('tokenType')
  }
  saveTokenResponse(jwt: string, user: any) {
    if (typeof window !== 'undefined') {
      const userString = JSON.stringify(user);
      localStorage.setItem('user', userString);
      localStorage.setItem('access_token', jwt);
      this.router.navigate(['']);
    }
  }
}
