import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FechasErrors } from '../fechas-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { Title } from '@angular/platform-browser';
import { Fechas } from '../../../Models/fechas.models';
import { FechasService } from '../../../Services/fechas.service';
@Component({
  selector: 'app-show-fecha',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './show-fecha.component.html',
  styleUrl: './show-fecha.component.css'
})
export class ShowFechaComponent extends AuthComponent {
 fechas : Fechas | undefined
 notfound : boolean = false
 constructor(private FechasService : FechasService,
  router : Router, authService : AuthService, activatedRoute : ActivatedRoute) {
    super(authService, router)
    let self = this
    FechasService.show(activatedRoute.snapshot.params['id']).subscribe({
      next(data) {
        self.fechas = data.data
      },
      error(err) {
        self.notfound = true
      },
    })
  }
}
