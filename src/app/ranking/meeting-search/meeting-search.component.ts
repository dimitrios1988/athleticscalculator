import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList, MatListOption } from "@angular/material";
import { RankingService } from '../ranking.service';
import { GetMeetingsDto } from '../dto/get-meetings.dto';
import { MeetingEntity } from '../entities/meeting.entity';
import { SelectionModel } from '@angular/cdk/collections';

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
    private rankingService: RankingService
  ) {}

  ngOnInit() {
    for(let i=2018; i<=this.getCurrentYear();i++){
      this.Years.push(i);
    }
    this.meetings.selectedOptions = new SelectionModel<MatListOption>(false);
    this.getMeetings(this.getCurrentYear());
  }

  getMeetings(year) {
    this.rankingService.getMeetings(year, this.data.meetingCategories).subscribe((res: GetMeetingsDto[])=>{
      this.Meetings = res.map(m => new MeetingEntity(m));
      this.FilteredMeetings = [...this.Meetings];
    });
  }

  filterMeetings(searchInput) {
  this.FilteredMeetings = this.Meetings.filter(m => {
     return m.Name.toLowerCase().includes(searchInput.value.toLowerCase()) || 
      m.City.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      m.Country.toLowerCase().includes(searchInput.value.toLowerCase());
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
