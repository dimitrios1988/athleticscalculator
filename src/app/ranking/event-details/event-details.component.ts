import {
  Component,
  OnInit,
  Input,
  OnChanges,
  AfterContentChecked,
  OnDestroy,
} from "@angular/core";
import { EventEntity } from "../entities/event.entity";
import { RankingService } from "../ranking.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GetPointsCmd } from "../cmd/get-points.cmd";
import { GetPointsDto } from "../dto/get-points.dto";
import { Subscription } from "rxjs";
import { MatDialog } from '@angular/material';
import { MeetingSearchComponent } from '../meeting-search/meeting-search.component';

@Component({
  selector: "app-event-details",
  templateUrl: "./event-details.component.html",
  styleUrls: ["./event-details.component.scss"]
})
export class EventDetailsComponent
  implements OnChanges, OnInit, AfterContentChecked, OnDestroy {
  
  @Input()
  selectedEvent: EventEntity;

  public eventForm: FormGroup;
  public meetingCategories: string[];
  public totalPoints: number;
  public pointsAreCalculated: boolean;
  private serviceSubscription: Subscription;

  constructor(
    private rankingService: RankingService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {}

  ngOnChanges() {
    this.pointsAreCalculated = false;
    this.meetingCategories = [];
    this.clearForm();
  }

  ngOnInit() {
    this.serviceSubscription = new Subscription();
    this.eventForm = this.formBuilder.group({
      performanceInput: [""],
      windInput: ["", Validators.pattern("^([-]|[+])?\\d+([.][0-9])?$")],
      windmeasuredSelect: [""],
      windPoints: [{ value: "", disabled: true }],
      performancePoints: [{ value: "", disabled: true }],
      placeInput: [""],
      competitionTypeSelect: [""],
      meetingCategorySelect: [""],
      calculatePlacePointsCheckbox: [""],
      placePoints: [{ value: "", disabled: true }],
      progressedToFinalCombo: [""]
    });
  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  ngAfterContentChecked() {
    this.updateFormValidation();
  }

  getMeetingCategories(event) {
    this.meetingCategories = [];
    this.rankingService
      .getMeetingCategories(event.value.Id)
      .subscribe((res: string[]) => {
        this.meetingCategories = res;
      });
  }

  updateFormValidation() {
    this.eventForm.controls["performanceInput"].setValidators(
      Validators.compose([
        Validators.required,
        Validators.pattern(this.selectedEvent.PerformanceValidation.Pattern)
      ])
    );
    if (this.selectedEvent.SupportsWind) {
      this.eventForm.controls["windmeasuredSelect"].setValidators(
        Validators.required
      );
    } else {
      this.eventForm.controls["windmeasuredSelect"].clearValidators();
    }
    if (this.eventForm.controls["windmeasuredSelect"].value == "true") {
      this.eventForm.controls["windInput"].enable();
    } else {
      this.eventForm.controls["windInput"].setValue("");
      this.eventForm.controls["windInput"].disable();
    }
    if (this.eventForm.controls["calculatePlacePointsCheckbox"].value) {
      this.eventForm.controls["placeInput"].setValidators(
        Validators.compose([
          Validators.required,
          Validators.pattern("^\\d+$"),
          Validators.min(1)
        ])
      );
      this.eventForm.controls["competitionTypeSelect"].setValidators(
        Validators.required
      );
      if (
        this.eventForm.controls["competitionTypeSelect"].value
          .HasProgressToFinal
      ) {
        this.eventForm.controls["progressedToFinalCombo"].setValidators(
          Validators.required
        );
      } else {
        this.eventForm.controls["progressedToFinalCombo"].clearValidators();
      }
      this.eventForm.controls["meetingCategorySelect"].setValidators(
        Validators.required
      );
    } else {
      this.eventForm.controls["placeInput"].clearValidators();
      this.eventForm.controls["competitionTypeSelect"].clearValidators();
      this.eventForm.controls["meetingCategorySelect"].clearValidators();
      this.eventForm.controls["progressedToFinalCombo"].clearValidators();
    }
    this.eventForm.controls["windmeasuredSelect"].updateValueAndValidity();
    this.eventForm.controls["placeInput"].updateValueAndValidity();
    this.eventForm.controls["competitionTypeSelect"].updateValueAndValidity();
    this.eventForm.controls["meetingCategorySelect"].updateValueAndValidity();
    this.eventForm.controls["windInput"].updateValueAndValidity();
    this.eventForm.controls["progressedToFinalCombo"].updateValueAndValidity();
  }

  onCalculate() {
    let getPointsCmd = new GetPointsCmd();
    getPointsCmd.eventId = this.selectedEvent.Id;
    getPointsCmd.performance = this.eventForm.controls[
      "performanceInput"
    ].value;
    if (this.selectedEvent.SupportsWind) {
      getPointsCmd.wind = { wasMeasured: false, value: null };
      if (this.eventForm.controls["windmeasuredSelect"].value == "true") {
        getPointsCmd.wind.wasMeasured = true;
        if (this.eventForm.controls["windInput"].value) {
          getPointsCmd.wind.value = Number(
            this.eventForm.controls["windInput"].value
          );
        }
      }
    }

    if (this.eventForm.controls["calculatePlacePointsCheckbox"].value) {
      getPointsCmd.groupId = this.eventForm.controls[
        "competitionTypeSelect"
      ].value.Id;
      getPointsCmd.meetingCategory = this.eventForm.controls[
        "meetingCategorySelect"
      ].value;
      getPointsCmd.place = Number(this.eventForm.controls["placeInput"].value);
      getPointsCmd.progressToFinal = this.eventForm.controls[
        "competitionTypeSelect"
      ].value.HasProgressToFinal
        ? Boolean(this.eventForm.controls["progressedToFinalCombo"].value)
        : null;
    }

    this.pointsAreCalculated = true;
    let getPointsSubscription = this.rankingService
      .getPoints(getPointsCmd)
      .subscribe((res: GetPointsDto) => {
        this.eventForm.controls["performancePoints"].setValue(
          res.performancePoints
        );
        res.windPoints != null
          ? this.eventForm.controls["windPoints"].setValue(res.windPoints)
          : this.eventForm.controls["windPoints"].setValue("");
        this.eventForm.controls["placePoints"].setValue(
          res.categoryPlacePoints
        );
        this.totalPoints = 0;
        this.totalPoints += res.categoryPlacePoints
          ? res.categoryPlacePoints
          : 0;
        this.totalPoints += res.windPoints ? res.windPoints : 0;
        this.totalPoints += res.performancePoints ? res.performancePoints : 0;
      })
      .add(() => {
        this.pointsAreCalculated = false;
      });
      this.serviceSubscription.add(getPointsSubscription)
  }

  clearForm() {
    if (this.eventForm) {
      this.eventForm.controls["performanceInput"].setValue("");
      this.eventForm.controls["windInput"].setValue("");
      this.eventForm.controls["windmeasuredSelect"].setValue("");
      this.eventForm.controls["windPoints"].setValue("");
      this.eventForm.controls["performancePoints"].setValue("");
      this.eventForm.controls["placeInput"].setValue("");
      this.eventForm.controls["competitionTypeSelect"].setValue("");
      this.eventForm.controls["calculatePlacePointsCheckbox"].setValue(false);
      this.eventForm.controls["meetingCategorySelect"].setValue("");
      this.eventForm.controls["placePoints"].setValue("");
      this.eventForm.controls["progressedToFinalCombo"].setValue("");
    }
    this.totalPoints = null;
  }

  onSearchMeetings() {
    const dialogRef = this.dialog.open(MeetingSearchComponent, {
      width: "100%",    
      data: {meetingCategories: this.meetingCategories}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.eventForm.controls["meetingCategorySelect"].setValue(result);
    });
  }
}
