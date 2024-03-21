import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {Opiniones} from '../Models/opiniones.model';
import { environment } from '../../environments/environment';
import { Modelo } from '../modelo';
@Injectable({
    providedIn: 'root'
  })
  export class OpinionesService {
  
    url: string = "auth/opiniones"
    ready: boolean = false
  
    constructor(private http: HttpClient) { }
  
    index(): Observable<Modelo<Opiniones[]>>{
      return this.http.get<Modelo<Opiniones[]>>(environment.apiUrl + this.url);
    }

    pollForOpinionesUpdates(intervalTime: number): Observable<Modelo<Opiniones[]>> {
      return interval(intervalTime).pipe(
        switchMap(() => this.index())
      );
    }
    
  
    show(id: number): Observable<Modelo<Opiniones>> {
      return this.http.get<Modelo<Opiniones>>(environment.apiUrl + this.url + '/' + id);
    }
  
    store(data: Opiniones): Observable<Modelo<Opiniones>> {
      return this.http.post<Modelo<Opiniones>>(environment.apiUrl + this.url,data);
    }

    update(data:Opiniones, id: number): Observable<Modelo<Opiniones>> {
      return this.http.put<Modelo<Opiniones>>(environment.apiUrl + this.url + '/' + id, data);
    }

    destroy(id: number): Observable<Modelo<Opiniones>> {
      return this.http.delete<Modelo<Opiniones>>(environment.apiUrl + this.url + '/' + id);
    }

  }