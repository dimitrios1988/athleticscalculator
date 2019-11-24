import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatListOption, MatSelectionList } from '@angular/material';
import { MeetingsService } from 'src/app/ranking-n-scoring/meetings/meetings.service';
import { GetMeetingsDateRangeDto } from 'src/app/ranking-n-scoring/meetings/dto/getmeetingsdaterange.dto';
import { GetMeetingsDto } from 'src/app/ranking-n-scoring/meetings/dto/get-meetings.dto';
import { MeetingEntity } from 'src/app/ranking-n-scoring/meetings/entities/meeting.entity';
import { SelectionModel } from '@angular/cdk/collections';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-meeting-search',
  templateUrl: './meeting-search.component.html',
  styleUrls: ['./meeting-search.component.scss']
})
export class MeetingSearchComponent implements OnInit {

  @ViewChild('meetingsList', { static: true })
  private meetingsList: MatSelectionList;
  public currentDate: { month: number, year: number };
  public years: number[];
  public filteredMeetings: MeetingEntity[];
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
  public meetingsLoading: boolean;

  private meetings: MeetingEntity[];

  constructor(
    private dialogRef: MatDialogRef<MeetingSearchComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private meetingsService: MeetingsService
  ) {
    this.filteredMeetings = [];
    const currentDate = new Date();
    this.currentDate = { month: currentDate.getMonth(), year: currentDate.getFullYear() };
    this.years = [this.currentDate.year];
    this.meetingsLoading = false;
  }

  ngOnInit(): void {
    this.getDateRange();
    this.getMeetings(this.currentDate.year, this.currentDate.month, '');
    this.meetingsList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  private getDateRange() {
    this.meetingsService
      .getMeetingsDateRange()
      .subscribe((res: GetMeetingsDateRangeDto) => {
        const yearFrom = new Date(res.MinDate * 1000).getUTCFullYear();
        const yearTo = new Date(res.MaxDate * 1000).getUTCFullYear();
        for (let i = yearFrom; i <= yearTo; i++) {
          this.years.push(i);
        }
        this.years = [...new Set(this.years)].sort((y1, y2) => y2 - y1);
      });
  }

  getMeetings(year: number, month: number, searchText: string) {
    this.meetingsLoading = true;
    this.meetingsService.getMeetings(year, this.data.meetingCategories)
      .subscribe((res: GetMeetingsDto[]) => {
        this.meetings = res.map(m => new MeetingEntity(m));
        this.filteredMeetings = [...this.meetings];
        this.filterMeetings(month, searchText);
      })
      .add(() => this.meetingsLoading = false);
  }

  filterMeetings(month: number, searchInput: string) {
    const searchTerms = searchInput.toLowerCase().split(' ').filter(s => s != '');
    this.filteredMeetings = this.meetings
      .filter(m => {
        if (!isNullOrUndefined(month)) {
          return m.Date.getUTCMonth() === month;
        } else {
          return m;
        }
      })
      .filter(m => {
        let meetingFound = true;
        searchTerms.forEach(searchTerm => {
          meetingFound = meetingFound && (m.Name.toLowerCase() + ' ' + m.City.toLowerCase() + m.Country.toLowerCase()).includes(searchTerm);
        });
        return meetingFound;
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  returnSelectedMeeting(meetingList) {
    if (meetingList.selectedOptions.selected.length > 0) {
      return meetingList.selectedOptions.selected[0].value;
    }
    return null;
  }
}
