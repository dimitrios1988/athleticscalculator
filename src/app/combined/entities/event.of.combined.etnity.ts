import { CombinedEventEntity } from './combined.event.entity';

export class EventOfCombinedEntity {
  public Id: number;
  public Event: string;
  public AParam: string;
  public BParam: string;
  public CParam: string;
  public DParam: string;
  public Order: number;
  public CombinedEvent: CombinedEventEntity;
  public Icon: string;
  public PerformanceValidation: {
    Pattern: string;
    Message: string;
  };
}
