import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CombinedEventEntity } from '../entities/combined.event.entity';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-combined-event-details',
  templateUrl: './combined-event-details.component.html',
  styleUrls: ['./combined-event-details.component.scss']
})
export class CombinedEventDetailsComponent implements OnInit {

  @Input()
  public selectedEvent: CombinedEventEntity;

  public totalPoints: string;

  public eventEmitter: Subject<string>;

  constructor() {
    this.totalPoints = '';
    this.eventEmitter = new Subject<string>();
  }

  ngOnInit() { }


  public invalidFormExists(): boolean {
    return false;
  }

  public onCalculateAll() {
    this.eventEmitter.next('calculate');
  }

  public clearAll() {
    this.totalPoints = '';
    this.eventEmitter.next('clear');
  }

  public setPoints(points: number) {
    if(this.totalPoints == '') {
      this.totalPoints = '0';
    }
    this.totalPoints = (Number(this.totalPoints) + points).toString();
  }

}
