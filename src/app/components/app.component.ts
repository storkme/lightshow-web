import { Observable } from 'rxjs/Observable';

import { Component, OnInit } from '@angular/core';
import { CounterService } from '../shared/counter.service';
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CounterService],
})
export class AppComponent implements OnInit {
  counter: Observable<number>;
  sampleText = 'This text has been filtered through the eccentricCase pipe';

  constructor(private counterService: CounterService) {
  }

  ngOnInit(): void {
    this.counter = this.counterService.getInitialValue()
      .mergeMap(initialValue =>
        Observable.interval(100)
          .map(i => i + initialValue)
      );
  }
}
