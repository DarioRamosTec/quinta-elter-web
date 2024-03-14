import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HorasExtrasErrors } from '../Horas_extras-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { Title } from '@angular/platform-browser';
import { HorasExtras } from '../../../Models/horas_extras.model';
import { HorasExtrasService } from '../../../Services/horas_extras.service';

@Component({
  selector: 'app-show-horas-extras',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './show-horas-extras.component.html',
  styleUrl: './show-horas-extras.component.css'
})
export class ShowHorasExtrasComponent  extends AuthComponent{

  horas_extras: HorasExtras | undefined
  notfound = false

  constructor(private HorasExtrasService : HorasExtrasService,
    router : Router, authService : AuthService, activatedRoute : ActivatedRoute) {
      super(authService, router)
      let self = this
      HorasExtrasService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.horas_extras = data.data
        },
        error(err) {
          self.notfound = true
        },
      })
    }
}
