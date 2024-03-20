import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Opiniones} from '../../../Models/opiniones.model'; 
import { OpinionesErrors } from '../opiniones-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { OpinionesService } from '../../../Services/opiniones.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-index-opiniones',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './index-opiniones.component.html',
  styleUrl: './index-opiniones.component.css'
})
export class IndexOpinionesComponent extends AuthComponent {

  opiniones :Opiniones [] | undefined
  loading : boolean = false
  pollingSubscription: Subscription | undefined;

  constructor(private OpinionesService :OpinionesService,
    authService : AuthService, router : Router) {
    super(authService, router)
    this.startPolling(5000);
    this.index()
  }

  index(){
    let self = this
    let opiniones = undefined
    this.OpinionesService.index().subscribe({
      next(data) {
        self.opiniones = data.data
      },
      error(err) {
        self.checkStatus(err.status)

      }
    })
  }

  destroy(id : number){
    let self = this
    this.loading = true
    this.OpinionesService.destroy(id).subscribe({
      next(){
        self.loading = false
        self.index()
      },
      error(err){
        self.checkStatus(err.status)
        self.loading = false
        self.index()
      },
      complete(){
      },
    })
  }
  
  startPolling(intervalTime: number) {
    this.pollingSubscription = this.OpinionesService.pollForOpinionesUpdates(intervalTime)
      .subscribe({
        next: (data) => {
          this.opiniones = data.data;
          console.log('Opiniones actualizadas:', this.opiniones);
        },
        error: (error) => {
          console.error('Error al obtener las opiniones:', error);
        }
      });
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
