import {
  Component,
  OnInit,
  Input,
  OnChanges,
  AfterContentChecked,
  OnDestroy
} from '@angular/core';
import { EventEntity } from '../entities/event.entity';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RankingService } from '../ranking.service';
import { GetPointsCmd } from '../cmd/get-points.cmd';
import { GetPointsDto } from '../dto/get-points.dto';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MeetingSearchComponent } from '../meeting-search/meeting-search.component';
import { Router } from '@angular/router';
import { BookmarksService } from '../../bookmarks/bookmarks.service';
import { MeetingEntity } from '../../meetings/entities/meeting.entity';
import { isNullOrUndefined } from 'util';
import { SaveInfoComponent } from '../save-info/save-info.component';
import { timeout } from 'q';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent
  implements OnChanges, OnInit, AfterContentChecked, OnDestroy {
  @Input()
  selectedEvent: EventEntity;

  public eventForm: FormGroup;
  public meetingCategories: string[];
  public totalPointsBeforeDeduction: number;
  public totalPoints: number;
  public pointsAreCalculated: boolean;
  public saveCompleted: number;
  private serviceSubscription: Subscription;
  private selectedMeeting: MeetingEntity;

  constructor(
    private rankingService: RankingService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private bookmarksService: BookmarksService
  ) {
    this.serviceSubscription = new Subscription();
    this.eventForm = this.formBuilder.group({
      performanceInput: [''],
      windInput: ['', Validators.pattern('^([-]|[+])?\\d+([.][0-9])?$')],
      windmeasuredSelect: [''],
      windPoints: [{ value: '', disabled: true }],
      performancePoints: [{ value: '', disabled: true }],
      placeInput: [''],
      competitionTypeSelect: [''],
      meetingCategorySelect: [''],
      calculatePlacePointsCheckbox: [''],
      placePoints: [{ value: '', disabled: true }],
      progressedToFinalCombo: [''],
      datePicker: [''],
      datePoints: [{ value: '', disabled: true }],
    });
  }

  ngOnChanges() {
    this.pointsAreCalculated = false;
    this.clearForm();
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  ngAfterContentChecked() {
    this.updateFormValidation();
  }

  getMeetingCategories(event) {
    this.rankingService.getMeetingCategories(
      event.value.Id
    ).subscribe((meetingCategories: string[]) => {
      this.meetingCategories = meetingCategories;
    });
  }

  updateFormValidation() {
    this.eventForm.controls.performanceInput.setValidators(
      Validators.compose([
        Validators.required,
        Validators.pattern(this.selectedEvent.PerformanceValidation.Pattern)
      ])
    );
    if (this.selectedEvent.SupportsWind) {
      this.eventForm.controls.windmeasuredSelect.setValidators(
        Validators.required
      );
    } else {
      this.eventForm.controls.windmeasuredSelect.clearValidators();
    }
    if (this.eventForm.controls.windmeasuredSelect.value == 'true') {
      this.eventForm.controls.windInput.enable();
    } else {
      this.eventForm.controls.windInput.setValue('');
      this.eventForm.controls.windInput.disable();
    }
    if (this.eventForm.controls.calculatePlacePointsCheckbox.value) {
      this.eventForm.controls.placeInput.setValidators(
        Validators.compose([
          Validators.required,
          Validators.pattern('^\\d+$'),
          Validators.min(1)
        ])
      );
      this.eventForm.controls.competitionTypeSelect.setValidators(
        Validators.required
      );
      if (
        this.eventForm.controls.competitionTypeSelect.value
          .HasProgressToFinal
      ) {
        this.eventForm.controls.progressedToFinalCombo.setValidators(
          Validators.required
        );
      } else {
        this.eventForm.controls.progressedToFinalCombo.clearValidators();
      }
      this.eventForm.controls.meetingCategorySelect.setValidators(
        Validators.required
      );
    } else {
      this.eventForm.controls.placeInput.clearValidators();
      this.eventForm.controls.competitionTypeSelect.clearValidators();
      this.eventForm.controls.meetingCategorySelect.clearValidators();
      this.eventForm.controls.progressedToFinalCombo.clearValidators();
    }
    this.eventForm.controls.windmeasuredSelect.updateValueAndValidity();
    this.eventForm.controls.placeInput.updateValueAndValidity();
    this.eventForm.controls.competitionTypeSelect.updateValueAndValidity();
    this.eventForm.controls.meetingCategorySelect.updateValueAndValidity();
    this.eventForm.controls.windInput.updateValueAndValidity();
    this.eventForm.controls.progressedToFinalCombo.updateValueAndValidity();
  }

  onCalculate() {
    const getPointsCmd = new GetPointsCmd();
    getPointsCmd.eventId = this.selectedEvent.Id;
    getPointsCmd.performance = this.eventForm.controls.performanceInput.value;
    if (this.selectedEvent.SupportsWind) {
      getPointsCmd.wind = { wasMeasured: false, value: null };
      if (this.eventForm.controls.windmeasuredSelect.value == 'true') {
        getPointsCmd.wind.wasMeasured = true;
        if (this.eventForm.controls.windInput.value) {
          getPointsCmd.wind.value = Number(
            this.eventForm.controls.windInput.value
          );
        }
      }
    }

    if (this.eventForm.controls.calculatePlacePointsCheckbox.value) {
      getPointsCmd.groupId = this.eventForm.controls.competitionTypeSelect.value.Id;
      getPointsCmd.meetingCategory = this.eventForm.controls.meetingCategorySelect.value;
      getPointsCmd.place = Number(this.eventForm.controls.placeInput.value);
      getPointsCmd.progressToFinal = this.eventForm.controls.competitionTypeSelect.value.HasProgressToFinal
        ? this.eventForm.controls.progressedToFinalCombo.value == 'true'
        : null;
    } else {
      this.eventForm.controls.placeInput.setValue('');
      this.eventForm.controls.placePoints.setValue('');
      this.eventForm.controls.competitionTypeSelect.setValue('');
      this.eventForm.controls.meetingCategorySelect.setValue('');
      this.eventForm.controls.placePoints.setValue('');
      this.eventForm.controls.progressedToFinalCombo.setValue('');
    }

    this.pointsAreCalculated = true;
    const getPointsSubscription = this.rankingService
      .getPoints(getPointsCmd)
      .subscribe((res: GetPointsDto) => {
        this.eventForm.controls.performancePoints.setValue(
          res.performancePoints
        );
        res.windPoints != null
          ? this.eventForm.controls.windPoints.setValue(res.windPoints)
          : this.eventForm.controls.windPoints.setValue('');
        if (this.eventForm.controls.calculatePlacePointsCheckbox.value) {
          this.eventForm.controls.placePoints.setValue(
            res.categoryPlacePoints
          );
        } else {
          this.eventForm.controls.placePoints.setValue('');
        }
        this.totalPointsBeforeDeduction = 0;
        this.totalPointsBeforeDeduction += res.categoryPlacePoints
          ? res.categoryPlacePoints
          : 0;
        this.totalPointsBeforeDeduction += res.windPoints ? res.windPoints : 0;
        this.totalPointsBeforeDeduction += res.performancePoints ? res.performancePoints : 0;
        this.eventForm.markAsPristine();
      })
      .add(() => {
        this.pointsAreCalculated = false;
      }).add(() => {
        if (this.eventForm.controls.datePicker.value) {
          this.calculateDeductionPoints();
          if (this.eventForm.controls.datePoints.value == 'All points') {
            this.totalPoints = 0;
          } else {
            this.totalPoints = this.totalPointsBeforeDeduction + Number(this.eventForm.controls.datePoints.value);
          }
        } else {
          this.totalPoints = this.totalPointsBeforeDeduction;
        }
      });
    this.serviceSubscription.add(getPointsSubscription);
  }

  clearForm() {
    if (this.eventForm) {
      this.eventForm.controls.performanceInput.setValue('');
      this.eventForm.controls.windInput.setValue('');
      this.eventForm.controls.windmeasuredSelect.setValue('');
      this.eventForm.controls.windPoints.setValue('');
      this.eventForm.controls.performancePoints.setValue('');
      this.eventForm.controls.placeInput.setValue('');
      this.eventForm.controls.competitionTypeSelect.setValue('');
      this.eventForm.controls.calculatePlacePointsCheckbox.setValue(false);
      this.eventForm.controls.meetingCategorySelect.setValue('');
      this.eventForm.controls.placePoints.setValue('');
      this.eventForm.controls.progressedToFinalCombo.setValue('');
      this.eventForm.controls.datePoints.setValue('');
      this.eventForm.controls.datePicker.setValue('');
    }
    this.totalPointsBeforeDeduction = null;
    this.totalPoints = null;
  }

  private calculateDeductionPoints() {
    const diff = this.monthDiff(this.eventForm.controls.datePicker.value, new Date());
    if (this.selectedEvent.PointsDeductionStrategy.Max < diff) {
      this.eventForm.controls.datePoints.setValue('All points');
    } else {
      if (!isNullOrUndefined(this.selectedEvent.PointsDeductionStrategy.MonthPoints)) {
        if (!isNullOrUndefined(this.selectedEvent.PointsDeductionStrategy.MonthPoints[diff])) {
          this.eventForm.controls.datePoints.setValue(this.selectedEvent.PointsDeductionStrategy.MonthPoints[diff]);
        } else {
          this.eventForm.controls.datePoints.setValue('0');
        }
      } else {
        this.eventForm.controls.datePoints.setValue('0');
      }
    }
  }

  private monthDiff(d1: Date, d2: Date) {
    let months: number;
    months = (d2.getFullYear() - (d1.getFullYear())) * 12;
    months += (d2.getMonth() - d1.getMonth());
    if (d2.getDate() < d1.getDate()) {
      months -= 1;
    }
    return months <= 0 ? 0 : months;
  }

  comparePerformances() {
    this.router.navigateByUrl('/rns/performances', {
      state: {
        points: this.eventForm.controls.performancePoints.value,
        type: this.selectedEvent.Type
      }
    });
  }

  onSearchMeetings() {
    this.eventForm.markAsDirty();
    const dialogRef = this.dialog.open(MeetingSearchComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { meetingCategories: this.meetingCategories },
    });
    dialogRef.afterClosed().subscribe((result: MeetingEntity) => {
      this.selectedMeeting = result;
      if (!isNullOrUndefined(this.selectedMeeting)) {
        this.eventForm.controls.meetingCategorySelect.setValue(this.selectedMeeting.MeetingCategory);
      }
    });
  }

  public canSave(): boolean {
    return this.eventForm.valid === true
      && this.eventForm.pristine
      && this.eventForm.controls.performancePoints.value !== ''
      || (this.eventForm.controls.performancePoints.value !== '' && this.eventForm.controls.placePoints.value !== '');
  }

  public onSaveResults() {
    const dialogRef = this.dialog.open(SaveInfoComponent, {
      maxWidth: '100vw',
      minWidth: '50vw',
      maxHeight: '100vh',
      data: {
        meetingName: this.selectedMeeting ? this.selectedMeeting.Name : '',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!isNullOrUndefined(result)) {
        try {
          this.bookmarksService.saveBookmark(
            result.name,
            this.selectedEvent,
            this.eventForm,
            { totalPoints: this.totalPoints, totalPointsBeforeDeduction: this.totalPointsBeforeDeduction }
          );
          this.saveCompleted = 1;
        } catch (e) {
          this.saveCompleted = 0;
        }
        setTimeout(() => {
          this.saveCompleted = null;
          this.eventForm.markAsDirty();
        }, 2500);
      }
    });
  }
}
