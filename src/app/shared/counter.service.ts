import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * Pointless example service.
 */
@Injectable()
export class CounterService {
  constructor(private http: Http) {
  }

  /**
   * Pretend like we're going to make an external API call. Really, we don't have an API cuz this is a silly starter project,
   * so this external call will always fail and return our default value of 0.
   *
   * @returns {Observable<number>}
   */
  getInitialValue(): Observable<number> {
    return this.http.get('http://foo.bar/initial-value')
    // grab the response as a json object
      .map(response => response.json())
      // swallow any errors and return a default value of 0
      .catch(() => Observable.of(0));
  }
}