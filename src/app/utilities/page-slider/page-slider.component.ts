import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../Models/pagination';

@Component({
  selector: 'app-page-slider',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './page-slider.component.html',
  styleUrl: './page-slider.component.css'
})
export class PageSliderComponent {
  @Input()
  pagination : Pagination<Object> | undefined

  @Output()
  pageEvent = new EventEmitter<number>()

  @Input()
  small: boolean = false 

  goPage(page: number) {
    this.pageEvent.emit(page)
  }

  editQuery(path : string) {
    return Number(path.split('?page=')[1])
  }

  checkLabel(label : string) {
    return label.replace('&laquo; ', '').replace(" &raquo;", '')
  }

}
