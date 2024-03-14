import { Injectable } from '@angular/core';
import { Quinta } from './quinta';
import { Modelo } from '../../modelo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuintasService {

  url : String = "auth/quintas"

  constructor(private http: HttpClient) { }

  index() : Observable<Modelo<Quinta[]>> {
    return this.http.get<Modelo<Quinta[]>>(environment.apiUrl + this.url);
  }

  destroy(id : Number) : Observable<Modelo<Object>> {
    return this.http.delete<Modelo<Object>>(environment.apiUrl + this.url + '/' + id);
  }

  store(data: Quinta) : Observable<Modelo<Quinta>> {
    return this.http.post<Modelo<Quinta>>(environment.apiUrl + this.url, data);
  }

  update(data: Quinta, id : Number) : Observable<Modelo<Quinta>> {
    return this.http.put<Modelo<Quinta>>(environment.apiUrl + this.url + '/' + id, data);
  }

  show(id: number) : Observable<Modelo<Quinta>> {
    return this.http.get<Modelo<Quinta>>(environment.apiUrl + this.url + '/' + id);
  }
}
