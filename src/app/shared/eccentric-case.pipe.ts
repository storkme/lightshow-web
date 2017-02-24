import { Pipe, PipeTransform } from '@angular/core';
/*
 * Take a string and capitalize every 6th letter. Why not?
 */
@Pipe({ name: 'eccentricCase' })
export class EccentricCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').map((c, i) => i % 6 === 0 ? c.toUpperCase() : c).join('');
  }
}
