import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaracteristicasService } from '../caracteristicas.service';
import { Caracteristica } from '../caracteristica';
import { NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { CaracteristicasErrors } from '../caracteristicas-errors';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-edit-caracteristicas',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, FormsModule, SidebarComponent, CreateTitleComponent, ReactiveFormsModule, LoadingComponent],
  templateUrl: './edit-caracteristicas.component.html',
  styleUrl: './edit-caracteristicas.component.css'
})
export class EditCaracteristicasComponent extends AuthComponent {
  caracteristica : any = {
    nombre: undefined,
    descripcion: undefined,
    cantidad: undefined
  }
  errors : CaracteristicasErrors | undefined
  submitted : boolean = false
  ready : boolean = false
  tries : number = 1
  notfound = false

  constructor(private caracteristicaService : CaracteristicasService,
    router : Router, authService : AuthService, activatedRoute: ActivatedRoute) {
      super(authService, router)
      let self = this
      caracteristicaService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.caracteristica = data.data
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
    this.caracteristica.descripcion = this.caracteristica.descripcion == null ? undefined : this.caracteristica .descripcion

    this.caracteristicaService.store(this.caracteristica).subscribe({
      next(value) {
        self.router.navigate(['/caracteristicas'])
      },
      error(err) {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      },
    })
  }
}
