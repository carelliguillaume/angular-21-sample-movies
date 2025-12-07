import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {

  transform(birthdate: Date): number {
    console.log('3B - AgePipe - transform - birthdate', birthdate);
    const now = new Date();
    const diffMs = now.getTime() - birthdate.getTime();
    const avgYearMs = 365.2425 * 24 * 3600 * 1000;
    return Math.floor(diffMs / avgYearMs);
  }
}
