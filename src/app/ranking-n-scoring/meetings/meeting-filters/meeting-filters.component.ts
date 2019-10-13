import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { GetMeetingsDateRangeDto } from '../dto/getmeetingsdaterange.dto';
import { MeetingFilterEntity } from '../entities/meeting-filter.entity';
import { MatStep, MatSelect, MatInput } from '@angular/material';

@Component({
  selector: 'app-meeting-filters',
  templateUrl: './meeting-filters.component.html',
  styleUrls: ['./meeting-filters.component.scss']
})
export class MeetingFiltersComponent implements OnInit, OnChanges {

  @Input()
  private yearRange$: Observable<GetMeetingsDateRangeDto>;

  @Input()
  public countries$: Observable<string[]>;

  @Output()
  public filtersChanged: EventEmitter<MeetingFilterEntity>;

  public objectKeys = Object.keys;
  public number = Number;
  public Months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  };

  public Years: number[];

  public MeetingCategories: string[] = [
    'ow',
    'df',
    'gw',
    'gl',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
  ];

  public currentDate: {
    Month: number, Year: number
  };

  public isLoading: boolean;

  constructor() {
    this.filtersChanged = new EventEmitter<MeetingFilterEntity>();
    this.isLoading = false;
    const currentDate = new Date();
    this.currentDate = {
      Month: currentDate.getMonth(),
      Year: currentDate.getFullYear()
    };
    this.Years = [this.currentDate.Year];
  }

  ngOnInit() {
    this.onApplyFilters(this.currentDate.Month, this.currentDate.Year, null, null, null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading = true;
    this.yearRange$.subscribe((yearRange: GetMeetingsDateRangeDto) => {
      const yearFrom = new Date(yearRange.MinDate * 1000).getUTCFullYear();
      const yearTo = new Date(yearRange.MaxDate * 1000).getUTCFullYear();
      for (let i = yearFrom; i <= yearTo; i++) {
        this.Years.push(i);
      }
      this.Years = [... new Set(this.Years)].sort((y1, y2) => y2 - y1);
    }).add(() => {
      this.isLoading = false;
    });
  }

  onApplyFilters(month: number, year: number, meetingCategory: string, country: string, searchText: string) {
    const filters = new MeetingFilterEntity(
      {
        Month: month,
        Year: year,
        MeetingCategory: meetingCategory,
        Country: country,
        SearchText: searchText
      });
    this.filtersChanged.emit(filters);
  }

  public clearFilters(month: MatSelect, year: MatSelect, meetingCategory: MatSelect, country: MatSelect, search: MatInput) {
    month.value = null;
    year.value = null;
    meetingCategory.value = null;
    country.value = null;
    search.value = '';
    this.onApplyFilters(null, null, null, null, '');
  }

}
