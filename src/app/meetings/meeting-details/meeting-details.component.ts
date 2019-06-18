import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ViewChild
} from "@angular/core";
import { MeetingEntity } from "../entities/meeting.entity";
import { Subscription, Observable } from "rxjs";
import { MeetingsService } from "../meetings.service";
import { GetMeetingsDto } from "../dto/get-meetings.dto";
import { MatTableDataSource, MatSort } from "@angular/material";

@Component({
  selector: "app-meeting-details",
  templateUrl: "./meeting-details.component.html",
  styleUrls: ["./meeting-details.component.scss"]
})
export class MeetingDetailsComponent implements OnInit, OnChanges, OnDestroy {
  private serviceSubscription: Subscription;

  @Input()
  selectedFilters: {
    Month: number;
    Year: number;
    SearchText: string;
    MeetingCategory: string;
    Country: string;
  };

  @ViewChild(MatSort) sort: MatSort;

  Meetings: MeetingEntity[] = [];
  displayedColumns: string[] = [
    "Date",
    "Name",
    "City",
    "Country",
    "MeetingCategory"
  ];
  filteredMeetings: MeetingEntity[];
  dataSource: MatTableDataSource<MeetingEntity>;

  constructor(private meetingsService: MeetingsService) {
    this.serviceSubscription = new Subscription();
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.selectedFilters.previousValue == undefined ||
      changes.selectedFilters.currentValue.Year !==
        changes.selectedFilters.previousValue.Year
    ) {
      this.fetchMeetings(this.selectedFilters.Year).subscribe(
        (res: GetMeetingsDto[]) => {
          this.Meetings = res.map(m => {
            return new MeetingEntity(m);
          });
          
        }
      ).add(()=>{
        this.filterMeetings();
          this.dataSource = new MatTableDataSource(this.filteredMeetings);
          this.dataSource.sort = this.sort;
      });
    } else {
      console.log(this.selectedFilters);
      this.filterMeetings();
      this.dataSource = new MatTableDataSource(this.filteredMeetings);
      this.dataSource.sort = this.sort;
    }
  }

  private fetchMeetings(year): Observable<GetMeetingsDto[]> {
    return this.meetingsService.getMeetings(year, []);
  }

  private filterMeetings() {
    let searchTerms = this.selectedFilters.SearchText.toLowerCase()
      .split(" ")
      .filter(s => s != "");
    this.filteredMeetings = this.Meetings.filter(m => {
      let meetingFound = true;
      searchTerms.forEach(searchTerm => {
        meetingFound =
          meetingFound &&
          (
            m.Name.toLowerCase() +
            " " +
            m.City.toLowerCase() +
            m.Country.toLowerCase()
          ).includes(searchTerm);
      });
      if (this.selectedFilters.MeetingCategory) {
        meetingFound =
          meetingFound &&
          m.MeetingCategory == this.selectedFilters.MeetingCategory;
      }
      if (this.selectedFilters.Country) {
        meetingFound =
          meetingFound &&
          m.Country == this.selectedFilters.Country;
      }
      if (this.selectedFilters.Month != undefined) {
        meetingFound =
        meetingFound &&
        m.Date.getUTCMonth() == this.selectedFilters.Month;
      }
      return meetingFound;
    });
  }
}
