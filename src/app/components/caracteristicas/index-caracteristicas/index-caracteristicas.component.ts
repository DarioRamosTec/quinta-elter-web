import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CaracteristicasService } from '../caracteristicas.service';
import { Caracteristica } from '../caracteristica';

@Component({
  selector: 'app-index-caracteristicas',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './index-caracteristicas.component.html',
  styleUrl: './index-caracteristicas.component.css'
})
export class IndexCaracteristicasComponent {
  
  caracteristicas : Caracteristica[] | undefined

  constructor(caracteristicasService : CaracteristicasService) {
    caracteristicasService.index().subscribe(data => {
      this.caracteristicas = data.data
      console.log(this.caracteristicas)
    })
  }
}
