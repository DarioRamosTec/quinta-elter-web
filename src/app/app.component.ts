import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import * as Pusher from 'pusher-js';
import { WaveConnector } from 'laravel-wave';
import Echo from 'laravel-echo';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'quinta-elter-web';

  ngOnInit(): void {
    initFlowbite();
  }
}
