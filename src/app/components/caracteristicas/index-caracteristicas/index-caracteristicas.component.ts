import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CaracteristicasService } from '../caracteristicas.service';
import { Caracteristica } from '../caracteristica';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-index-caracteristicas',
  standalone: true,
  imports: [SidebarComponent, IndextableComponent, NgFor, RouterLink, NgIf],
  templateUrl: './index-caracteristicas.component.html',
  styleUrl: './index-caracteristicas.component.css'
})
export class IndexCaracteristicasComponent {
  
  caracteristicas : Caracteristica[] | undefined
  role : Number = 1
  loading: Boolean = false

  constructor(private caracteristicasService : CaracteristicasService,
    authService : AuthService) {
    this.role = authService.getRole()
    this.index()
  }

  index() {
    this.caracteristicas = undefined
    this.caracteristicasService.index().subscribe(data => {
      this.caracteristicas = data.data
    })
  }

  destroy(id : Number) {
    this.loading = true
    this.caracteristicasService.destroy(id).subscribe(() => {
      this.loading = false
      this.index()
    })
  }

}
