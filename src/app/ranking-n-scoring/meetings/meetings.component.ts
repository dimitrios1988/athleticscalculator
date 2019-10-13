import { Component } from '@angular/core';
import { MeetingsService } from './meetings.service';
import { Observable } from 'rxjs';
import { GetMeetingsDateRangeDto } from './dto/getmeetingsdaterange.dto';
import { MeetingFilterEntity } from './entities/meeting-filter.entity';
import { GetMeetingsDto } from './dto/get-meetings.dto';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent {

  public countries$: Observable<string[]>;
  public years$: Observable<GetMeetingsDateRangeDto>;
  public meetingFilters: MeetingFilterEntity;
  public meetings$: Observable<GetMeetingsDto[]>;

  constructor(private meetingsService: MeetingsService) {
    this.countries$ = meetingsService.getCountries();
    this.years$ = meetingsService.getMeetingsDateRange();
  }

  onApplyFilters(filters: MeetingFilterEntity) {
    this.meetingFilters = filters;
    this.meetings$ = filters.Year ? this.meetingsService.getMeetings(filters.Year, []) : this.meetingsService.getMeetings(null, []);
  }

}
