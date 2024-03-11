import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RouterOutlet, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
