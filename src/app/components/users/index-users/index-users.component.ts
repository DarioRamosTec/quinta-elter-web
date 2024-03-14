import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-index-users',
  standalone: true,
  imports: [SidebarComponent, IndextableComponent, RouterLink, NgIf, NgFor],
  templateUrl: './index-users.component.html',
  styleUrl: './index-users.component.css'
})
export class IndexUsersComponent extends AuthComponent {
  
  collection : User[] | undefined
  loading: Boolean = false
  title: string = 'Usuarios'

  constructor(private service : UsersService,
    authService : AuthService, router : Router) {
    super(authService, router)
    this.index()
  }

  index() {
    let self = this
    this.collection = undefined
    this.service.index().subscribe({
      next(data) {
        self.collection = data.data
      },
      error(err) {
        self.checkStatus(err.status)
      }})
  }

  destroy(id : Number) {
    let self = this
    this.loading = true
    this.service.destroy(id).subscribe({
      next() {
        self.loading = false
        self.index()
      },
      error(err) {
        self.checkStatus(err.status)
        self.loading = false
        self.index()
      },
      complete() {
      },
    });
  }
}
