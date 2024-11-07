import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import { model, ModelSignal } from '@angular/core';

import {Observable} from "rxjs";
import {TestService} from "../test.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'list-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <button type="button" (click)="filterList('ALL')">ALL</button>
      <button type="button" (click)="filterList('TOP_2')">Top 2</button>
      <ul *ngFor="let item of list | async">
        <li (click)="selectListItem(item)">{{ item }}</li>
      </ul>
    </div>
  `,
  styleUrls: ['./list.component.css'],
})


export class ListComponent {
  testService: TestService = inject(TestService);
  list: Observable<string[]>;

  constructor(
      private router: Router,
  ) {
    this.list = this.testService.selectedList;
  }

  selectListItem(listNumber: string) {
    this.testService.changeContent(listNumber)
  }

  filterList(amount: string) {
    const queryParams = { amount: amount };

    this.router.navigate(
        [],
        {
          queryParams,
          queryParamsHandling: 'merge',
        }
    ).then(() => this.testService.refreshList());
  }
}
