import { EventEntity } from '../../ranking/entities/event.entity';
import { FormGroup } from '@angular/forms';

export class Bookmark {
  event: EventEntity;
  eventForm: FormGroup;

  constructor(data: {
    event: EventEntity,
    eventForm: FormGroup
  }) {
    if (!!data) {
      this.event = data.event;
      this.eventForm = data.eventForm;
    }
  }
}
