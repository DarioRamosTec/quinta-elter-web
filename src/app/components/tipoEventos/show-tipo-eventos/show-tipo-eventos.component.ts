import { Component } from '@angular/core';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoEventosService } from '../../../Services/tipo-eventos.service'; 
import { TipoEventos} from '../../../Models/tipo-eventos_model'; 
import { tipoEventosErrors } from '../tipo-eventos-errors'; 
import { CommonModule,NgFor, NgIf, } from '@angular/common'; 
import { Modelo } from '../../../modelo';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-show-tipo-eventos',
  standalone: true,
  imports: [NgIf, SidebarComponent, CreateTitleComponent, LoadingComponent, FormsModule, NgFor, RouterLink],
  templateUrl: './show-tipo-eventos.component.html',
  styleUrl: './show-tipo-eventos.component.css'
})
export class ShowTipoEventosComponent extends AuthComponent{

  tiposEventos: TipoEventos | undefined
  notfound = false

  constructor(private tipoEventosService : TipoEventosService,
    router : Router, authService : AuthService, activatedRoute : ActivatedRoute) {
      super(authService, router)
      let self = this
      tipoEventosService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.tiposEventos = data.data
        },
        error(err) {
          self.notfound = true
        },
      })
    }
}
