import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadosEventosService } from '../../../Services/estado-eventos.service'; 
import { EstadosEventos} from '../../../Models/estado-eventos.model'; 
import { EstadoEventosErrors } from '../estado_eventos-errors';
import { CommonModule,NgFor, NgIf } from '@angular/common';
import { Modelo } from '../../../modelo';

import { SseService } from '../../../Services/sse.service';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-estado-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,SidebarComponent, NgFor,NgIf,IndextableComponent,RouterLink,LoadingComponent,CreateTitleComponent],
  templateUrl: './create-estado-eventos.component.html',
  styleUrl: './create-estado-eventos.component.css'
})
export class CreateEstadoEventosComponent extends AuthComponent {

  estado_eventos : any = {
    nombre : undefined,
    descripcion : undefined

  }
  errors : EstadoEventosErrors | undefined
  submitted : boolean = false
  
  private sseSubscription: Subscription | undefined;
  tries : number = 0
  estados_eventoss: Modelo<EstadosEventos[]> | undefined;

  constructor(private EstadosEventosService : EstadosEventosService,  private snackBar: MatSnackBar,
    router : Router, authService : AuthService,private SseService: SseService ) {
      super(authService, router)
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
  
  submit(){
    let self = this
    this.tries += 1
    this.submitted = true
    this.estado_eventos = this.componentForm.value
    
    this.EstadosEventosService.storeVikki(this.estado_eventos).subscribe({
      next(value) {
        self.router.navigate(['/estado_eventos'])
        self.consumeSSE();
        
      },
      error(err) {
        self.errors = err.error.errors
        self.submitted = false
        self.checkStatus(err.status)
      },
    })
  }

  componentForm = new FormGroup({
    nombre: new FormControl(this.estado_eventos.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    descripcion: new FormControl(this.estado_eventos.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
  });
  consumeSSE() {
    this.sseSubscription =this.SseService.getServerSentEvent().subscribe(event => {
    
      this.snackBar.open('¡Estado de Evento agregado!', 'Cerrar', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
      //this.actualizarEstadosEventos();
      console.log('Evento SSE recibido:', event);
      
    });
  
  }
  // ngOnDestroy(): void {
   
  //   if (this.sseSubscription) {
  //     this.sseSubscription.unsubscribe();
  //   }
  // }
  private actualizarEstadosEventos(): void {

    this.EstadosEventosService.index().subscribe(data => {
      this.estados_eventoss = data;
    });
  }
}
