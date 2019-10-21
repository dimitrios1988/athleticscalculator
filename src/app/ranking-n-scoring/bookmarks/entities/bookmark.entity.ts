import { EventEntity } from '../../ranking/entities/event.entity';
import { FormGroup } from '@angular/forms';

export class Bookmark {
  name: string;
  event: EventEntity;
  eventForm: FormGroup;
  points: {
    totalPoints?: number;
    totalPointsBeforeDeduction?: number;
  };

  constructor({ name, event, eventForm, points }) {
    this.name = name;
    this.event = event;
    this.eventForm = eventForm;
    this.points = points;
  }
}
