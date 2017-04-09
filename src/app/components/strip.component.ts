import {Observable} from 'rxjs/Observable';

import {AfterViewInit, Component, ElementRef, Input, Output, ViewChild} from '@angular/core';
import {htmlColors as stuff} from '../shared/html-colors';
import {Subject} from "rxjs/Subject";

const numLeds = 288;

@Component({
  selector: 'strip',
  template: `
    <canvas #strip
            (mousedown)="startDraw()"
            (mouseup)="stopDraw()"
            (mousemove)="mouseMove($event)"
            (mouseleave)="stopDraw()"
            style="height:90%;width:100%;"></canvas>
  `
})
export class StripComponent implements AfterViewInit {
  @ViewChild('strip') canvasRef: ElementRef;
  @Output() changes = new Subject();
  @Input() initial: Observable<Uint32Array>;
  @Input() color: Observable<number>;

  currentColor: number = 0;
  drawing: boolean = false;
  state: Uint32Array = new Uint32Array(numLeds).fill(0);

  constructor() {
  }

  ngAfterViewInit(): void {
    // resize the canvas ?____?
    // should probably re-resize it if the window changes size.
    const e = this.canvasRef.nativeElement;
    e.height = e.clientHeight;
    e.width = e.clientWidth;
    // this.initial.subscribe(val => this.render(val));
    this.color.subscribe(c => {
      this.currentColor = c
    });
    this.initial.subscribe(init => {
      this.state = init;
      this.render();
    });
    this.render();
  }

  startDraw() {
    this.drawing = true;
  }

  stopDraw() {
    this.drawing = false;
  }

  mouseMove(event: MouseEvent) {
    const e = this.canvasRef.nativeElement;
    const w = e.width;
    const slot = Math.floor((event.offsetX / w) * numLeds);

    if (this.drawing) {
      this.state[slot] = this.currentColor;
      this.render();
      this.changes.next(this.state);
    }
  }

  render() {
    const e = this.canvasRef.nativeElement;
    const ctx = e.getContext('2d');
    const barWidth = e.width / 288;

    // clear
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, e.width, e.height);

    let g1 = ctx.createRadialGradient(e.width / 2, e.height / 2, 350, e.width / 2, e.height / 2, 0);
    g1.addColorStop(0, 'black');
    g1.addColorStop(1, 'rgb(50,50,50)');
    ctx.textAlign = 'center';
    ctx.font = '35px \'Press Start 2P\'';
    ctx.fillStyle = g1;
    ctx.fillText('kinda dark in here', e.width / 2, e.height / 2);

    for (let i = 0; i <= numLeds; i++) {
      let c = this.state[i];
      if (c === 0) {
        continue;
      }
      let x = e.width - ((barWidth) * i);
      let color = `rgb(${(c >> 16) & 0xff},${(c >> 8) & 0xff},${c & 0xff})`;

      let gradient = ctx.createLinearGradient(x, 0, x, e.height / 2);
      gradient.addColorStop(0, 'black');
      gradient.addColorStop(1, color);

      ctx.fillStyle = gradient;
      ctx.fillRect(e.width - x, 0, barWidth, (e.height / 2) + 1);
      gradient = ctx.createLinearGradient(x, e.height / 2, x, e.height);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'black');

      ctx.fillStyle = gradient;
      ctx.fillRect(e.width - x, (e.height / 2) - 1, barWidth, e.height);


    }
  }
}
