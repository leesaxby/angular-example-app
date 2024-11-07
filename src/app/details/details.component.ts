import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housingLocation';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, CurrencyPipe, TitleCasePipe],
  template: `
    <article>
      <img
          class="listing-photo"
          [src]="housingLocation?.photo"
          alt="Exterior photo of {{ housingLocation?.name }}"
          crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
      
      <section>
        <ul>
          @for (item of items; track item.name) {
          
            <li class="{{($first || $last) ? 'first-last' : '' && $even ? 'even' : 'odd'}}">{{ item.name + ' index: ' + $index + ' count: ' + $count}}</li>
          
          } @empty {
            <li>There are no items.</li>
          }
        </ul>
      </section>
      
      <section>
        @if(showSomething) {
         <h1>show</h1>
        } @else {
            <h1>hide</h1>
        }
      </section>
      <section>

        <div>{{ datePipeTest | date }}</div>
        <div>{{ tilePipeTest | titlecase }}</div>
        <div>{{ currencyPipeTest | currency }}</div>
        
      </section>
    </article>
  `,
  styleUrls: [`./details.component.css`],
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  datePipeTest =  Date.now();
  tilePipeTest = 'my title';
  currencyPipeTest = 1.45;

  items: { name: string }[] = [{name: 'one'}, {name: 'two'}, {name: 'three'}]

  showSomething: boolean = false;

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? '',
    );
  }
}
