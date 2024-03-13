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
  selector: 'app-index-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,CreateTitleComponent,LoadingComponent],
  templateUrl: './index-servicios.component.html',
  styleUrl: './index-servicios.component.css'
})
export class IndexServiciosComponent  extends AuthComponent {
servicio : Servicios[] | undefined;
loading : boolean = true;

  constructor(private ServiciosService : ServiciosService,
    router : Router, authService : AuthService) {
    super(authService, router)
    this.index()
  }
  index() {
    let self = this
    this.servicio = undefined
    this.ServiciosService.index().subscribe({
      next: function (data) {
        self.servicio = data.data
        self.loading= false
      },
      error: function (error) {
        self.loading = false
      }
    })
  }

  destroy(id: number) {
    let self = this;
    this.loading = true;
    this.ServiciosService.destroy(id).subscribe({
      next() {
        self.loading = false;
        self.index();
      },
      error(err) {
        self.checkStatus(err.status);
        self.loading = false;
        self.index();
      },
      complete() {}
    });
  }
}
