import {Observable} from 'rxjs/Observable';

import {AfterViewInit, Component, ElementRef, Input, Output, ViewChild} from '@angular/core';
import {LightshowService} from '../shared/lightshow.service';
import {htmlColors as stuff} from '../shared/html-colors';
import {Subject} from "rxjs/Subject";

const numLevels = 25;

@Component({
  selector: 'dimmer',
  template: '<canvas #coolstuff (click)="onClick($event)" style="height:100%;width:75px;"></canvas>'
})
export class DimmerComponent implements AfterViewInit {
  @ViewChild('coolstuff') canvasRef: ElementRef;
  @Output() changes = new Subject();
  @Input() initial: Observable<number>;

  constructor() {
  }

  ngAfterViewInit(): void {
    // resize the canvas ?____?
    // should probably re-resize it if the window changes size.
    const e = this.canvasRef.nativeElement;
    e.height = e.clientHeight;
    e.width = e.clientWidth;
    this.initial.subscribe(val => this.render(val / 10));
  }

  onClick(event: MouseEvent) {
    const e = this.canvasRef.nativeElement;
    const elementHeight = e.clientHeight;
    const invertClickVertical = elementHeight - event.clientY;

    const ratio = invertClickVertical / elementHeight;
    const value = Math.round(ratio * (numLevels));

    this.render(value);

    this.changes.next(value);
  }

  render(value: number) {
    const e = this.canvasRef.nativeElement;

    const padding = 3;
    const barHeight = (e.height - ((numLevels + 1) * padding)) / numLevels;

    const ctx = e.getContext('2d');

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, e.width, e.height);

    for (let i = 0; i <= value; i++) {
      let y = e.height - ((barHeight + padding) * i);
      let c = 8 * i;
      ctx.fillStyle = `rgb(${c},${c},${c})`;
      ctx.fillRect(0, y, e.width, barHeight);
    }


    ctx.save();
    ctx.textAlign = 'center';

    let gradient = ctx.createLinearGradient(0, 0, e.width, 0);
    gradient.addColorStop(0, 'rgb(255,255,255)');
    gradient.addColorStop(1, 'rgb(200,200,200)');
    ctx.font = '35px \'Press Start 2P\'';
    ctx.fillStyle = gradient;
    ctx.translate(e.width / 2, e.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('b r i g h t n e s s', 0, 15);
    ctx.restore();
  }
}
