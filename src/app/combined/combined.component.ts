import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CombinedEventEntity } from './entities/combined.event.entity';
import { CombinedService } from './combined.service';

@Component({
  selector: 'app-combined',
  templateUrl: './combined.component.html',
  styleUrls: ['./combined.component.scss']
})
export class CombinedComponent implements OnInit {

  public events$: Observable<CombinedEventEntity[]>;
  public selectedCombinedEvent: CombinedEventEntity;

  constructor(private combinedService: CombinedService) { }

  ngOnInit() {
    this.events$ = this.combinedService.getCombinedEvents();
  }

  public setCombinedEvent(combinedEvent: CombinedEventEntity) {
    this.selectedCombinedEvent = combinedEvent;
  }


}
