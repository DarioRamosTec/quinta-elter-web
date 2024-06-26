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
  selector: 'app-create-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './create-roles.component.html',
  styleUrl: './create-roles.component.css'
})
export class CreateRolesComponent  extends AuthComponent{
role : any   =  {
  nombre: undefined,
  descripcion: undefined
}

errors : RoleErrors | undefined
submitted : boolean = false
tries : number = 0
routeTo: string = '/roles'

constructor(private rolesService : RolesService,
  router : Router, authService : AuthService) {
    super(authService, router)
  }

  submit(){
    let self = this
    this.tries += 1
    this.submitted = true
    this.role = this.componentForm.value

    this .rolesService.store(this.role).subscribe({
      next(value) {
        self.router.navigate([self.routeTo])
      },
      error(err) {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      },
    })
  }

  componentForm = new FormGroup({
    nombre: new FormControl(this.role.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    descripcion: new FormControl(this.role.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
  });

}
