import {Injectable} from '@angular/core';
import {Http, Headers, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class LightshowService {
  constructor(private http: Http) {
  }

  set(values: ArrayBuffer): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/octet-stream'});
    return this.http.post('/api/img', values, {headers});
  }

  brightness(level: number): Observable<any> {
    if (level < 0 || level > 255) throw Error('provided level out of bounds (0<level<256)');
    return this.http.get('/api/brightness/' + level);
  }

  getBrightness(): Observable<number> {
    return this.http.get('/api/brightness')
      .map(body => body.json().brightness);
  }

  getInitial(): Observable<Uint32Array> {
    return this.http.get('/api/img', {
      responseType: ResponseContentType.ArrayBuffer
    })
      .map(response => new Uint32Array(response.arrayBuffer(), 0, 288));
  }
}
