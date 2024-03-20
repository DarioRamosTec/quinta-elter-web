import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { AuthComponent } from '../../auth/auth/auth.component';
import { LoadingComponent } from '../../../layout/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { CreateTitleComponent } from '../../../layout/create-title/create-title.component';
import { Log } from '../log';
import { LogsService } from '../logs.service';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user';

@Component({
  selector: 'app-show-logs',
  standalone: true,
  imports: [SidebarComponent, IndextableComponent, RouterLink, NgIf, NgFor, LoadingComponent, FormsModule, CreateTitleComponent],
  templateUrl: './show-logs.component.html',
  styleUrl: './show-logs.component.css'
})
export class ShowLogsComponent extends AuthComponent {
  record : Log | undefined
  notfound = false
  routeTo: string = '/logs'
  users: User[] | undefined

  constructor(private service : LogsService,
    router : Router, authService : AuthService, activatedRoute : ActivatedRoute, usersService : UsersService) {
      super(authService, router)
      let self = this

      usersService.index().subscribe(data => {
        this.users = data.data
      })

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
