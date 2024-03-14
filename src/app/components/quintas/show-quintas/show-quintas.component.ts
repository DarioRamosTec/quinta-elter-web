import { Component } from '@angular/core';
import { QuintasService } from '../quintas.service';
import { Quinta } from '../quinta';
import { AuthComponent } from '../../auth/auth/auth.component';
import { AuthService } from '../../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-quintas',
  standalone: true,
  imports: [],
  templateUrl: './show-quintas.component.html',
  styleUrl: './show-quintas.component.css'
})
export class ShowQuintasComponent extends AuthComponent {
  record : Quinta | undefined
  notfound = false
  routeTo: string = '/clientes'

  constructor(private service : QuintasService,
    router : Router, authService : AuthService, activatedRoute : ActivatedRoute) {
      super(authService, router)
      let self = this

      service.show(activatedRoute.snapshot.params['id']).subscribe({
        next(data) {
          self.record = data.data
        },
        error(err) {
          self.notfound = true
        },
      })
    }

}
