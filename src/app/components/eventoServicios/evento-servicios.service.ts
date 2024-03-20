import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modelo } from '../../modelo';
import { environment } from '../../../environments/environment.development';
import { EventoServicio } from './evento-servicio';

@Injectable({
  providedIn: 'root'
})
export class EventoServiciosService  {

  url: string = "auth/evento_servicios";

  constructor(private http: HttpClient) { }

  index(): Observable<Modelo<EventoServicio[]>>{
    return this.http.get<Modelo<EventoServicio[]>>(environment.apiUrl + this.url);
  }

  show(id: number): Observable<Modelo<EventoServicio>> {
    return this.http.get<Modelo<EventoServicio>>(environment.apiUrl + this.url + '/' + id);
  }

  store(data: EventoServicio): Observable<Modelo<EventoServicio>> {
    return this.http.post<Modelo<EventoServicio>>(environment.apiUrl + this.url,data);
  }

  update(data: EventoServicio, id: number): Observable<Modelo<EventoServicio>> {
    return this.http.put<Modelo<EventoServicio>>(environment.apiUrl + this.url + '/' + id, data);
  }
  
  destroy(id: number): Observable<Modelo<EventoServicio>> {
    return this.http.delete<Modelo<EventoServicio>>(environment.apiUrl + this.url + '/' + id);
  }

  bye(data: EventoServicio): Observable<Modelo<EventoServicio>> {
    return this.http.post<Modelo<EventoServicio>>(environment.apiUrl + this.url + '/bye', data);
  }
}