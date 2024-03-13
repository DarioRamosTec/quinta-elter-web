import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Opiniones} from '../../../Models/opiniones.model'; 
import { OpinionesErrors } from '../opiniones-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { OpinionesService } from '../../../Services/opiniones.service';

@Component({
  selector: 'app-show-opiniones',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './show-opiniones.component.html',
  styleUrl: './show-opiniones.component.css'
})
export class ShowOpinionesComponent extends AuthComponent{
opiniones :Opiniones | undefined
notfound = false
constructor(private OpinionesService : OpinionesService,
  router : Router, authService : AuthService, activatedRoute : ActivatedRoute) {
  super(authService, router)
  let self = this
  this.OpinionesService.show(activatedRoute.snapshot.params['id']).subscribe({
    next(data) {
      self.opiniones = data.data
    },
    error(err) {
      self.notfound = true
    },
  })
  }
}
