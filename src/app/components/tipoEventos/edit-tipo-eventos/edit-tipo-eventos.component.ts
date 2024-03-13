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
  selector: 'app-edit-tipo-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,CreateTitleComponent,LoadingComponent],
  templateUrl: './edit-tipo-eventos.component.html',
  styleUrl: './edit-tipo-eventos.component.css'
})
export class EditTipoEventosComponent  extends AuthComponent{

  tipoEventos: any ={
     nombre : undefined,
     describcion : undefined
  }
  errors: tipoEventosErrors | undefined
  subtmitted: boolean = false
  ready : boolean = false
  tries : number = 1
  notfound = false

  constructor(private tipoEventosService : TipoEventosService,
    router : Router, authService : AuthService, activatedRoute: ActivatedRoute) {
      super(authService, router)
      let self = this
      tipoEventosService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.tipoEventos = data.data
          self.ready = true
        },
        error(err) {
          self.notfound = true
        },
      })
    }
    submit() {
      let self = this;
      this.tries += 1;
      this.subtmitted = true;
      this.tipoEventos.descripcion = this.tipoEventos.descripcion == null ? undefined : this.tipoEventos.descripcion;
      this.tipoEventosService.store(this.tipoEventos).subscribe({
        next(value) {
          self.router.navigate(['/tipo-eventos']);
        },
        error(err) {
          self.errors = err.error.errors;
          self.subtmitted = false;
          self.checkStatus(err.status);
        }
      });
    }
    
}
