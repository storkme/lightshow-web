import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from '../components/app.component';
import { EccentricCasePipe } from '../shared/eccentric-case.pipe';
import { NumberService } from '../shared/number.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent, EccentricCasePipe],
  providers: [NumberService],
  bootstrap: [AppComponent]
})
export class MainModule {
}
