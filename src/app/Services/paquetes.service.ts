import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paquetes} from '../Models/Paquetes.model';
import { environment } from '../../environments/environment';
import { Modelo } from '../modelo';
@Injectable({
    providedIn: 'root'
  })
  export class PaquetesService {
  
    url: string = "auth/paquetes"
    ready: boolean = false
  
    constructor(private http: HttpClient) { }
  
    index(): Observable<Modelo<Paquetes[]>>{
      return this.http.get<Modelo<Paquetes[]>>(environment.apiUrl + this.url);
    }
  
    show(id: number): Observable<Modelo<Paquetes>> {
      return this.http.get<Modelo<Paquetes>>(environment.apiUrl + this.url + '/' + id);
    }
  
    store(data: Paquetes): Observable<Modelo<Paquetes>> {
      return this.http.post<Modelo<Paquetes>>(environment.apiUrl + this.url,data);
    }

    update(data: Paquetes, id: number): Observable<Modelo<Paquetes>> {
      return this.http.put<Modelo<Paquetes>>(environment.apiUrl + this.url + '/' + id, data);
    }

    destroy(id: number): Observable<Modelo<Paquetes>> {
      return this.http.delete<Modelo<Paquetes>>(environment.apiUrl + this.url + '/' + id);
    }
  }