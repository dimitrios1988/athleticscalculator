import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'eventName'
})
export class EventNamePipe implements PipeTransform {
  private eventName = {
    '100': '100m',
    '200': '200m',
    '300': '300m',
    '400': '400m',
    '600': '600m',
    '800': '800m',
    '1500': '1.500m',
    '1mile': 'Mile',
    '2miles': '2 Miles',
    '1000': '1.000m',
    '2000': '2.000m',
    '3000': '3.000m',
    '5000': '5.000m',
    '10000': '10.000m',
    '110h': '110m hurdles',
    '100h': '100m hurdles',
    '400h': '400m hurdles',
    '3000sc': '3.000m steeplechase',
    hj: 'High Jump',
    pv: 'Pole Vault',
    lj: 'Long Jump',
    tj: 'Triple Jump',
    sp: 'Shot Put',
    dt: 'Discus Throw',
    jt: 'Javelin',
    ht: 'Hammer Throw',
    decathlon: 'Decathlon',
    '4x100': '4x100m Relay',
    '4x200': '4x200m Relay',
    '4x400': '4x400m Relay',
    '60': '60m',
    heptathlon: 'Heptathlon',
    '60h': '60m hurdles',
    pentathlon: 'Pentathlon',
    marathon: 'Marathon',
    '5km': '5km',
    '10km': '10km',
    '20km': '20km',
    halfmarathon: 'Half Marathon',
    '10km_rw': '10km Race Walking',
    '20km_rw': '20km Race Walking',
    '50km_rw': '50km Race Walking',
    '10000_xc': '10000m Cross Country',
    '10000_xc_u20': '10000m Cross Country U20'
  };

  transform(value: any, args?: any): any {
    return this.eventName[value];
  }
}
