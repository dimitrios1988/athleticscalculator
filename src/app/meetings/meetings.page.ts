import { Component, OnInit, OnDestroy } from "@angular/core";
import { MeetingsService } from "./meetings.service";
import { GetMeetingsDateRangeDto } from './dto/getmeetingsdaterange.dto';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: "app-meetings",
  templateUrl: "./meetings.page.html",
  styleUrls: ["./meetings.page.scss"]
})
export class MeetingsPage implements OnInit, OnDestroy {

  selectedFilters = {};
  Years: number[];
  Countries: string[];
  private serviceSubscription: Subscription;

  constructor(private meetingsService: MeetingsService) {
    this.Years = [];
    this.Countries = [];
    this.serviceSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.serviceSubscription.add(this.getYearsRange());
    this.serviceSubscription.add(this.getCountries());
  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  applyFilters(event: {
    Month: number;
    Year: number;
    SearchText: string;
    MeetingCategory: string;
    Country: string[];
  }) {
    this.selectedFilters = event;
  }

  doRefresh(event) {
    this.ngOnInit();
    Observable.bind(this.serviceSubscription);
    event.detail.complete();
  }

  private getYearsRange() {
    return this.meetingsService
      .getMeetingsDateRange()
      .subscribe((res: GetMeetingsDateRangeDto) => {
        this.Years = [];
        let yearFrom = new Date(res.MinDate * 1000).getUTCFullYear();
        let yearTo = new Date(res.MaxDate * 1000).getUTCFullYear();
        for (let i = yearFrom; i <= yearTo; i++) {
          this.Years.push(i);
        }
      });
  }

  private getCountries() {
    return this.meetingsService
      .getCountries()
      .subscribe((res: string[]) => {
        this.Countries = res;
      });
  }
}
