import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CaracteristicasService } from '../caracteristicas.service';
import { Caracteristica } from '../caracteristica';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { AuthComponent } from '../../auth/auth/auth.component';

@Component({
  selector: 'app-index-caracteristicas',
  standalone: true,
  imports: [SidebarComponent, IndextableComponent, NgFor, RouterLink, NgIf],
  templateUrl: './index-caracteristicas.component.html',
  styleUrl: './index-caracteristicas.component.css'
})
export class IndexCaracteristicasComponent extends AuthComponent {
  
  caracteristicas : Caracteristica[] | undefined
  loading: Boolean = false

  constructor(private caracteristicasService : CaracteristicasService,
    authService : AuthService, router : Router) {
    super(authService, router)
    this.index()
  }

  index() {
    let self = this
    this.caracteristicas = undefined
    this.caracteristicasService.index().subscribe({
      next(data) {
        self.caracteristicas = data.data
      },
      error(err) {
        self.checkStatus(err.status)
      }})
  }

  destroy(id : Number) {
    let self = this
    this.loading = true
    this.caracteristicasService.destroy(id).subscribe({
      next() {
        self.loading = false
        self.index()
      },
      error(err) {
        self.checkStatus(err.status)
      },
    });
  }

}
