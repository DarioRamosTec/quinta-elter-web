import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoPagos} from '../Models/tipo-pagos.model';
import { environment } from '../../environments/environment';
import { Modelo } from '../modelo';
import { Caracteristica } from '../components/caracteristicas/caracteristica';
@Injectable({
    providedIn: 'root'
})
export class TipoPagosService {

    url: string = "auth/tipo_pagos";
  
    constructor(private http: HttpClient) { }
  
    index(): Observable<Modelo<TipoPagos[]>>{
      return this.http.get<Modelo<TipoPagos[]>>(environment.apiUrl + this.url);
    }
  
    show(id: number): Observable<Modelo<TipoPagos>> {
      return this.http.get<Modelo<TipoPagos>>(environment.apiUrl + this.url + '/' + id);
    }
  
    store(data: TipoPagos): Observable<Modelo<TipoPagos>> {
      return this.http.post<Modelo<TipoPagos>>(environment.apiUrl + this.url,data);
    }

    update(data: TipoPagos, id: number): Observable<Modelo<TipoPagos>> {
      return this.http.put<Modelo<TipoPagos>>(environment.apiUrl + this.url + '/' + id, data);
    }

    destroy(id: number): Observable<Modelo<TipoPagos>> {
      return this.http.delete<Modelo<TipoPagos>>(environment.apiUrl + this.url + '/' + id);
    }
  }