import { Component, OnInit, Output, EventEmitter, ElementRef, Input, OnChanges } from "@angular/core";
import { RankingService } from "../ranking.service";
import { EventEntity } from "../entities/event.entity";

@Component({
  selector: "app-event-filters",
  templateUrl: "./event-filters.component.html",
  styleUrls: ["./event-filters.component.scss"]
})
export class EventFiltersComponent implements OnInit, OnChanges {
  
  
  constructor(private rankingService: RankingService) {}

  //private events: EventEntity[];
  filteredEvents: EventEntity[];
  genders: string[];
  eventTypes: string[];
  filters = { gender: "", type: "" };

  @Output() onEventSelection: EventEmitter<any> = new EventEmitter();
  @Input() Events: EventEntity[];

  ngOnChanges(): void {
    if(this.Events){
      this.genders = Array.from(new Set(this.Events.map(r => r.Gender)));
      this.eventTypes = Array.from(new Set(this.Events.map(r => r.Type)));
      this.filters.gender = this.genders[0];
      this.filters.type = this.eventTypes[0];
      this.filterEvents();
    }    
  }

  ngOnInit() {}

  filterEvents() {
    this.filteredEvents = this.Events.filter(e => {
      return e.Gender == this.filters.gender && e.Type == this.filters.type;
    });
  }

  eventSelected(event: { value: any; }) {
    if (event != undefined && event != null) {
      this.onEventSelection.emit(event.value);
    } else {
      this.onEventSelection.emit(null);
    }
  }
}
