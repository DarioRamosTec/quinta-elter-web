import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelo } from '../../modelo';
import { Caracteristica } from './caracteristica';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {

  url : String = "auth/caracteristicas"

  constructor(private http: HttpClient) { }

  index() : Observable<Modelo<Caracteristica[]>> {
    return this.http.get<Modelo<Caracteristica[]>>(environment.apiUrl + this.url);
  }

}
