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
  routeTo: string = '/roles'
  routeId: string = ''

  constructor(private rolesService : RolesService,
    router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute) {
    super(authService, router)
    let self = this
    this.routeId = '/' + activatedRoute.snapshot.params['id']

    rolesService.show(activatedRoute.snapshot.params['id']).subscribe({
      next(data) {
        self.role = data.data
        self.set()
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
    this.role = this.componentForm.value

    this .rolesService.update(this.role, this.activatedRoute.snapshot.params['id']).subscribe({
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

  set () {
    this.componentForm = new FormGroup({
      nombre: new FormControl(this.role.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      descripcion: new FormControl(this.role.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    });
  }

  componentForm = new FormGroup({
    nombre: new FormControl(this.role.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    descripcion: new FormControl(this.role.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
  });
}
