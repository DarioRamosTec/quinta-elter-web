import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelo } from '../../modelo';
import { environment } from '../../../environments/environment.development';
import { Log } from './log';

@Injectable({
  providedIn: 'root'
})
export class LogsService  {

  url : String = "auth/logs"

  constructor(private http: HttpClient) { }

  index() : Observable<Modelo<Log[]>> {
    return this.http.get<Modelo<Log[]>>(environment.apiUrl + this.url);
  }

  show(id: number) : Observable<Modelo<Log>> {
    return this.http.get<Modelo<Log>>(environment.apiUrl + this.url + '/' + id);
  }
}
