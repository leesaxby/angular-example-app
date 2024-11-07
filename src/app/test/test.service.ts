import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {BehaviorSubject, Observable} from "rxjs";

const tab1 = ['one', 'two', 'three']
const tab2 = ['four', 'five', 'six']
const tab3 = ['seven', 'eight', 'nine']

const getTab = (selectedTab: string) => {
  switch (selectedTab){
    case 'tab1': return tab1
    case 'tab2': return tab2
    case 'tab3': return tab3
    default: return tab1
  }
}

@Injectable({
  providedIn: 'root'
})

export class TestService {
  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     console.log(event)
    //   }
    // });
  }

  private selectedListSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(tab1);
  selectedList: Observable<string[]> = this.selectedListSubject.asObservable();

  private selectedContentSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedContent: Observable<string> = this.selectedContentSubject.asObservable();

  refreshList() {
    let list;
    const tabParam = this.activatedRoute.snapshot.queryParamMap.get('tab') || 'tab1';
    const amountParam = this.activatedRoute.snapshot.queryParamMap.get('amount') || 'ALL';


    if (amountParam === 'TOP_2') {
      const [item1, item2, ...rest ] = getTab(tabParam);
      list =  [item1, item2];
    } else {
      list = getTab(tabParam);
    }

    this.selectedListSubject.next(list);
    this.selectedContentSubject.next('')
  }

  changeContent(contentNumber: string) {
    this.selectedContentSubject.next(`Content ${contentNumber}`)
  }
}
