import {Component, EventEmitter, Input, Output} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HousingLocation } from '../housingLocation';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <section class="listing">
      <img
          class="listing-photo"
          [src]="housingLocation.photo"
          alt="Exterior photo of {{ housingLocation.name }}"
          crossorigin
      />
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
        <button type="button" class="primary" (click)="onTestClick('hello')">Test</button>
    </section>
  `,
  styleUrls: ['./housing-location.component.css'],
})
export class HousingLocationComponent {
 @Input() housingLocation!: HousingLocation;

 @Output()
 customEvent = new EventEmitter();

 onTestClick(msg: string) {
     console.log(msg)
     this.customEvent.emit('Customer Event Emitted');
 }
}
