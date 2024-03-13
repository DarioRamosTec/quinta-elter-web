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
  selector: 'app-edit-fecha',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './edit-fecha.component.html',
  styleUrl: './edit-fecha.component.css'
})
export class EditFechaComponent extends AuthComponent{
  fechas : any  = {
    dia_inicio: undefined,
    dia_final:  undefined,
    costo:  undefined
  }
  errors : FechasErrors | undefined
  submitted : boolean = false
  ready : boolean = false
  tries : number = 1
  notfound = false

  constructor(private FechasService : FechasService,
    router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute) {
      super(authService, router)
      let self = this
      FechasService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.fechas = data.data
          self.ready = true
        },
        error(err) {
          self.notfound = true
        },
      })
    }

    submit(){
      let self = this
      this.tries += 1
      this.submitted = true
      this.FechasService.update(this.fechas, this.activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.router.navigate(['/fechas'])
        },
        error(err) {
          self.errors = err
        },
      })
    }


}
