import { Component } from '@angular/core';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoEventosService } from '../../../Services/tipo-eventos.service'; 
import { TipoEventos} from '../../../Models/tipo-eventos_model'; 
import { ServiciosErrors } from '../servicios-errors'; 
import { ServiciosService } from '../../../Services/Servicios.service'; 
import { CommonModule,NgFor, NgIf, } from '@angular/common'; 
import { Modelo } from '../../../modelo';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { Servicios} from '../../../Models/Servicios.model'; 
@Component({
  selector: 'app-show-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,CreateTitleComponent,LoadingComponent],
  templateUrl: './show-servicios.component.html',
  styleUrl: './show-servicios.component.css'
})
export class ShowServiciosComponent extends AuthComponent {
 servicio :Servicios | undefined
 notfound = false

 constructor(private ServiciosService : ServiciosService,
   router : Router, authService : AuthService, activatedRoute: ActivatedRoute) {
     super(authService, router)
     let self = this
     ServiciosService.show(activatedRoute.snapshot.params['id']).subscribe({
       next(data) {
         self.servicio = data.data
       },
       error(err) {
         self.notfound = true
       },
     })
   }
}
