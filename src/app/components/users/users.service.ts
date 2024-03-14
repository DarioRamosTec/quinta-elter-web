import { Injectable } from '@angular/core';
import { User } from './user';
import { Modelo } from '../../modelo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url : String = "auth/users"

  constructor(private http: HttpClient) { }

  index() : Observable<Modelo<User[]>> {
    return this.http.get<Modelo<User[]>>(environment.apiUrl + this.url);
  }

  destroy(id : Number) : Observable<Modelo<Object>> {
    return this.http.delete<Modelo<Object>>(environment.apiUrl + this.url + '/' + id);
  }

  store(data: User) : Observable<Modelo<User>> {
    return this.http.post<Modelo<User>>(environment.apiUrl + this.url, data);
  }

  update(data: User, id : Number) : Observable<Modelo<User>> {
    return this.http.put<Modelo<User>>(environment.apiUrl + this.url + '/' + id, data);
  }

  show(id: number) : Observable<Modelo<User>> {
    return this.http.get<Modelo<User>>(environment.apiUrl + this.url + '/' + id);
  }

}
