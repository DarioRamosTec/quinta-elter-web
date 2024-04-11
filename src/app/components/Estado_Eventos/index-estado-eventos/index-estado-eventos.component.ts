import { Component, OnInit, OnDestroy, NgZone  } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstadosEventosService } from '../../../Services/estado-eventos.service'; 
import { EstadosEventos} from '../../../Models/estado-eventos.model'; 
import { EstadoEventosErrors } from '../estado_eventos-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { Observable, Subscription } from 'rxjs';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { SseService } from '../../../Services/sse.service';
import { environment } from '../../../../environments/environment.development';
import { SseClient } from 'ngx-sse-client';
import { HttpHeaders } from '@angular/common/http';
import { PageSliderComponent } from '../../../utilities/page-slider/page-slider.component';
import { Pagination } from '../../../Models/pagination';

@Component({
  selector: 'app-index-estado-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor, NgIf, IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent, PageSliderComponent, PageSliderComponent],
  templateUrl: './index-estado-eventos.component.html',
  styleUrl: './index-estado-eventos.component.css'
})
export class IndexEstadoEventosComponent extends AuthComponent implements OnInit, OnDestroy{
estado_eventos : EstadosEventos[] | undefined
loading : boolean = false
eventSource: EventSource | undefined
pages: Pagination<EstadosEventos> | undefined
lastPage: number | undefined = undefined
lastUpdated: string | undefined = undefined

constructor(private  EstadosEventosService : EstadosEventosService, private sseService: SseService,
  authService: AuthService , router : Router, protected sseClient: SseClient, protected ngZone: NgZone) {
    super(authService, router)
    this.index()
  }

  index(page : number | undefined = undefined, restart : boolean = true) {
    let self = this
    this.estado_eventos = restart ? undefined : this.estado_eventos

    this.EstadosEventosService.indexPage(page == undefined ? this.lastPage : page).subscribe({
      next(data){
        self.pages = data.data
        self.estado_eventos = data.data.data
        self.lastUpdated = data.last_update
      },
      error(err){
        self.checkStatus(err.status)
      }
    })

    this.lastPage = page == undefined ? this.lastPage : page
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    this.hearSSE()
  }

  hearSSE(): void{
    let self = this
    this.eventSource = new EventSource('http://127.0.0.1:8000/api/estado_eventos/sse');

    this.eventSource.onmessage = (event) => {
      if(event.data != null && '"'+this.lastUpdated +'"' != event.data) {
        this.ngZone.run(() => {
          console.log("Actualización en proceso.")
          this.index(undefined, false)
        });
      }
    }
  }
  
  ngOnDestroy() {
    this.closeSSE()
  }

  closeSSE() {
    if (this.eventSource) {
      this.eventSource.close()
    }
  }

  destroy(id : number){
    let self = this
    this.loading = true
    this.EstadosEventosService.destroy(id).subscribe({
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
  
}