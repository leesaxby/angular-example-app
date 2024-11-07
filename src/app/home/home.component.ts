import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingLocation} from '../housingLocation';
import {HousingService} from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
          (customEvent)="onCustomEvent($event)"
          *ngFor="let housingLocation of filteredLocationList"
          [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations().subscribe(locations => {
      this.housingLocationList = locations
      this.filteredLocationList = locations;
    })

    // this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
    //   this.housingLocationList = housingLocationList;
    //   this.filteredLocationList = housingLocationList;
    // });
  }

  onCustomEvent(event: any) {
    console.log(event)
  }

  filteredLocationList: HousingLocation[] = [];
  housingLocationList: HousingLocation[] = [];

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
