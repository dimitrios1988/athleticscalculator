import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { RankingService } from "./ranking.service";
import { EventEntity } from "./entities/event.entity";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-ranking",
  templateUrl: "./ranking.page.html",
  styleUrls: ["./ranking.page.scss"]
})
export class RankingPage implements OnInit, OnDestroy {
  events: EventEntity[];
  selectedEvent: EventEntity;
  refresher;
  navigationSubscription: Subscription;
  

  constructor(
    // … your declarations here
    private router: Router,
    private rankingService: RankingService
  ) {
    // subscribe to the router events - storing the subscription so
    // we can unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {
    this.getEvents();
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private getEvents() {
    return this.rankingService.getEvents().subscribe((res: EventEntity[]) => {
      this.events = res.sort((e1, e2) => {
        if (e1.Order > e2.Order) return 1;
        else if (e1.Order < e2.Order) return -1;
        return 0;
      });
    });
  }

  selectEvent(event) {
    this.selectedEvent = event;
  }

  doRefresh(event) {
    this.getEvents().add(event.detail.complete());
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
  }
}
