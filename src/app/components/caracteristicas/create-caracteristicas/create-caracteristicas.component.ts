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
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-caracteristicas',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, FormsModule, SidebarComponent, CreateTitleComponent, ReactiveFormsModule, LoadingComponent],
  templateUrl: './create-caracteristicas.component.html',
  styleUrl: './create-caracteristicas.component.css'
})
export class CreateCaracteristicasComponent {
  caracteristica : any = {
    nombre: undefined,
    descripcion: undefined,
    cantidad: undefined
  }
  errors : CaracteristicasErrors | undefined
  submitted : boolean = false
  tries : number = 0

  constructor(private caracteristicaService : CaracteristicasService,
    private router : Router) {}

  submit() {
    let self = this
    this.tries += 1
    this.submitted = true
    this.caracteristicaService.store(this.caracteristica).subscribe({
      next(value) {
        self.router.navigate(['/caracteristicas'])
      },
      error(err) {
        self.errors = err.error.errors
        self.submitted = false
      },
    })
  }

}
