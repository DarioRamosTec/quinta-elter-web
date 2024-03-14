import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { UsersService } from '../users.service';
import { RoleErrors } from '../../roles/role-errors';
import { UsersErrors } from '../users-errors';
import { RolesService } from '../../roles/roles.service';
import { Role } from '../../roles/role';

@Component({
  selector: 'app-create-users',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, FormsModule, SidebarComponent, CreateTitleComponent, ReactiveFormsModule, LoadingComponent],
  templateUrl: './create-users.component.html',
  styleUrl: './create-users.component.css'
})
export class CreateUsersComponent extends AuthComponent {
  record : any = {
    nombre: undefined,
    apellido_paterno: undefined,
    apellido_materno: undefined,
    fecha_de_nacimiento: undefined,
    email: undefined,
    telefono: undefined,
    genero: undefined,
  }
  errors : UsersErrors | undefined
  submitted : boolean = false
  tries : number = 0
  routeTo: string = '/usuarios'
  roles: Role[] | undefined

  constructor(private service : UsersService,
    router : Router, authService : AuthService, roleService : RolesService) {
      super(authService, router)

      
      
      roleService.index().subscribe(data => {
        this.roles = data.data
      })
  }

  submit() {
    let self = this
    this.tries += 1
    this.submitted = true
    this.record = this.componentForm.value
    
    this.service.store(this.record).subscribe({
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
    nombre: new FormControl(this.record.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    apellido_paterno: new FormControl(this.record.apellido_paterno, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    apellido_materno: new FormControl(this.record.apellido_materno, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    email: new FormControl(this.record.email, [Validators.required, Validators.email]),
    role: new FormControl(this.record.role, [Validators.required]),
    password: new FormControl(this.record.password, [Validators.required, Validators.minLength(8)]),
  })


}