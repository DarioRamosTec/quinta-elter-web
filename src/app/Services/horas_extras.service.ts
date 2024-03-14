import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {HorasExtras} from '../Models/horas_extras.model';
import { environment } from '../../environments/environment';
import { Modelo } from '../modelo';
@Injectable({
    providedIn: 'root'
  })
  export class HorasExtrasService {
  
    url: string = "auth/horas_extras"
    ready: boolean = false
  
    constructor(private http: HttpClient) { }
  
    index(): Observable<Modelo<HorasExtras[]>>{
      return this.http.get<Modelo<HorasExtras[]>>(environment.apiUrl + this.url);
    }
  
    show(id: number): Observable<Modelo<HorasExtras>> {
      return this.http.get<Modelo<HorasExtras>>(environment.apiUrl + this.url + '/' + id);
    }
  
    store(data: HorasExtras): Observable<Modelo<HorasExtras>> {
      return this.http.post<Modelo<HorasExtras>>(environment.apiUrl + this.url,data);
    }

    update(data:HorasExtras, id: number): Observable<Modelo<HorasExtras>> {
      return this.http.put<Modelo<HorasExtras>>(environment.apiUrl + this.url + '/' + id, data);
    }

    destroy(id: number): Observable<Modelo<HorasExtras>> {
      return this.http.delete<Modelo<HorasExtras>>(environment.apiUrl + this.url + '/' + id);
    }
  }