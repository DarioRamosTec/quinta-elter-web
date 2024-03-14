import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from './role';
import { Modelo } from '../../modelo';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  url : String = "auth/roles"

  constructor(private http: HttpClient) { }

  index() : Observable<Modelo<Role[]>> {
    return this.http.get<Modelo<Role[]>>(environment.apiUrl + this.url);
  }

  destroy(id : Number) : Observable<Modelo<Object>> {
    return this.http.delete<Modelo<Object>>(environment.apiUrl + this.url + '/' + id);
  }

  store(data: Role) : Observable<Modelo<Role>> {
    return this.http.post<Modelo<Role>>(environment.apiUrl + this.url, data);
  }

  update(data: Role, id : Number) : Observable<Modelo<Role>> {
    return this.http.put<Modelo<Role>>(environment.apiUrl + this.url + '/' + id, data);
  }

  show(id: number) : Observable<Modelo<Role>> {
    return this.http.get<Modelo<Role>>(environment.apiUrl + this.url + '/' + id);
  }
}