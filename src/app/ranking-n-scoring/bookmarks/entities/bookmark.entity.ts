import { EventEntity } from '../../ranking/entities/event.entity';
import { FormGroup } from '@angular/forms';

export class Bookmark {
  name: string;
  event: EventEntity;
  eventForm: FormGroup;

  constructor(data: {
    name: string,
    event: EventEntity,
    eventForm: FormGroup
  }) {
    if (!!data) {
      this.name = data.name;
      this.event = data.event;
      this.eventForm = data.eventForm;
    }
  }
}
