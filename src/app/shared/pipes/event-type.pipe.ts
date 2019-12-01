import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventType'
})
export class EventTypePipe implements PipeTransform {
  private eventTypes = {
    i: 'Indoor',
    o: 'Outdoor',
    r: 'Road Race / XC'
  };

  transform(value: any, args?: any): any {
    return this.eventTypes[value];
  }
}
