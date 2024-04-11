import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { AuthComponent } from '../../auth/auth/auth.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { IndextableComponent } from '../../../layout/indextable/indextable.component';
import { NgFor, NgIf } from '@angular/common';
import { Log } from '../log';
import { LogsService } from '../logs.service';
import { WebsocketService } from '../../../Services/websocket.service';
import { Pagination } from '../../../Models/pagination';
import { PageSliderComponent } from '../../../utilities/page-slider/page-slider.component';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user';

@Component({
  selector: 'app-index-logs',
  standalone: true,
  imports: [SidebarComponent, IndextableComponent, RouterLink, NgIf, NgFor, PageSliderComponent],
  templateUrl: './index-logs.component.html',
  styleUrl: './index-logs.component.css'
})
export class IndexLogsComponent  extends AuthComponent {
  
  collection : Log[] | undefined
  loading: Boolean = false
  title: string = 'Auditoría'
  pageCollection: Pagination<Log> | undefined
  numberPage: number | undefined = undefined
  numberPageUser: number | undefined = undefined
  users: User[] | undefined
  isUser = 0

  constructor(private service : LogsService,
    authService : AuthService, router : Router,
    protected usersService : UsersService) {
    super(authService, router)
    let self = this 
    this.indexPage()
    this.usersService.index().subscribe({
      next(value) {
        self.users = value.data
      },
      error(err) {
        self.checkStatus(err.status)
      },
    })
    this.websocketService.hear(() => {
      if (this.isUser > 0) {
        this.indexPageUser(undefined, this.isUser)
      } else {
        this.indexPage()
      }
      console.log("Evento de websocket.")
    })
  }

  index() {
    let self = this
    this.collection = undefined
    this.service.index().subscribe({
      next(data) {
        self.collection = data.data
      },
      error(err) {
        self.checkStatus(err.status)
      }})
  }

  changeUsuario(event: any) {
    if (event.target.value == undefined ||event.target.value == null) {
      this.numberPage = undefined
      this.indexPage()
      this.isUser = 0
    } else {
      this.numberPageUser = undefined
      this.indexPageUser(undefined, event.target.value)
      this.isUser = event.target.value
    }
  }

  indexPageUser(page : number | undefined = undefined, id: number) {
    let self = this
    this.collection = undefined

    this.service.indexPageUser(page == undefined ? this.numberPageUser : page, id).subscribe({
      next(data){
        self.pageCollection = data.data
        self.collection = data.data.data
      },
      error(err){
        self.checkStatus(err.status)
      }
    })
    this.numberPageUser = page
  }

  indexPage(page : number | undefined = undefined) {
    let self = this
    this.collection = undefined

    this.service.indexPage(page == undefined ? this.numberPage : page).subscribe({
      next(data){
        self.pageCollection = data.data
        self.collection = data.data.data
      },
      error(err){
        self.checkStatus(err.status)
      }
    })
    this.numberPage = page == undefined ? this.numberPage : page
  }

}
