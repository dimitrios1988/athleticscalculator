import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList, MatListOption } from "@angular/material";
import { GetMeetingsDto } from '../../meetings/dto/get-meetings.dto';
import { MeetingEntity } from '../../meetings/entities/meeting.entity';
import { SelectionModel } from '@angular/cdk/collections';
import { MeetingsService } from '../../meetings/meetings.service';

@Component({
  selector: "app-meeting-search",
  templateUrl: "./meeting-search.component.html",
  styleUrls: ["./meeting-search.component.scss"]
})
export class MeetingSearchComponent implements OnInit {
  
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
    for(let i=2018; i<=this.getCurrentYear();i++){
      this.Years.push(i);
    }
    this.meetings.selectedOptions = new SelectionModel<MatListOption>(false);
    this.getMeetings(this.getCurrentYear());
  }

  getMeetings(year) {
    this.meetingsService.getMeetings(year, this.data.meetingCategories).subscribe((res: GetMeetingsDto[])=>{
      this.Meetings = res.map(m => new MeetingEntity(m));
      this.FilteredMeetings = [...this.Meetings];
    });
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
