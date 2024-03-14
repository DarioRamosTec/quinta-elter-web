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
  selector: 'app-show-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './show-roles.component.html',
  styleUrl: './show-roles.component.css'
})
export class ShowRolesComponent extends AuthComponent {
role : Role | undefined
notfound = false
  constructor(private rolesService : RolesService,
    router : Router, authService : AuthService, activatedRoute : ActivatedRoute) {
      super(authService, router)
      let self = this
      rolesService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.role = data.data
        },
        error(err) {
          self.notfound = true
        },
      })
    }
}
