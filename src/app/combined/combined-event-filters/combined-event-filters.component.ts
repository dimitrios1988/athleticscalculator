import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CombinedEventEntity } from '../entities/combined.event.entity';
import { MatSelect } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { CombinedService } from '../combined.service';
import { Option } from '../entities/option.entity';

@Component({
  selector: 'app-combined-event-filters',
  templateUrl: './combined-event-filters.component.html',
  styleUrls: ['./combined-event-filters.component.scss']
})
export class CombinedEventFiltersComponent implements OnInit, OnChanges {

  public filteredEvents: CombinedEventEntity[];
  public genders: string[];
  public combinedEventTypes: string[];
  public isLoading: boolean;
  public savedOptions: Option;

  @Input('events')
  private events$: Observable<CombinedEventEntity[]>;

  @Output('onEventSelected')
  private eventEmitter: EventEmitter<CombinedEventEntity>;

  @ViewChild('gender', { static: false })
  private selectedGender: MatSelect;

  @ViewChild('combinedEventType', { static: false })
  private selectedEventType: MatSelect;

  @ViewChild('selectedCombinedEvent', { static: false })
  private selectedCombinedEvent: MatSelect;

  private combinedEvents: CombinedEventEntity[];

  constructor(private combinedService: CombinedService) {
    this.isLoading = false;
    this.combinedEvents = [];
    this.eventEmitter = new EventEmitter<CombinedEventEntity>();
    this.savedOptions = this.loadOptions();
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading = true;
    changes.events$.currentValue.subscribe((combinedEvents: CombinedEventEntity[]) => {
      this.combinedEvents = combinedEvents.sort((event1: CombinedEventEntity, event2: CombinedEventEntity) => {
        return event1.Order - event2.Order;
      });
      this.genders = [...new Set(combinedEvents.map((combinedEvent: CombinedEventEntity) => combinedEvent.Gender))];
      this.combinedEventTypes = [...new Set(combinedEvents.map((combinedEvent: CombinedEventEntity) => combinedEvent.Type))];
      this.filterEvents(this.selectedGender.value, this.selectedEventType.value);
    }).add(() => {
      this.isLoading = false;
    }).add(() => {
      if (!isNullOrUndefined(this.savedOptions)) {
        const eventId = this.savedOptions.selectedEvent;
        if (!isNullOrUndefined(eventId)) {
          const savedEvent = this.combinedEvents.find(e => e.Id == eventId);
          this.selectedEventType.value = savedEvent.Type;
          this.selectedGender.value = savedEvent.Gender;
          this.selectedCombinedEvent.value = savedEvent;
          this.filterEvents(savedEvent.Gender, savedEvent.Type);
          this.onEventSelection(this.selectedCombinedEvent.value);
        }
      }
    });
  }

  public filterEvents(genderOption, eventTypeOption) {
    this.filteredEvents = this.combinedEvents.filter(
      (event: CombinedEventEntity) => {
        return (event.Gender === genderOption) && (event.Type === eventTypeOption);
      });
    const associatedEvent: CombinedEventEntity = this.filteredEvents.find((event: CombinedEventEntity) => {
      if (!isNullOrUndefined(this.selectedCombinedEvent.value)) {
        return event.Name === this.selectedCombinedEvent.value.Name;
      } else {
        return false;
      }
    });
    if (this.filteredEvents.length === 1) {
      this.selectedCombinedEvent.value = this.filteredEvents[0];
      this.onEventSelection(this.filteredEvents[0]);
    } else {
      this.selectedCombinedEvent.value = associatedEvent;
      this.onEventSelection(associatedEvent);
    }
  }

  onEventSelection(event: CombinedEventEntity): void {
    if (!isNullOrUndefined(event)) {
      this.savedOptions.selectedEvent = event.Id;
      this.saveOptions();
    }
    this.eventEmitter.emit(event);
  }

  savePanelState(isExpanded: boolean) {
    this.savedOptions.filtersPanelExpanded = isExpanded;
    this.saveOptions();
  }

  private saveOptions() {
    this.combinedService.saveOptions(this.savedOptions);
  }

  private loadOptions(): Option {
    return this.combinedService.loadOptions();
  }


}
