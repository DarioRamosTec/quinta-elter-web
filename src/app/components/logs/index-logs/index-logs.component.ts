import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { NgFor, NgIf } from '@angular/common';
import { Log } from '../log';
import { LogsService } from '../logs.service';

@Component({
  selector: 'app-index-logs',
  standalone: true,
  imports: [SidebarComponent, IndextableComponent, RouterLink, NgIf, NgFor],
  templateUrl: './index-logs.component.html',
  styleUrl: './index-logs.component.css'
})
export class IndexLogsComponent  extends AuthComponent {
  
  collection : Log[] | undefined
  loading: Boolean = false
  title: string = 'Auditoría'

  constructor(private service : LogsService,
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

}
