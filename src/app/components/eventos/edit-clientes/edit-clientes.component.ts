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
import { ClientesErrors } from '../eventos-errors';
import { ClienteService } from '../eventos.service';


@Component({
  selector: 'app-edit-clientes',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, FormsModule, SidebarComponent, CreateTitleComponent, ReactiveFormsModule, LoadingComponent],
  templateUrl: './edit-clientes.component.html',
  styleUrl: './edit-clientes.component.css'
})
export class EditClientesComponent  extends AuthComponent {
  record : any = {
    nombre: undefined,
    apellido_paterno: undefined,
    apellido_materno: undefined,
    fecha_de_nacimiento: undefined,
    email: undefined,
    telefono: undefined,
    genero: undefined,
  }
  errors : ClientesErrors | undefined
  submitted : boolean = false
  ready : boolean = false
  tries : number = 1
  notfound = false
  routeTo: string = '/clientes'
  routeId: string = ''

  constructor(private service : ClienteService,
    router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute) {
      super(authService, router)
      let self = this
      this.routeId = '/' + activatedRoute.snapshot.params['id']
      service.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.record = data.data
          self.set()
          self.ready = true
        },
        error(err) {
          self.notfound = true
        },
      })
    }

  submit() {
    let self = this
    this.tries += 1
    this.submitted = true
    this.record = this.componentForm.value

    this.service.update(this.record, this.activatedRoute.snapshot.params['id']).subscribe({
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
      nombre: new FormControl(this.record.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      apellido_paterno: new FormControl(this.record.apellido_paterno, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      apellido_materno: new FormControl(this.record.apellido_materno, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      fecha_de_nacimiento: new FormControl(this.record.fecha_de_nacimiento, [Validators.required]),
      email: new FormControl(this.record.email, [Validators.required, Validators.email]),
      telefono: new FormControl(this.record.telefono, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      genero: new FormControl(this.record.genero, [Validators.required]),
    });
  }

  componentForm = new FormGroup({
    nombre: new FormControl(this.record.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    apellido_paterno: new FormControl(this.record.apellido_paterno, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    apellido_materno: new FormControl(this.record.apellido_materno, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    fecha_de_nacimiento: new FormControl(this.record.fecha_de_nacimiento, [Validators.required]),
    email: new FormControl(this.record.email, [Validators.required, Validators.email]),
    telefono: new FormControl(this.record.telefono, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    genero: new FormControl(this.record.genero, [Validators.required]),
  });

}

