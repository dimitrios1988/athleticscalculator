import { EventOfCombinedEntity } from './event.of.combined.etnity';

export class CombinedEventEntity {

  public Id: number;
  public Name: string;
  public Gender: string;
  public Type: string;
  public Order: number;
  public Events: EventOfCombinedEntity[];

}
