import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { RolesService  } from '../roles.service';
import { Role } from '../role';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { RoleErrors } from '../role-errors';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { Title } from '@angular/platform-browser';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-index-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './index-roles.component.html',
  styleUrl: './index-roles.component.css'
})
export class IndexRolesComponent  extends AuthComponent {

  role : Role[] | undefined
  loading : boolean = false

  constructor(
    private rolesService : RolesService,
    authService : AuthService, router : Router) {
    super(authService, router)
    this.index()
    }
  index() {
    let self = this
    this.role = undefined
    this.rolesService.index().subscribe({
      next(data) {
        self.role = data.data
      },
      error(err) {
        self.checkStatus(err.status)
      }
    })
  }

  destroy(id : Number) {
    let self = this
    this.loading = true
    this.rolesService.destroy(id).subscribe({
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
