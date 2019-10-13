import { Component, OnInit, OnDestroy } from '@angular/core';
import { PwaService } from './pwa/pwa.service';
import { fromEvent, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public isOnline: boolean;
  private onlineEvent: Observable<Event>;
  private offlineEvent: Observable<Event>;

  constructor() {
    this.isOnline = window.navigator.onLine;
  }

  ngOnInit(): void {

    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.isOnline = true;
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.isOnline = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
