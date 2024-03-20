import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IndexTitleComponent } from '../index-title/index-title.component';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-indextable',
  standalone: true,
  imports: [NgFor, NgIf, KeyValuePipe, IndexTitleComponent, RouterLink, LoadingComponent],
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
  collection: Object[] | undefined;
}
