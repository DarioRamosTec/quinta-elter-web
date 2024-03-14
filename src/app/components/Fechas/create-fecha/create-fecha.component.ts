import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FechasErrors } from '../fechas-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { Title } from '@angular/platform-browser';
import { Fechas } from '../../../Models/fechas.models';
import { FechasService } from '../../../Services/fechas.service';
@Component({
  selector: 'app-create-fecha',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './create-fecha.component.html',
  styleUrl: './create-fecha.component.css'
})
export class CreateFechaComponent extends AuthComponent {
fechas : any  = {
  dia_inicio: undefined,
  dia_final:  undefined,
  costo:  undefined
}

errors : FechasErrors | undefined
submitted : boolean = false
tries : number = 0

constructor(private FechasService : FechasService,router : Router, authService : AuthService){
  super(authService, router)
}
submit(){
  let self = this
  this.submitted = true
  this.tries += 1
  this.fechas = this.componentForm.value

  this.FechasService.store(this.fechas).subscribe({
    next(value) {
      self.router.navigate(['/fechas'])
    },
    error(err) {
      self.errors = err.error.errors
      self.submitted = false
      self.checkStatus(err.status)
    },
  })
}

  componentForm = new FormGroup({
    dia_inicio: new FormControl(this.fechas.dia_inicio, [Validators.required]),
    dia_final: new FormControl(this.fechas.dia_final, [Validators.required]),
    costo: new FormControl(this.fechas.costo, [Validators.required, Validators.min(0)]),
  });

}