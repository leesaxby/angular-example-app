import { Injectable } from '@angular/core';
import { HousingLocation } from "./housingLocation";
import { HttpClient } from  '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class HousingService {
  constructor(private http: HttpClient) { }

  // ngOnInit() {
  //   this.http.get('http://localhost:3000/locations')
  //       .subscribe(val => console.log(val))
  // }

  // readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  readonly url = 'http://localhost:3000/locations';



  getAllHousingLocations(): Observable<any> {
    return this.http.get(this.url)
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
        `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
