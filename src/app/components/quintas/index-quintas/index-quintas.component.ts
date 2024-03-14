import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { NgFor, NgIf } from '@angular/common';
import { Quinta } from '../quinta';
import { QuintasService } from '../quintas.service';


@Component({
  selector: 'app-index-quintas',
  standalone: true,
  imports: [SidebarComponent, IndextableComponent, RouterLink, NgIf, NgFor],
  templateUrl: './index-quintas.component.html',
  styleUrl: './index-quintas.component.css'
})
export class IndexQuintasComponent extends AuthComponent {
  
  collection : Quinta[] | undefined
  loading: Boolean = false
  title: string = 'Quintas'

  constructor(private service : QuintasService,
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
