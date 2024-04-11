import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js'
import { AuthService } from '../auth/auth.service';
import { WaveConnector } from 'laravel-wave';
import { SseClient } from 'ngx-sse-client';


@Injectable({
  providedIn: 'root'
})
export class SseService {
  url: string = "auth";
  ready: boolean = false;
  funfun: Function | undefined

  constructor(protected authService: AuthService, protected seeService: SseClient) {
  }
  getServerSentEvent(): Observable<MessageEvent> {
    //const authToken = this.authService.getToken();
    const url = new URL(environment.apiUrl + 'ssepost');
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