import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EccentricCasePipe } from '../shared/eccentric-case.pipe';
import { NumberService } from '../shared/number.service';

/**
 * Here's an example test of our app component.
 */
describe('app component', () => {

  /* create a blank version of our number service with
   an empty implementation of the method we'll be spying on */
  let numberServiceStub: any = {
    getRepoCount(){
    }
  };
  let spy: any;

  let comp: AppComponent;
  let numberService;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, EccentricCasePipe],
      providers: [
        { provide: NumberService, useValue: numberServiceStub }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance; // BannerComponent test instance

    //get our injected number service (stub)
    numberService = fixture.debugElement.injector.get(NumberService);
    //create a spy based on our numberService
    spy = spyOn(numberService, 'getRepoCount')
      .and.returnValue(Observable.of(0));

    de = fixture.debugElement.query(By.css('span.repo-count'));
  });

  it('should not show value before OnInit is called', () => {
    expect(de.nativeElement.textContent).toBe('', 'nothing displayed');
    expect(spy.calls.any()).toBe(false, 'getRepoCount not yet called');
  });

  it('should show initial value from mocked service', () => {
    fixture.detectChanges();
    expect(spy.calls.any()).toBe(true, 'getRepoCount should be called now');
    expect(de.nativeElement.textContent).toBe('0',
      'Number text should be seeded with initial value by now');
  });
});