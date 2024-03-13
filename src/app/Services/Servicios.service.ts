import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicios} from '../Models/Servicios.model';
import { environment } from '../../environments/environment';
import { Modelo } from '../modelo';
import { Caracteristica } from '../components/caracteristicas/caracteristica';

@Injectable({
    providedIn: 'root'
})
export class ServiciosService {

    url: string = "auth/servicios";
  
    constructor(private http: HttpClient) { }
  
    index(): Observable<Modelo<Servicios[]>>{
      return this.http.get<Modelo<Servicios[]>>(environment.apiUrl + this.url);
    }
  
    show(id: number): Observable<Modelo<Servicios>> {
      return this.http.get<Modelo<Servicios>>(environment.apiUrl + this.url + '/' + id);
    }
  
    store(data: Servicios): Observable<Modelo<Servicios>> {
      return this.http.post<Modelo<Servicios>>(environment.apiUrl + this.url,data);
    }

    update(data: Servicios, id: number): Observable<Modelo<Servicios>> {
      return this.http.put<Modelo<Servicios>>(environment.apiUrl + this.url + '/' + id, data);
    }
    
    destroy(id: number): Observable<Modelo<Servicios>> {
      return this.http.delete<Modelo<Servicios>>(environment.apiUrl + this.url + '/' + id);
    }
  }