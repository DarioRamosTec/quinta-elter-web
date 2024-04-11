import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelo } from '../../modelo';
import { environment } from '../../../environments/environment.development';
import { Log } from './log';
import { Pagination } from '../../Models/pagination';

@Injectable({
  providedIn: 'root'
})
export class LogsService  {

  url : String = "auth/logs"

  constructor(private http: HttpClient) { }

  index() : Observable<Modelo<Log[]>> {
    return this.http.get<Modelo<Log[]>>(environment.apiUrl + this.url);
  }

  indexPage(page: number = 1) : Observable<Modelo<Pagination<Log>>> {
    return this.http.get<Modelo<Pagination<Log>>>(environment.apiUrl + this.url  + "?page=" + page);
  }

  indexPageUser(page: number = 1, id: number) : Observable<Modelo<Pagination<Log>>> {
    return this.http.get<Modelo<Pagination<Log>>>(environment.apiUrl + this.url  + (id ? '/user/' + id : '') + "?page=" + page);
  }

  show(id: number) : Observable<Modelo<Log>> {
    return this.http.get<Modelo<Log>>(environment.apiUrl + this.url + '/' + id);
  }
}
