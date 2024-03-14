import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelo } from '../../modelo';
import { environment } from '../../../environments/environment.development';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url : String = "auth/clientes"

  constructor(private http: HttpClient) { }

  index() : Observable<Modelo<Cliente[]>> {
    return this.http.get<Modelo<Cliente[]>>(environment.apiUrl + this.url);
  }

  destroy(id : Number) : Observable<Modelo<Object>> {
    return this.http.delete<Modelo<Object>>(environment.apiUrl + this.url + '/' + id);
  }

  store(data: Cliente) : Observable<Modelo<Cliente>> {
    return this.http.post<Modelo<Cliente>>(environment.apiUrl + this.url, data);
  }

  update(data: Cliente, id : Number) : Observable<Modelo<Cliente>> {
    return this.http.put<Modelo<Cliente>>(environment.apiUrl + this.url + '/' + id, data);
  }

  show(id: number) : Observable<Modelo<Cliente>> {
    return this.http.get<Modelo<Cliente>>(environment.apiUrl + this.url + '/' + id);
  }
}
