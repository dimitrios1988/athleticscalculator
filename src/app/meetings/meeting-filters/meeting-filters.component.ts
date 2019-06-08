import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../meetings.service';

@Component({
  selector: 'app-meeting-filters',
  templateUrl: './meeting-filters.component.html',
  styleUrls: ['./meeting-filters.component.scss'],
})
export class MeetingFiltersComponent implements OnInit {

  Filters: {Years: string[]; Name: string; Countries: string[];}

  constructor(meetingsService: MeetingsService) { 
    let currentYear = new Date().getFullYear();
    this.Filters = {Years:[],Name:'',Countries:[]}
    
  }

  ngOnInit() {}

}
