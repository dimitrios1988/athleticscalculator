import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEntity } from '../entities/event.entity';
import { MatSelect } from '@angular/material/select';
import { isNullOrUndefined, isNumber } from 'util';
import { nextTick } from 'q';
import { Option } from '../entities/option.entity';

@Component({
  selector: 'app-event-filters',
  templateUrl: './event-filters.component.html',
  styleUrls: ['./event-filters.component.scss']
})
export class EventFiltersComponent implements OnInit, OnChanges {
  public genders: string[];
  public eventTypes: string[];
  public filteredEvents: EventEntity[];
  public isLoading: boolean;

  @Input('events')
  private events$: Observable<EventEntity[]>;

  @ViewChild('gender', { static: false })
  private selectedGender: MatSelect;

  @ViewChild('eventType', { static: false })
  private selectedEventType: MatSelect;

  @ViewChild('selectedEvent', { static: false })
  private selectedEvent: MatSelect;

  @Output('onEventSelected')
  private eventEmitter: EventEmitter<EventEntity>;

  private events: EventEntity[];
  private savedOptions: Option;

  constructor() {
    this.isLoading = false;
    this.eventEmitter = new EventEmitter<EventEntity>();
    this.loadOptions();
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading = true;
    this.events$.subscribe(
      (events: EventEntity[]) => {
        this.events = events.sort((event1: EventEntity, event2: EventEntity) =>  {
          return event1.Order - event2.Order;
        });
        this.genders = [...new Set(events.map((event: EventEntity) => event.Gender))];
        this.eventTypes = [...new Set(events.map((event: EventEntity) => event.Type))];
        this.filterEvents(this.selectedGender.value, this.selectedEventType.value);
      }
    ).add(() => {
      this.isLoading = false;
    }).add(() => {

      if (!isNullOrUndefined(this.savedOptions)) {
        const eventId = this.savedOptions.selectedEvent;
        if (!isNullOrUndefined(eventId)) {
          const savedEvent = this.events.find(e => e.Id == eventId);
          this.selectedEventType.value = savedEvent.Type;
          this.selectedGender.value = savedEvent.Gender;
          this.selectedEvent.value = savedEvent;
          this.filterEvents(savedEvent.Gender, savedEvent.Type);
          this.onEventSelection(this.selectedEvent.value);
        }
      }
    });
  }

  filterEvents(genderOption, eventTypeOption) {
    this.filteredEvents = this.events.filter(
      (event: EventEntity) => {
        return (event.Gender === genderOption) && (event.Type === eventTypeOption);
      });
    const associatedEvent: EventEntity = this.filteredEvents.find((event: EventEntity) => {
      if (!isNullOrUndefined(this.selectedEvent.value)) {
        return event.Name === this.selectedEvent.value.Name;
      } else {
        return false;
      }
    });
    this.selectedEvent.value = associatedEvent;
    this.onEventSelection(associatedEvent);
  }

  onEventSelection(event: EventEntity): void {
    if (!isNullOrUndefined(event)) {
      this.savedOptions.selectedEvent = event.Id;
      this.saveOptions();
    }
    this.eventEmitter.emit(event);
  }

  private saveOptions() {
    localStorage.setItem('rankingOptions', JSON.stringify(this.savedOptions));
  }

  private loadOptions() {
    this.savedOptions = JSON.parse(localStorage.getItem('rankingOptions'));
    if (isNullOrUndefined(this.savedOptions)) {
      this.savedOptions = { selectedEvent: null };
    }
  }

}
