import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  OnChanges
} from "@angular/core";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: "app-meeting-filters",
  templateUrl: "./meeting-filters.component.html",
  styleUrls: ["./meeting-filters.component.scss"]
})
export class MeetingFiltersComponent implements OnInit {
  
  @Output() onFiltersChanged: EventEmitter<any> = new EventEmitter();
  @Input() Years: number[] = [];
  @Input() Countries: string[] = [];

  objectKeys = Object.keys;
  number = Number;
  Months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
  };

  MeetingCategories: string[] = [
    "ow",
    "df",
    "gw",
    "gl",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ];

  MeetingFiltersForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.MeetingFiltersForm = this.formBuilder.group({
      yearSelect: [""],
      monthSelect: [""],
      countrySelect: [""],
      meetingCategorySelect: [""],
      searchInput: [""]
    });
  }

  ngOnInit() {
    this.MeetingFiltersForm.controls["monthSelect"].setValue(
      this.getCurrentMonth()
    );
    this.MeetingFiltersForm.controls["yearSelect"].setValue(
      this.getCurrentYear()
    );
    this.emitFilters();
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }

  getCurrentMonth() {
    return new Date().getMonth();
  }

  onClearFilters() {
    this.clearFilters();
  }

  emitFilters() {
    this.onFiltersChanged.next({
      Month: this.MeetingFiltersForm.controls["monthSelect"].value,
      Year: this.MeetingFiltersForm.controls["yearSelect"].value,
      SearchText: this.MeetingFiltersForm.controls["searchInput"].value,
      MeetingCategory: this.MeetingFiltersForm.controls["meetingCategorySelect"]
        .value,
      Country: this.MeetingFiltersForm.controls["countrySelect"].value
    });
  }

  private clearFilters() {
    this.MeetingFiltersForm.controls["searchInput"].setValue("");
    this.MeetingFiltersForm.controls["monthSelect"].setValue(undefined);
    this.MeetingFiltersForm.controls["yearSelect"].setValue(undefined);
    this.MeetingFiltersForm.controls["meetingCategorySelect"].setValue(
      undefined
    );
    this.MeetingFiltersForm.controls["countrySelect"].setValue(
      ""
    );
  }

}
