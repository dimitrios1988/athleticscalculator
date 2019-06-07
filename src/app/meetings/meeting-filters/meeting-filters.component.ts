import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting-filters',
  templateUrl: './meeting-filters.component.html',
  styleUrls: ['./meeting-filters.component.scss'],
})
export class MeetingFiltersComponent implements OnInit {

  Filters: {Years: string[]; Name: string; Countries: string[];}

  constructor() { 
    let currentYear = new Date().getFullYear();
    
  }

  ngOnInit() {}

}
