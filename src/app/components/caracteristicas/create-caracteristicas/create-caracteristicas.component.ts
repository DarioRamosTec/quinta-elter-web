import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CaracteristicasService } from '../caracteristicas.service';
import { Modelo } from '../../../modelo';

@Component({
  selector: 'app-create-caracteristicas',
  standalone: true,
  imports: [SidebarComponent, CreateTitleComponent, ReactiveFormsModule],
  templateUrl: './create-caracteristicas.component.html',
  styleUrl: './create-caracteristicas.component.css'
})
export class CreateCaracteristicasComponent {


}
