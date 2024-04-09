import { Component, OnInit, OnDestroy  } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstadosEventosService } from '../../../Services/estado-eventos.service'; 
import { EstadosEventos} from '../../../Models/estado-eventos.model'; 
import { EstadoEventosErrors } from '../estado_eventos-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';
import { Subscription } from 'rxjs';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { SseService } from '../../../Services/sse.service';
@Component({
  selector: 'app-index-estado-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './index-estado-eventos.component.html',
  styleUrl: './index-estado-eventos.component.css'
})
export class IndexEstadoEventosComponent extends AuthComponent implements OnInit, OnDestroy{
estado_eventos : EstadosEventos[] | undefined
loading : boolean = false
private sseSubscription: Subscription | undefined

constructor(private  EstadosEventosService : EstadosEventosService, private sseService: SseService,
  authService: AuthService , router : Router) {
    super(authService, router)
    this.index()
  }

  index(){
    let self = this
    this.estado_eventos  = undefined
    this.EstadosEventosService.index().subscribe({
      next(data){
        self.estado_eventos = data.data
      },
      error(err){
        self.checkStatus(err.status)
      }
    })
  }
  override ngOnInit(): void {
    super.ngOnInit();
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Permiso de notificación concedido');
        } else {
          console.log('Permiso de notificación denegado');
        }
      });
    } else {
      console.log('Las notificaciones no son soportadas en este navegador.');
    }
    this.sseSubscription = this.sseService.getServerSentEvent().subscribe({
      next: (event: MessageEvent) => {
        const nuevosDatos = JSON.parse(event.data);
        this.estado_eventos = nuevosDatos;
        this.mostrarNotificacion(nuevosDatos);
      },
      error: (error) => {
        console.error('EventSource failed:', error);
      }
    });
  }
  ngOnDestroy() {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
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
  mostrarNotificacion(datos: EstadosEventos[]) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notificacion = new Notification('Nuevo Evento de Estado', {
        body: 'Hay nuevos datos disponibles.',
        icon: 'path_to_icon' 
      });
      notificacion.onclick = () => {
        console.log('Notificación clickeada');
      };
    }
    console.log('Nuevos datos recibidos:', datos);
  }
  
}


