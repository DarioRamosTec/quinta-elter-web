import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';
import { IndexTitleComponent } from '../index-title/index-title.component';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { PageSliderComponent } from '../../utilities/page-slider/page-slider.component';
import { Pagination } from '../../Models/pagination';

@Component({
  selector: 'app-indextable',
  standalone: true,
  imports: [NgFor, NgIf, KeyValuePipe, IndexTitleComponent, RouterLink, LoadingComponent, PageSliderComponent],
  templateUrl: './indextable.component.html',
  styleUrl: './indextable.component.css'
})
export class IndextableComponent {
  @Input()
  isActive: Boolean = false;
  @Input()
  createRoute: String | undefined;
  @Input()
  hideCreate: Boolean = false;
  @Input()
  oldPagination = true
  @Input()
  paginations: Pagination<Object> | undefined
  @Output()
  paginationsMethod(page : number | undefined = undefined) {

  }
  @Input()
  collection: Object[] | undefined;
  page: number = 1
  amount: number = 20
  min: number = 0
  max: number = 20
  quantity: number = 0
  pagesOpen: number = 5

  ngAfterContentChecked() {
    this.reloadPage()
  }

  setPage(page : number) {
    if (this.collection && page > 0 && page <= this.getMaxPage()) {
      this.page = page
    }
  }
  
  getMaxPage() {
    if (this.collection) {
      return Math.ceil(this.collection.length / this.amount)
    }
    return 0
  }

  getMatrix() {
    var vls = []
    for (var i = Math.max(this.page - this.pagesOpen + Math.min(this.getMaxPage() - (this.page + this.pagesOpen), 0), 0); i < Math.min(this.page + this.pagesOpen - Math.min(this.page - this.pagesOpen, 0), this.getMaxPage()); i++) {
      vls.push(i)
    }
    return vls
  }

  reloadPage() {
    const element = document.getElementById("indexTableBody")

    if (element) {
      var children = element.children;
      this.max = this.page * this.amount
      this.min = this.max-this.amount
      this.quantity = this.max > children.length ? children.length : this.max ;
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        child.className = (i < this.max && i >= this.min ? "" : "hidden" )
      }
    }

  }
}
