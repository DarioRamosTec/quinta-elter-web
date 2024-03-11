import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, RouterLink, NavbarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
