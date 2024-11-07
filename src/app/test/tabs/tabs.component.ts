import {Component, inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import {TestService} from "../test.service";

@Component({
  selector: 'tabs-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs">
      <div (click)="selectTab('tab1')">
        Tab 1
      </div>
      <div (click)="selectTab('tab2')">
        Tab 2
      </div>
      <div (click)="selectTab('tab3')">
        Tab 3
      </div>
    </div>
  `,
  styleUrls: ['./tabs.component.css'],
})

export class TabsComponent {
  testService: TestService = inject(TestService);

  constructor(
      private router: Router,
  ) {}

  selectTab(tabNumber: string) {
    const queryParams = { tab: tabNumber };

    this.router.navigate(
        [],
        {
          queryParams,
          queryParamsHandling: 'merge',
        }
    ).then(() => this.testService.refreshList());

  }
}
