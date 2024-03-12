import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoEventosService } from '../../../Services/tipo-eventos.service'; // Corregir la ruta según la estructura de tu proyecto
import { CreateTipoEventos} from '../../../Models/tipo-eventos_model'; 
import { tipoEventosErrors } from '../tipo-eventos-errors'; 
import { NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-create-tipo-eventos',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, FormsModule, SidebarComponent, CreateTitleComponent, ReactiveFormsModule, LoadingComponent],
  templateUrl: './create-tipo-eventos.component.html',
  styleUrl: './create-tipo-eventos.component.css'
})
export class CreateTipoEventosComponent {

  errors: tipoEventosErrors | undefined;
  submitted: boolean = false;
  tries: number = 0;
  tipoEvento: CreateTipoEventos = { nombre: '', descripcion: '' }; // Utilizamos la interfaz CreateTipoEventos

  constructor(private tipoEventosService: TipoEventosService, private router: Router) {}

  submit() {
    this.tries += 1;
    this.submitted = true;
    this.tipoEventosService.crearTipoEvento(this.tipoEvento).subscribe(
      (value) => {
        this.router.navigate(['/caracteristicas']);
      },
      (err) => {
        this.errors = err.error.errors;
        this.submitted = false;
      }
    );
  }
}