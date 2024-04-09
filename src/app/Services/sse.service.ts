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
  //wave: Wave
  //pusher: Pusher
  //echo: Echo
  funfun: Function | undefined

  constructor(protected authService: AuthService, protected seeService: SseClient) {
    //this.wave = new Wave({
    //  bearerToken: authService.getToken(),
    //} as Options);

    //this.wave.model('Cliente', '1')
    //.notification('team.invite', (notification: any) => {
    //    console.log(notification);
    //})
    //.updated((user: any) => console.log('user updated', user))
    
    //this.pusher = Pusher;

    //this.echo = new Echo({
    //  broadcaster: 'pusher',
    //  key: import.meta.env.VITE_PUSHER_APP_KEY,
    //  wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
    //  wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
    //  wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    //  forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
    //  enabledTransports: ['ws', 'wss'],
    //});

    //console.log(WaveConnector)
    //
    //this.echo = new Echo({ broadcaster: WaveConnector });

  }

  

  getServerSentEvent(): Observable<MessageEvent> {
    const authToken = this.authService.getToken();
    const url = new URL(environment.apiUrl + this.url + '/sendEvents'+ '?token=' + this.authService.getToken());
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