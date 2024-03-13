import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-edit-opiniones',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './edit-opiniones.component.html',
  styleUrl: './edit-opiniones.component.css'
})
export class EditOpinionesComponent extends AuthComponent {
  opiniones : any = {
    titulo :undefined,
    descripcion :undefined,
    calificacion :undefined,
    mostrar :undefined
  }
  errors : OpinionesErrors | undefined
  submitted : boolean = false
  ready : boolean = false
  tries : number = 1
  notfound = false
  constructor(private OpinionesService : OpinionesService,router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute) {
    super(authService, router)
    let self = this
    OpinionesService.show(activatedRoute.snapshot.params['id']).subscribe({
      next(data) {
        self.opiniones = data.data
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
    this.OpinionesService.update(this.opiniones, this.activatedRoute.snapshot.params['id']).subscribe({
      next: (data) => {
        self.router.navigate(['/opiniones'])
      },
      error: (err) => {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      },
    })
  }
}
