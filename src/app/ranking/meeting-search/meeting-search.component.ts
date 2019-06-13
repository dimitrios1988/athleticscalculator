import { Component, OnInit, Inject, ViewChild, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList, MatListOption } from "@angular/material";
import { GetMeetingsDto } from '../../meetings/dto/get-meetings.dto';
import { MeetingEntity } from '../../meetings/entities/meeting.entity';
import { SelectionModel } from '@angular/cdk/collections';
import { MeetingsService } from '../../meetings/meetings.service';
import { GetMeetingsDateRangeDto } from 'src/app/meetings/dto/getmeetingsdaterange.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-meeting-search",
  templateUrl: "./meeting-search.component.html",
  styleUrls: ["./meeting-search.component.scss"]
})
export class MeetingSearchComponent implements OnInit, OnDestroy {

  private serviceSubscription: Subscription;
  
  @ViewChild(MatSelectionList) meetings: MatSelectionList;
  selectedMeeting = {};
  Meetings = [];
  FilteredMeetings: MeetingEntity[];
  Years = [];

  constructor(
    public dialogRef: MatDialogRef<MeetingSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private meetingsService: MeetingsService
  ) {}

  ngOnInit() {
    this.serviceSubscription = new Subscription();
    let getMeetingsDateRangeSubscription = this.meetingsService.getMeetingsDateRange().subscribe((res: GetMeetingsDateRangeDto) => {
      let yearFrom = new Date(res.MinDate * 1000).getUTCFullYear();    
      let yearTo = new Date(res.MaxDate * 1000).getUTCFullYear();
      for(let i=yearFrom; i<=yearTo; i++){
        this.Years.push(i);
      }
    });
    this.serviceSubscription.add(getMeetingsDateRangeSubscription);
    
    this.meetings.selectedOptions = new SelectionModel<MatListOption>(false);
    this.getMeetings(this.getCurrentYear());
  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  getMeetings(year) {
    let getMeetingsSubscription = this.meetingsService.getMeetings(year, this.data.meetingCategories).subscribe((res: GetMeetingsDto[])=>{
      this.Meetings = res.map(m => new MeetingEntity(m));
      this.FilteredMeetings = [...this.Meetings];
    });
    this.serviceSubscription.add(getMeetingsSubscription);
  }

  filterMeetings(searchInput) {
    let searchTerms = searchInput.value.toLowerCase().split(" ").filter(s=>s!="");
  this.FilteredMeetings = this.Meetings.filter(m => {
    let meetingFound = true;
    searchTerms.forEach(searchTerm => {
      meetingFound = meetingFound && (m.Name.toLowerCase() + " " + m.City.toLowerCase() + m.Country.toLowerCase()).includes(searchTerm);
    });
     return meetingFound;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  returnSelectedMeeting(meetings){
    if(meetings.selectedOptions.selected.length>0){
      return meetings.selectedOptions.selected[0].value.MeetingCategory;
    }
    return null;    
  }

  getCurrentYear(){
    return new Date().getFullYear();
  }
}
