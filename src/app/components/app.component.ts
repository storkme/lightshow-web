import {Observable} from 'rxjs/Observable';

import {Component, OnInit} from '@angular/core';
import {LightshowService} from '../shared/lightshow.service';
import {htmlColors as stuff} from '../shared/html-colors';
import {Subject} from "rxjs/Subject";

const numLeds = 288;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly htmlColors = stuff;
  readonly htmlColorKeys = Object.keys(stuff);
  initialBrightness: Observable<number>;
  initialState: Observable<Uint32Array>;
  selectedColor: Subject<number> = new Subject();
  stripChanged: Subject<Uint32Array> = new Subject();
  currentlySelectedColor: number = 0;

  constructor(private lightshow: LightshowService) {
  }

  onClick(color: number) {
    this.currentlySelectedColor = color;
    this.selectedColor.next(color);
  }

  onLevelChange(level: number) {
    this.lightshow.brightness(level * 10)
      .subscribe(() => {
      }, err => console.error(err));
  }

  onStripChange(state: Uint32Array) {
    this.stripChanged.next(state);
  }

  ngOnInit(): void {
    this.initialBrightness = this.lightshow.getBrightness();
    this.initialState = this.lightshow.getInitial();

    this.stripChanged
      .throttleTime(300)
      .flatMap(stripState => this.lightshow.set(stripState.buffer))
      .subscribe(() => {
        // nada!
      }, err => {
        console.error("couldn't update strip", err);
      });
  }

  colorToString(c: number) {
    return `rgb(${(c >> 16) & 0xff},${(c >> 8) & 0xff},${c & 0xff})`
  }
}