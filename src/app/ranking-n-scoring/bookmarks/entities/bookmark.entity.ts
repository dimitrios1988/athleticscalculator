import { EventEntity } from '../../ranking/entities/event.entity';
import { IEventDetailsFormData } from '../../interfaces/event-details-form-data.interface';

export class Bookmark {
  name: string;
  event: EventEntity;
  eventFormData: IEventDetailsFormData;
  points: {
    totalPoints?: number;
    totalPointsBeforeDeduction?: number;
  };

  constructor(data: { name: string, event: EventEntity, eventFormData: IEventDetailsFormData, points: { totalPoints: number, totalPointsBeforeDeduction: number } }) {
    this.name = data.name;
    this.event = data.event;
    this.eventFormData = data.eventFormData;
    this.points = data.points;
  }
}
