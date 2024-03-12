import { Component } from '@angular/core';
import { AuthComponent } from '../../auth/auth/auth.component';
import { CaracteristicasErrors } from '../caracteristicas-errors';
import { CaracteristicasService } from '../caracteristicas.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Caracteristica } from '../caracteristica';
import { NgFor, NgIf } from '@angular/common';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-caracteristicas',
  standalone: true,
  imports: [NgIf, SidebarComponent, CreateTitleComponent, LoadingComponent, FormsModule, NgFor, RouterLink],
  templateUrl: './show-caracteristicas.component.html',
  styleUrl: './show-caracteristicas.component.css'
})
export class ShowCaracteristicasComponent extends AuthComponent {
  caracteristica : Caracteristica | undefined

  constructor(private caracteristicaService : CaracteristicasService,
    router : Router, authService : AuthService, activatedRoute : ActivatedRoute) {
      super(authService, router)
      caracteristicaService.show(activatedRoute.snapshot.params['id']).subscribe(data => {
        this.caracteristica = data.data
      })
    }
}
