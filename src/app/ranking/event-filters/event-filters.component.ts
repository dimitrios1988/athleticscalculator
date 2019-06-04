import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  Input,
  OnChanges
} from "@angular/core";
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
    if (this.Events) {
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

  eventSelected(event: { value: any }): void {
    if (event != undefined && event != null) {
      if (event instanceof CustomEvent) {
        this.onEventSelection.next(event.detail);
      } else this.onEventSelection.next(event.value);
    } else {
      this.onEventSelection.next(null);
    }
  }

  compareFn = function(o1, o2) {
    if (o1 && o2) {
      if (o1.Name == o2.Name) {
        let e = new CustomEvent("selectionChange", {
          detail: o1
        });
        this._elementRef.nativeElement.dispatchEvent(e);
        return true;
      }
    }
    let e = new CustomEvent("selectionChange", {
      detail: null
    });
    this._elementRef.nativeElement.dispatchEvent(e);
    return false;
  };
}
