import { Component, OnInit, Input, OnChanges, AfterContentChecked, OnDestroy } from '@angular/core';
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
import { PointsDeductor } from '../points-deductor';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnChanges, OnInit, AfterContentChecked, OnDestroy {
  @Input()
  selectedEvent: EventEntity;

  public eventForm: FormGroup;
  public meetingCategories: string[];
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
      competitionDate: [''],
      targetDate: [''],
      datePoints: [{ value: '', disabled: true }],
      totalPoints: ['', { value: 0 }],
      totalPointsBeforeDeduction: ['', { value: 0 }]
    });
  }

  ngOnChanges() {
    this.pointsAreCalculated = false;
    this.clearForm();
  }

  ngOnInit() {
    this.eventForm.controls.targetDate.setValue(new Date());
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
    this.rankingService
      .getMeetingCategories(event.value.Id)
      .subscribe((meetingCategories: string[]) => {
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
      this.eventForm.controls.windmeasuredSelect.setValidators(Validators.required);
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
      this.changePlaceValidation();
      this.eventForm.controls.competitionTypeSelect.setValidators(Validators.required);
      if (this.eventForm.controls.competitionTypeSelect.value.HasProgressToFinal) {
        this.eventForm.controls.progressedToFinalCombo.setValidators(Validators.required);
      } else {
        this.eventForm.controls.progressedToFinalCombo.clearValidators();
      }
      this.eventForm.controls.meetingCategorySelect.setValidators(Validators.required);
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

  onCalculate(event?) {
    if (!isNullOrUndefined(event)) {
      event.preventDefault();
    }
    const getPointsCmd: GetPointsCmd = this.eventFormToGetPointsCmd(
      this.eventForm,
      this.selectedEvent
    );

    if (!this.eventForm.controls.calculatePlacePointsCheckbox.value) {
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
        this.eventForm.controls.performancePoints.setValue(res.performancePoints);
        res.windPoints != null
          ? this.eventForm.controls.windPoints.setValue(res.windPoints)
          : this.eventForm.controls.windPoints.setValue('');
        if (this.eventForm.controls.calculatePlacePointsCheckbox.value) {
          this.eventForm.controls.placePoints.setValue(res.categoryPlacePoints);
        } else {
          this.eventForm.controls.placePoints.setValue('');
        }
        this.eventForm.controls.totalPointsBeforeDeduction.setValue(0);
        if (res.categoryPlacePoints) {
          this.eventForm.controls.totalPointsBeforeDeduction.setValue(
            this.eventForm.controls.totalPointsBeforeDeduction.value +
              Number(res.categoryPlacePoints)
          );
        }
        if (res.windPoints) {
          this.eventForm.controls.totalPointsBeforeDeduction.setValue(
            this.eventForm.controls.totalPointsBeforeDeduction.value + Number(res.windPoints)
          );
        }
        if (res.performancePoints) {
          this.eventForm.controls.totalPointsBeforeDeduction.setValue(
            this.eventForm.controls.totalPointsBeforeDeduction.value + Number(res.performancePoints)
          );
        }
        this.eventForm.markAsPristine();
      })
      .add(() => {
        this.pointsAreCalculated = false;
      })
      .add(() => {
        if (this.eventForm.controls.competitionDate.value) {
          const targetDate = this.eventForm.controls.targetDate.value
            ? this.eventForm.controls.targetDate.value
            : new Date();
          this.eventForm.controls.targetDate.setValue(targetDate);
          const points = PointsDeductor.getDeductedPoints(
            this.selectedEvent.PointsDeductionStrategy,
            this.eventForm.controls.competitionDate.value.toDate(),
            this.eventForm.controls.targetDate.value.toDate()
          );
          if (points == 'MAX') {
            this.eventForm.controls.datePoints.setValue('All points');
            this.eventForm.controls.totalPoints.setValue(0);
          } else {
            this.eventForm.controls.datePoints.setValue(points);
            this.eventForm.controls.totalPoints.setValue(
              Number(this.eventForm.controls.totalPointsBeforeDeduction.value) + Number(points)
            );
          }
        } else {
          this.eventForm.controls.totalPoints.setValue(
            this.eventForm.controls.totalPointsBeforeDeduction.value
          );
        }
      });
    this.serviceSubscription.add(getPointsSubscription);
  }

  private eventFormToGetPointsCmd(eventForm: FormGroup, selectedEvent: EventEntity): GetPointsCmd {
    const getPointsCmd = new GetPointsCmd();
    getPointsCmd.eventId = selectedEvent.Id;
    getPointsCmd.performance = eventForm.controls.performanceInput.value;
    if (selectedEvent.SupportsWind) {
      getPointsCmd.wind = { wasMeasured: false, value: null };
      if (eventForm.controls.windmeasuredSelect.value == 'true') {
        getPointsCmd.wind.wasMeasured = true;
        if (eventForm.controls.windInput.value) {
          getPointsCmd.wind.value = Number(eventForm.controls.windInput.value);
        }
      }
    }
    if (eventForm.controls.calculatePlacePointsCheckbox.value) {
      getPointsCmd.groupId = eventForm.controls.competitionTypeSelect.value.Id;
      getPointsCmd.meetingCategory = eventForm.controls.meetingCategorySelect.value;
      getPointsCmd.place = Number(eventForm.controls.placeInput.value);
      getPointsCmd.progressToFinal = eventForm.controls.competitionTypeSelect.value
        .HasProgressToFinal
        ? eventForm.controls.progressedToFinalCombo.value == 'true'
        : null;
    }

    return getPointsCmd;
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
      this.eventForm.controls.competitionDate.setValue('');
      this.eventForm.controls.targetDate.setValue(new Date());
      this.eventForm.markAsUntouched();
      this.eventForm.controls.totalPoints.setValue('');
      this.eventForm.controls.totalPointsBeforeDeduction.setValue('');
    }
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
      data: { meetingCategories: this.meetingCategories }
    });
    dialogRef.afterClosed().subscribe((result: MeetingEntity) => {
      this.selectedMeeting = result;
      if (!isNullOrUndefined(this.selectedMeeting)) {
        this.eventForm.controls.meetingCategorySelect.setValue(
          this.selectedMeeting.MeetingCategory
        );
      }
    });
  }

  public canSave(): boolean {
    return (
      (this.eventForm.valid === true &&
        this.eventForm.pristine &&
        this.eventForm.controls.performancePoints.value !== '') ||
      (this.eventForm.controls.performancePoints.value !== '' &&
        this.eventForm.controls.placePoints.value !== '')
    );
  }

  public onSaveResults() {
    const dialogRef = this.dialog.open(SaveInfoComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      maxHeight: '100vh',
      data: {
        meetingName: this.selectedMeeting ? this.selectedMeeting.Name : ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result)) {
        try {
          this.bookmarksService.saveBookmark(result.name, this.selectedEvent, this.eventForm, {
            totalPoints: this.eventForm.controls.totalPoints.value,
            totalPointsBeforeDeduction: this.eventForm.controls.totalPointsBeforeDeduction.value
          });
          this.saveCompleted = 1;
        } catch (e) {
          this.saveCompleted = 0;
        }
        setTimeout(() => {
          this.saveCompleted = null;
          this.eventForm.markAsDirty();
        }, 3000);
      }
    });
  }

  public changePlaceValidation() {
    this.eventForm.controls.placeInput.clearValidators();
    if (!isNullOrUndefined(this.eventForm.controls.progressedToFinalCombo.value)) {
      if (this.eventForm.controls.progressedToFinalCombo.value == 'true') {
        this.eventForm.controls.placeInput.setValidators(
          Validators.compose([Validators.pattern('^\\d+$'), Validators.min(1)])
        );
      } else {
        this.eventForm.controls.placeInput.setValidators(
          Validators.compose([Validators.required, Validators.pattern('^\\d+$'), Validators.min(1)])
        );
      }
    } else {
      this.eventForm.controls.placeInput.setValidators(
        Validators.compose([Validators.required, Validators.pattern('^\\d+$'), Validators.min(1)])
      );
    }
    this.eventForm.controls.placeInput.updateValueAndValidity();
  }
}
