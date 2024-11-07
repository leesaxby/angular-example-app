import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestService} from "../test.service";
import {Observable} from "rxjs";

@Component({
  selector: 'content-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-container">
      {{ content | async }}
    </div>
  `,
  styleUrls: ['./content.component.css'],
})

export class ContentComponent {
  testService: TestService = inject(TestService);
  content: Observable<string>;

  constructor() {
    this.content = this.testService.selectedContent;
  }


}
