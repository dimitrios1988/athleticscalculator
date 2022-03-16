import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "eventType",
})
export class EventTypePipe implements PipeTransform {
  private eventTypes = {
    i: "indoor",
    o: "outdoor",
    r: "road race & cross country",
  };

  transform(value: any, args?: any): any {
    return this.eventTypes[value];
  }
}
