import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EstadosEventos} from '../Models/estado-eventos.model';
import { environment } from '../../environments/environment';
import { Modelo } from '../modelo';

@Injectable({
    providedIn: 'root'
  })
  export class EstadosEventosService {
  
    url: string = "auth/estado_eventos"
    ready: boolean = false
  
    constructor(private http: HttpClient) { }
  
    index(): Observable<Modelo<EstadosEventos[]>>{
      return this.http.get<Modelo<EstadosEventos[]>>(environment.apiUrl + this.url);
    }
  
    show(id: number): Observable<Modelo<EstadosEventos>> {
      return this.http.get<Modelo<EstadosEventos>>(environment.apiUrl + this.url + '/' + id);
    }
  
    store(data: EstadosEventos): Observable<Modelo<EstadosEventos>> {
      return this.http.post<Modelo<EstadosEventos>>(environment.apiUrl + this.url,data);
    }

    update(data: EstadosEventos, id: number): Observable<Modelo<EstadosEventos>> {
      return this.http.put<Modelo<EstadosEventos>>(environment.apiUrl + this.url + '/' + id, data);
    }

    destroy(id: number): Observable<Modelo<EstadosEventos>> {
      return this.http.delete<Modelo<EstadosEventos>>(environment.apiUrl + this.url + '/' + id);
    }
  }