import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';

import { Component } from '@angular/core';
@Component({
  selector: 'app',
  template: '<p>counting is fun: {{counter|async}}</p>'
})
export class AppComponent {
  counter: any;

  constructor() {
    this.counter = Observable.interval(100);
  }
}
