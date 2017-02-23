import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { EccentricCasePipe } from '../shared/eccentric-case.pipe';
import { CounterService } from '../shared/counter.service';

describe('app component', () => {

  let mockedCounterService: any;

  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, EccentricCasePipe], // declare the test component
      providers: [
        { provide: CounterService, useValue: mockedCounterService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('p.sample-text'));
    el = de.nativeElement;
  });

  it('should have an empty text field', () => {
    fixture.detectChanges();
    fixture.detectChanges();
    expect(el.textContent).toContain('');
  });
});