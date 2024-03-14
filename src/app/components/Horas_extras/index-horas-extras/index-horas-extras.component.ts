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
  selector: 'app-index-horas-extras',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './index-horas-extras.component.html',
  styleUrl: './index-horas-extras.component.css'
})
export class IndexHorasExtrasComponent extends AuthComponent{
horas_extras : HorasExtras[] | undefined
loading : boolean = false

constructor(private HorasExtrasService : HorasExtrasService, 
  authService : AuthService, router : Router) {
  super(authService, router)
  this.index()
  }

  index(){
    let self = this
    this.horas_extras = undefined
    this .HorasExtrasService.index().subscribe({
      next(data) {
        self.horas_extras = data.data
      },
      error(err) {
        self.checkStatus(err.status)
      }
    })
  }
  destroy(id : number) {
    let self = this
    this.loading = true
    this.HorasExtrasService.destroy(id).subscribe({
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
