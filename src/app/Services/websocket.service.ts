import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
 
declare const window: any;

// declare global {
//  interface Window { Echo: Echo | undefined; Pusher: Pusher }
//}


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { 
     //window.Pusher = Pusher
     //window.Echo = Echo
  }

  hear(callback: Function) {
    /*
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: "yeojin_key",
      cluster: "mt1",
      forceTLS: false,
      enabledTransports: ['ws'],
      wsHost: window.location.hostname,
      wsPort: 6001,
      disableStats: true,
      encrypted: true,
    });
    console.log('ecoco')

    window.Echo.channel('channel-log')
    .listen('NuevoLog', (e: any) => {
      console.log('sirveeeeeee')
        console.log(e);
    });
    */

    /*
    var pusher = new Pusher('18c108787e7afba7e65c', {
      cluster: 'us3'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data: any) {
      alert(JSON.stringify(data));
    });
    */

    /*
    var echo = new Echo({
      broadcaster: 'pusher',
      key: '18c108787e7afba7e65c',
      cluster: 'us3'
    });
    echo.channel('my-channel')
      .listen('.my-event', (e: any)=>{
         console.log(e)
      });
      if (!window.Pusher) {

        window.Pusher = new Pusher('18c108787e7afba7e65c', {
          cluster: 'us3'
        });

      }
  

      if (!window.Echo) {
        window.Echo = new Echo({
          broadcaster: 'pusher',
          key: '18c108787e7afba7e65c',
          cluster: 'us3',
          encrypted: true,
          wsHost: window.location.hostname,
          wssPort: 6001,
          wsPort: 6001,
          disableStats: true,
          forceTLS: false,
        });
      }

      window.Echo?.channel('my-channel')
      .listen('.my-event', (e: any) => {
        //callback(e);
        console.log(e)
      });

      */

      let pusher = new Pusher('18c108787e7afba7e65c', {
        cluster: 'us3'
      });

      var channel = pusher.subscribe('new-log')
      channel.bind('log.created', callback)

  }
}