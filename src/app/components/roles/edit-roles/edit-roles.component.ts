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
  selector: 'app-edit-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './edit-roles.component.html',
  styleUrl: './edit-roles.component.css'
})
export class EditRolesComponent extends AuthComponent{
  role : any   =  {
    nombre: undefined,
    descripcion: undefined
  }
  errors : RoleErrors | undefined
  submitted : boolean = false
  ready : boolean = false
  tries : number = 1
  notfound = false

  constructor(private rolesService : RolesService,
    router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute) {
      super(authService, router)
      let self = this
      rolesService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.role = data.data
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
      this.role.descripcion = this.role.descripcion == null ? undefined : this.role .descripcion
      this .rolesService.update(this.role, this.activatedRoute.snapshot.params['id']).subscribe({
        next(value) {
          self.router.navigate(['/roles'])
        },
        error(err) {
          self.errors = err.error.errors
          self.submitted = false
          self.checkStatus(err.status)
        },
      })
    }
}
