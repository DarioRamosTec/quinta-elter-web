import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SseService {
  url: string = "auth"
    ready: boolean = false
  

  constructor(private http: HttpClient) { }
  getServerSentEvent(): Observable<MessageEvent> {
    return new Observable(observer => {
      const eventSource = new EventSource(environment.apiUrl + this.url + '/sendEvents');

      eventSource.onmessage = event => {
        observer.next(event);
      };

      eventSource.onerror = error => {
        observer.error(error);
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
