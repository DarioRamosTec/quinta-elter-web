import { Component } from '@angular/core';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoEventosService } from '../../../Services/tipo-eventos.service'; 
import { TipoEventos} from '../../../Models/tipo-eventos_model'; 
import { tipoEventosErrors } from '../tipo-eventos-errors'; 
import { CommonModule,NgFor, NgIf } from '@angular/common'; 
import { Modelo } from '../../../modelo';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
@Component({
  selector: 'app-index-tipo-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink],
  templateUrl: './index-tipo-eventos.component.html',
  styleUrls: ['./index-tipo-eventos.component.css'] 
})
export class IndexTipoEventosComponent extends AuthComponent {
  tiposEventos: TipoEventos[] | undefined;
  loading: boolean = false;

  constructor(private tipoEventosService: TipoEventosService, authService: AuthService,router: Router) {
    super(authService, router)
    this.index();
  }

  index() {
    let self = this;
    this.tiposEventos = undefined;
    this.tipoEventosService.index().subscribe({
      next: (data) => {
        this.tiposEventos = data.data;
      },
      error: (err) => {
        //self.chechStatus(err.status);
      },
      complete: () => {

      },
    });
  }

  destroy(id: number) {
    this.loading = true;
    let self = this;
    this.tipoEventosService.destroy(id).subscribe({
      next: () => {
        this.loading = false;
        this.index();
      },
      error: (err) => {
        //self.chechStatus(err.status); 
        this.loading = false;
        this.index();
      },
      complete: () => {

      },
    });
  }
}

