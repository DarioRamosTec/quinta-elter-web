import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SseService {
  url: string = "auth";
  ready: boolean = false;

  constructor(private authService: AuthService) { }

  getServerSentEvent(): Observable<MessageEvent> {
    const authToken = this.authService.getToken();
    const url = new URL(environment.apiUrl + this.url + '/sendEventssss'+ authToken);
    // if (authToken) {
    //   url.searchParams.append('token', authToken);
    // }

    return new Observable(observer => {
      const eventSource = new EventSource(url.toString());

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