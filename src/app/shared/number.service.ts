import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * Pointless example service.
 */
@Injectable()
export class NumberService {
  constructor(private http: Http) {
  }

  /**
   * Make an external API call to the github API, look at the Eckoh organization
   * and pluck the number of public repos in this organization.
   *
   * @returns {Observable<number>}
   */
  getRepoCount(): Observable<number> {
    return this.http.get('https://api.github.com/orgs/Eckoh')
    // grab the response as a json object
      .map((response) => response.json().public_repos)
      // swallow any errors and return a default value of 0
      .catch(() => Observable.of(0));
  }

  /**
   * Very important application logic for adding one to a number.
   *
   * @param foo input number
   * @returns {number} input number plus one
   */
  addOne(foo: number): number {
    return foo + 1;
  }
}
