import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'competitionType'
})
export class CompetitionTypePipe implements PipeTransform {
  private CompetitionTypes = {
    'basic_final': 'Final',
    'basic_semi_max_9': 'Round before -> Final has max. 9 athletes',
    'basic_semi_more_9': 'Round before -> Final has 10 or more athletes',
    'extra_final': 'Final',
    'extra_semi_ow': 'Round before Final in Olympics/World Championships',
    'extra_semi_max_9': 'Round before -> Final has max. 9 athletes',
    'extra_semi_more_9': 'Round before -> Final has 10 or more athletes',
    '10000_event': '10.000m Event',
    '5000_sim_to_10000': '5.000m Event similar to 10.000m',
    'world_xc_senior': 'XC WCh for 10.000m',
    'world_xc_u20': 'World Cross Country U20',
    'combined': 'Combined',
    'marathon': 'Marathon',
    'half_sim_to_marathon_25_30': 'Half for Marathon',
    'road_running': 'Road Running',
    '20km_rw': '20km Race Walking',
    '50km_rw': '50km Race Walking',
    '20km_rw_sim_to_50': '20km Race Walking similar to 50km',
  };
  transform(value: any, args?: any): any {
    return this.CompetitionTypes[value];
  }
}
