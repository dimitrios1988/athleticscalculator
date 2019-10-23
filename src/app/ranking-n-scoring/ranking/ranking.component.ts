import { Component, OnInit } from '@angular/core';
import { RankingService } from './ranking.service';
import { Observable } from 'rxjs';
import { EventEntity } from './entities/event.entity';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  public events$: Observable<EventEntity[]>;
  public selectedEvent: EventEntity;

  constructor(rankingService: RankingService) {
    this.events$ = rankingService.getEvents();
  }

  ngOnInit() { }

  setEvent(event: EventEntity) {
    this.selectedEvent = event;
  }

}
