import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Fechas} from '../Models/fechas.models';
import { environment } from '../../environments/environment';
import { Modelo } from '../modelo';
@Injectable({
    providedIn: 'root'
  })
  export class FechasService {
  
    url: string = "auth/fechas"
    ready: boolean = false
  
    constructor(private http: HttpClient) { }
  
    index(): Observable<Modelo<Fechas[]>>{
      return this.http.get<Modelo<Fechas[]>>(environment.apiUrl + this.url);
    }
  
    show(id: number): Observable<Modelo<Fechas>> {
      return this.http.get<Modelo<Fechas>>(environment.apiUrl + this.url + '/' + id);
    }
  
    store(data: Fechas): Observable<Modelo<Fechas>> {
      return this.http.post<Modelo<Fechas>>(environment.apiUrl + this.url,data);
    }

    update(data:Fechas, id: number): Observable<Modelo<Fechas>> {
      return this.http.put<Modelo<Fechas>>(environment.apiUrl + this.url + '/' + id, data);
    }

    destroy(id: number): Observable<Modelo<Fechas>> {
      return this.http.delete<Modelo<Fechas>>(environment.apiUrl + this.url + '/' + id);
    }
  }