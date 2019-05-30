import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meetingCategory'
})
export class MeetingCategoryPipe implements PipeTransform {

  private meetingCategories = {
    "ow": "Olympics/World Championships",
    "df": "Diamond League Final",
    "gw": "GW",
    "gl": "GL",
    "a": "A",
    "b": "B",
    "c": "C",
    "d": "D",
    "e": "E",
    "f": "F",
  }

  transform(value: any, args?: any): any {
    return this.meetingCategories[value];
  }

}
