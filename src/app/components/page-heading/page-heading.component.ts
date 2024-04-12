import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-heading',
  standalone: true,
  imports: [],
  templateUrl: './page-heading.component.html',
  styleUrl: './page-heading.component.css'
})
export class PageHeadingComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
