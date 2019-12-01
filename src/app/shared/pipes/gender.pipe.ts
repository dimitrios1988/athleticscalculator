import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {
  private values = {
    m: 'Men',
    w: 'Women'
  };

  transform(value: any, args?: any): any {
    return this.values[value];
  }
}
