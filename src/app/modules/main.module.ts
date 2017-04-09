import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {AppComponent} from '../components/app.component';
import {DimmerComponent} from '../components/dimmer.component';
import {StripComponent} from '../components/strip.component';
import {LightshowService} from '../shared/lightshow.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent, DimmerComponent, StripComponent],
  providers: [LightshowService],
  bootstrap: [AppComponent]
})
export class MainModule {
}
