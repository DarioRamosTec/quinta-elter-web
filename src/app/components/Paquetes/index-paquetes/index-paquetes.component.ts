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
  selector: 'app-index-paquetes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './index-paquetes.component.html',
  styleUrl: './index-paquetes.component.css'
})
export class IndexPaquetesComponent  extends AuthComponent{
paquetes : Paquetes[] | undefined
loading : boolean = false
  constructor(private PaquetesService : PaquetesService,router : Router, authService : AuthService) {
    super(authService, router)
    this.index()
  }

  index(){
    let self = this
    this.paquetes = undefined
    this.PaquetesService.index().subscribe({
      next(data) {
        self.paquetes = data.data
      },
      error(err) {
        self.checkStatus(err.status)
      }
    })
  }

  destroy(id : number){
    let self  = this
     this.loading = true
     this.PaquetesService.destroy(id).subscribe({
        next(){
          self.loading = false
          self.index()
        },
        error(err){
          self.loading = false
          self.index()
          self.checkStatus(err.status)
        },
        complete(){

        },
     })
  }
}
