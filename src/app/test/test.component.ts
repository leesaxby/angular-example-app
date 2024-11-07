import { Component, inject } from '@angular/core';
import {TestService} from './test.service';
import {ListComponent} from "./list/list.component";
import {ContentComponent} from "./content/content.component";
import {TabsComponent} from "./tabs/tabs.component";


@Component({
  selector: 'test',
  standalone: true,
  imports: [ContentComponent, ListComponent, TabsComponent],
  template: `
    <div class="container">
      <div>
        <list-component />
      </div>
      <div>
        <tabs-component />
        <content-component />
      </div>
    </div>
  `,
  styleUrls: [`./test.component.css`],
})

export class TestComponent {

}
