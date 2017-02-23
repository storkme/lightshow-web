import { NumberService } from './number.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

/**
 * Here's an example of testing an angular service in the angular way.
 */
describe('counter service - angular tests', () => {

  // in our beforeEach we need to set up a module for testing
  // and most importantly mock the http backend..
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        NumberService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend: any, opts: any) => new Http(mockBackend, opts),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  it('should extract the initialValue from the response',
    (done) => {

      let injectedFn = inject([NumberService, MockBackend],
        (service: NumberService, mockBackend: MockBackend) => {

          //mock our backend response by subscribing to `mockBackend.connections`
          mockBackend.connections
            .subscribe((connection: MockConnection) => {
              //when we get a connection request, build a Response with fake data and pass it back!
              connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify({ public_repos: 10 })
              })));
            });

          //call our method as usual, under the hood it will hit our MockedBackend instead of making
          // a real http request!
          service.getRepoCount()
            .subscribe(initialValue => {
              // check the value of our response.
              expect(initialValue).toBe(10);
              done();
            });
        }
      );

      // remember that the inject function returns a function so we need to call it explicitly
      injectedFn();
    }
  );

  it('should default to an zero if the http request fails',
    (done) => {
      inject([NumberService, MockBackend],
        (service: NumberService, mockBackend: MockBackend) => {
          mockBackend.connections
            .subscribe((connection: MockConnection) => {
              //now we mock an error...
              connection.mockError(new Error('http request failed?'));
            });

          service.getRepoCount()
            .subscribe(initialValue => {
              // check the value of our response.
              expect(initialValue).toBe(0);
              done();
            });
        }
      )();
      // ^^^^ notice how we have () on the end to immediately execute the result of calling `inject()` !
      // if you forget to execute the result of `inject()` your test will do nothing :(
    }
  );
});

/**
 * And here's an example of testing a service using isolated unit tests.
 *
 * See the `eccentric-case.pipe.spec.ts` file for more details on isolated unit tests.
 */
describe('counter service - isolated tests', () => {
  let counterService: NumberService;

  beforeEach(() => {
    /*
     create a new counter service here - but we're not loading any of the angular framework, so we
     need to provide values for the constructor ourselves.

     in this instance we're not testing any code that relies on angular's `http` module, so we can just
     pass in a null value.
     */
    counterService = new NumberService(null);
  });

  it('should correctly add 1 to positive numbers', () => {
    expect(counterService.addOne(1)).toBe(2);
    expect(counterService.addOne(10000)).toBe(10001);
    expect(counterService.addOne(999)).toBe(1000);
  });

  it('should correctly add 1 to negative numbers', () => {
    expect(counterService.addOne(-1)).toBe(0);
    expect(counterService.addOne(-500)).toBe(-499);
  });
});