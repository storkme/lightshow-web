import { Observable } from 'rxjs/Observable';

import { Component, OnInit } from '@angular/core';
import { NumberService } from '../shared/number.service';
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  value: Observable<number>;
  sampleText = 'This text has been filtered through the eccentricCase pipe';

  constructor(private numberService: NumberService) {
  }

  ngOnInit(): void {
    this.value = this.numberService.getInitialValue();
  }
}
