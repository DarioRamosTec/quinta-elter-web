import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selector: 'app-edit-horas-extras',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, FormsModule, SidebarComponent, CreateTitleComponent, ReactiveFormsModule, LoadingComponent],
  templateUrl: './edit-horas-extras.component.html',
  styleUrl: './edit-horas-extras.component.css'
})
export class EditHorasExtrasComponent extends AuthComponent{
  horas_extras : any  ={
    costo: undefined,
    hora_minima: undefined,
    hora_maxima: undefined
  }
  errors : HorasExtrasErrors | undefined
  submitted : boolean = false
  ready : boolean = false
  tries : number = 1
  notfound = false

  constructor(private horas_extrasService : HorasExtrasService,
    router : Router, authService : AuthService, protected activatedRoute: ActivatedRoute) {
      super(authService, router)
      let self = this
      horas_extrasService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.horas_extras = data.data
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
    this.horas_extras = this.componentForm.value

    this.horas_extrasService.update(this.horas_extras, this.activatedRoute.snapshot.params['id']).subscribe({
      next(value) {
        self.router.navigate(['/horas_extras'])
      },
      error(err) {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      },
    })
  }

  set() {
    this.componentForm = new FormGroup({
      hora_maxima: new FormControl(this.horas_extras.hora_maxima, [Validators.required, Validators.min(0)]),
      hora_minima: new FormControl(this.horas_extras.hora_minima, [Validators.required, Validators.min(0)]),
      costo: new FormControl(this.horas_extras.costo, [Validators.required, Validators.min(0)]),
    });
  }

  componentForm = new FormGroup({
    hora_maxima: new FormControl(this.horas_extras.hora_maxima, [Validators.required, Validators.min(0)]),
    hora_minima: new FormControl(this.horas_extras.hora_minima, [Validators.required, Validators.min(0)]),
    costo: new FormControl(this.horas_extras.costo, [Validators.required, Validators.min(0)]),
  });
}
