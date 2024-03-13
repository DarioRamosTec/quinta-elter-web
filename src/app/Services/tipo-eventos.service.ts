import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEventos} from '../Models/tipo-eventos_model';
import { environment } from '../../environments/environment';
import { Modelo } from '../modelo';
import { Caracteristica } from '../components/caracteristicas/caracteristica';

@Injectable({
  providedIn: 'root'
})
export class TipoEventosService {

  url: string = "auth/servicios"
  ready: boolean = false

  constructor(private http: HttpClient) { }

  index(): Observable<Modelo<TipoEventos[]>>{
    return this.http.get<Modelo<TipoEventos[]>>(environment.apiUrl + this.url);
  }

  show(id: number): Observable<Modelo<TipoEventos>> {
    return this.http.get<Modelo<TipoEventos>>(environment.apiUrl + this.url + '/' + id);
  }

  store(data: TipoEventos): Observable<Modelo<TipoEventos>> {
    return this.http.post<Modelo<TipoEventos>>(environment.apiUrl + this.url,data);
  }
  destroy(id: number): Observable<Modelo<TipoEventos>> {
    return this.http.delete<Modelo<TipoEventos>>(environment.apiUrl + this.url + '/' + id);
  }
}

// src/app/Services/tipo-eventos.service.ts