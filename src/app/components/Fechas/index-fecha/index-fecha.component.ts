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
  selector: 'app-index-fecha',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './index-fecha.component.html',
  styleUrl: './index-fecha.component.css'
})
export class IndexFechaComponent extends AuthComponent {
fechas : Fechas[] | undefined
loading : boolean = true

constructor(private FechasService : FechasService,
  authService : AuthService, router : Router){
  super(authService, router)
  this.index()
}
index() {
  let self = this
  this.fechas  = undefined
  this.FechasService.index().subscribe({
    next(data){
      self.fechas = data.data
    },
    error(err){
      self.checkStatus(err.status)
    }
  })
}

destroy(id : number) {
  let self = this
  this.loading = true
  this.FechasService.destroy(id).subscribe({
    next() {
      self.loading = false
      self.index()
    },
    error(err) {
      self.checkStatus(err.status)
      self.loading = false
      self.index()
    },
    complete() {
    },
  })
}
}
