import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Auth } from './auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Modelo } from '../modelo';
import { User } from '../components/users/user';
import { Router } from '@angular/router';
import { UserLogin } from '../Models/user.model';
import { UsersService } from '../Services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : User | undefined
  private url : String = "auth"
  public verified : Boolean = false

  constructor(private cookieService : CookieService, private http: HttpClient, private router: Router, private usersService : UsersService) { }

  login(data : User) : Observable<Modelo<Auth>> {
    return this.http.post<Modelo<Auth>>(environment.apiUrl + this.url + '/login', data);
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
          self.setRole()
          self.usersService.verifyCode(self.getSave()).subscribe({
            next(value) {
              self.saveMe(self.getSave());
              ele.next(self.user)
            },
            error(err) {
              self.setVerified(false)
              ele.next(undefined)
            },
          })
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
          self.setRole()
          if (!self.verified) {
            self.usersService.verifyCode(self.getSave()).subscribe({
              next(value) {
                self.saveMe(self.getSave());
                ele.next(true)
              },
              error(err) {
                self.setVerified(false)
                ele.next(true)
              },
            })
          }
          ele.next(true)
        },
        error() {
          self.deleteTokens()
          ele.next(false)
        },
      }); 
    })
  }

  bye() : Observable<boolean> {
    let self = this
    return new Observable<boolean>(ele => {   
      this.logout().subscribe({
        next(value) {
          self.deleteTokens()
          self.user = undefined
          self.setRole()
          self.setVerified(false)
          ele.next(true)
        },
        error(err) {
          ele.next(false)
        },
      })
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

  getSave() : string {
    return localStorage.getItem('tokToken') ?? '';
  }

  saveMe(token: string) {
    localStorage.setItem('tokToken', token);
    this.setVerified(true)
  }

  setVerified(data : boolean) {
    if (!data) {
      localStorage.removeItem('tokToken');
    }
    this.verified = data;
  }
  
  isVerified() : Boolean | undefined {
    return this.verified;
  }

  isActived() : Boolean | undefined {
    return this.user?.activado;
  }

  isAuthenticated() : Boolean {
    return this.getToken() != undefined && this.getToken() != '' && this.user != undefined;
  }

  isVerificationData() : Boolean {
    return localStorage.getItem('tokToken') != '' && this.getToken() != undefined && this.getToken() != '' 
    && this.getTokenType() != undefined && this.getTokenType() != '' ;;
  }

  getRole() : string {
    return localStorage.getItem('tokRole') ?? ''
  }

  setRole() {
    if (this.user) {
      localStorage.setItem('tokRole', this.user.role.toString());
    } else {
      localStorage.removeItem('tokRole');
    }
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
