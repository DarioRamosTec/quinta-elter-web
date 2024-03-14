import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { NgFor, NgIf } from '@angular/common';
import { Evento } from '../evento';
import { EventosService } from '../eventos.service';

@Component({
  selector: 'app-index-eventos',
  standalone: true,
  imports: [SidebarComponent, IndextableComponent, RouterLink, NgIf, NgFor],
  templateUrl: './index-eventos.component.html',
  styleUrl: './index-eventos.component.css'
})
export class IndexEventosComponent extends AuthComponent {
  
  collection : Evento[] | undefined
  loading: Boolean = false
  title: string = 'Eventos'

  constructor(private service : EventosService,
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
