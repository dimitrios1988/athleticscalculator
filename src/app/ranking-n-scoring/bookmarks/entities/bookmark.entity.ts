import { EventEntity } from '../../ranking/entities/event.entity';
import { IBookmarkData } from '../../interfaces/event-details-form-data.interface';

export class Bookmark {
  name: string;
  event: EventEntity;
  bookmarkData: IBookmarkData[];

  constructor(data: { name: string; event: EventEntity; bookmarkData: IBookmarkData[] }) {
    this.name = data.name;
    this.event = data.event;
    this.bookmarkData = data.bookmarkData;
  }
}
