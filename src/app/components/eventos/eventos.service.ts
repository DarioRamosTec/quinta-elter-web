import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelo } from '../../modelo';
import { environment } from '../../../environments/environment.development';
import { Evento } from './evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  url : String = "auth/eventos"

  constructor(private http: HttpClient) { }

  index() : Observable<Modelo<Evento[]>> {
    return this.http.get<Modelo<Evento[]>>(environment.apiUrl + this.url);
  }

  destroy(id : Number) : Observable<Modelo<Object>> {
    return this.http.delete<Modelo<Object>>(environment.apiUrl + this.url + '/' + id);
  }

  store(data: Evento) : Observable<Modelo<Evento>> {
    return this.http.post<Modelo<Evento>>(environment.apiUrl + this.url, data);
  }

  update(data: Evento, id : Number) : Observable<Modelo<Evento>> {
    return this.http.put<Modelo<Evento>>(environment.apiUrl + this.url + '/' + id, data);
  }

  show(id: number) : Observable<Modelo<Evento>> {
    return this.http.get<Modelo<Evento>>(environment.apiUrl + this.url + '/' + id);
  }
}
