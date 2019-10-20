import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  SimpleChanges
} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { GetMeetingsDto } from '../dto/get-meetings.dto';
import { Observable } from 'rxjs';
import { MeetingEntity } from '../entities/meeting.entity';
import { MeetingFilterEntity } from '../entities/meeting-filter.entity';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss']
})
export class MeetingDetailsComponent implements OnChanges {
  @Input()
  private filters: MeetingFilterEntity;

  @Input()
  private meetings$: Observable<GetMeetingsDto[]>;

  @ViewChild(MatSort, { static: false })
  private sort: MatSort;

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<MeetingEntity>;
  public isLoading: boolean;

  private Meetings: MeetingEntity[];
  private filteredMeetings: MeetingEntity[];

  constructor() {
    this.isLoading = false;
    this.Meetings = [];
    this.displayedColumns = [
      'Date',
      'Name',
      'City',
      'Country',
      'MeetingCategory'
    ];
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.filters.firstChange ||
      changes.filters.currentValue.Year !== changes.filters.previousValue.Year
    ) {
      this.isLoading = true;
      this.meetings$.subscribe((res: GetMeetingsDto[]) => {
        this.Meetings = res.map(m => {
          return new MeetingEntity(m);
        });
      }).add(() => {
        this.isLoading = false;
        this.filterMeetings();
        this.dataSource = new MatTableDataSource(this.filteredMeetings);
        this.dataSource.sort = this.sort;
      });
    } else {
      this.filterMeetings();
      this.dataSource = new MatTableDataSource(this.filteredMeetings);
      this.dataSource.sort = this.sort;
    }
  }

  private filterMeetings() {
    this.filters.SearchText = isNullOrUndefined(this.filters.SearchText) ? '' : this.filters.SearchText;
    const searchTerms = this.filters.SearchText.toLowerCase()
      .split(' ')
      .filter(s => s !== '');
    this.filteredMeetings = this.Meetings.filter(m => {
      let meetingFound = true;
      searchTerms.forEach(searchTerm => {
        meetingFound =
          meetingFound &&
          (
            m.Name.toLowerCase() +
            ' ' +
            m.City.toLowerCase() +
            m.Country.toLowerCase()
          ).includes(searchTerm);
      });
      if (this.filters.MeetingCategory) {
        meetingFound =
          meetingFound && m.MeetingCategory === this.filters.MeetingCategory;
      }
      if (this.filters.Country) {
        meetingFound = meetingFound && m.Country === this.filters.Country;
      }
      if (this.filters.Month != undefined) {
        meetingFound =
          meetingFound && m.Date.getUTCMonth() === this.filters.Month;
      }
      return meetingFound;
    });
  }
}
