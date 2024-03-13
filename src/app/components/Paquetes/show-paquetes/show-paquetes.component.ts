import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaquetesService} from '../../../Services/paquetes.service'; 
import { Paquetes } from '../../../Models/Paquetes.model'; 
import { PaquetesErrors } from '../paquetes.errors'; 
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
@Component({
  selector: 'app-show-paquetes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './show-paquetes.component.html',
  styleUrl: './show-paquetes.component.css'
})
export class ShowPaquetesComponent extends AuthComponent {

  paquetes : Paquetes | undefined
  notfound : boolean = false
  
  constructor(private PaquetesService : PaquetesService,
    router : Router, authService : AuthService, activatedRoute : ActivatedRoute) {
      super(authService, router)
      let self = this
      PaquetesService.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.paquetes= data.data
        },
        error(err) {
          self.notfound = true
        },
      })
    }
}
