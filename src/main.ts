import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as Pusher from 'pusher-js';
import *  as Echo from 'laravel-echo';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
