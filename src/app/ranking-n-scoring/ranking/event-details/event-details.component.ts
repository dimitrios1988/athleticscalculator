import { Component, Input, OnChanges, AfterContentChecked } from '@angular/core';
import { EventEntity } from '../entities/event.entity';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { RankingService } from '../ranking.service';
import { GetPointsCmd } from '../cmd/get-points.cmd';
import { GetPointsDto } from '../dto/get-points.dto';
import { MatDialog } from '@angular/material';
import { MeetingSearchComponent } from '../meeting-search/meeting-search.component';
import { Router } from '@angular/router';
import { BookmarksService } from '../../bookmarks/bookmarks.service';
import { MeetingEntity } from '../../meetings/entities/meeting.entity';
import { isNullOrUndefined } from 'util';
import { SaveInfoComponent } from '../save-info/save-info.component';
import { PointsDeductor } from '../points-deductor';
import * as _ from 'lodash';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnChanges, AfterContentChecked {
  @Input()
  selectedEvent: EventEntity;

  public eventForm: FormGroup;
  public meetingCategories: string[];
  public pointsAreCalculated: boolean;
  public saveCompleted: number;
  private selectedMeeting: MeetingEntity;

  constructor(
    private rankingService: RankingService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private bookmarksService: BookmarksService
  ) {
    this.eventForm = this.createCleanForm();
  }

  ngOnChanges(changes): void {
    this.pointsAreCalculated = false;
    this.eventForm = this.createCleanForm();
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
    if (this.selectedEvent.SupportedPoints.PerformancePoints) {
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
    } else {
      this.eventForm.controls.performanceInput.clearValidators();
      this.eventForm.controls.windmeasuredSelect.clearValidators();
    }
    if (this.selectedEvent.SupportedPoints.RankingPoints) {
      if (
        this.eventForm.controls.calculatePlacePointsCheckbox.value ||
        (this.selectedEvent.SupportedPoints.RankingPoints &&
          !this.selectedEvent.SupportedPoints.PerformancePoints)
      ) {
        this.eventForm.controls.competitionTypeSelect.setValidators(Validators.required);
        if (this.eventForm.controls.competitionTypeSelect.value.HasProgressToFinal) {
          this.eventForm.controls.progressedToFinalCombo.setValidators(Validators.required);
          if (this.eventForm.controls.progressedToFinalCombo.value == 'true') {
            this.eventForm.controls.placeInput.setValidators(
              Validators.compose([Validators.pattern('^\\d+$'), Validators.min(1)])
            );
          } else {
            this.eventForm.controls.placeInput.setValidators(
              Validators.compose([
                Validators.required,
                Validators.pattern('^\\d+$'),
                Validators.min(1)
              ])
            );
          }
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
    }
    this.eventForm.controls.performanceInput.updateValueAndValidity();
    this.eventForm.controls.windmeasuredSelect.updateValueAndValidity();
    this.eventForm.controls.placeInput.updateValueAndValidity();
    this.eventForm.controls.competitionTypeSelect.updateValueAndValidity();
    this.eventForm.controls.meetingCategorySelect.updateValueAndValidity();
    this.eventForm.controls.windInput.updateValueAndValidity();
    this.eventForm.controls.progressedToFinalCombo.updateValueAndValidity();
  }

  async onCalculate(event?) {
    if (!isNullOrUndefined(event)) {
      event.preventDefault();
    }
    if (!this.selectedEvent.SupportedPoints.PerformancePoints) {
      this.eventForm.controls.performanceInput.setValue('');
      this.eventForm.controls.windInput.setValue('');
      this.eventForm.controls.windmeasuredSelect.setValue('');
      this.eventForm.controls.performancePoints.setValue('');
    }
    if (
      (!this.eventForm.controls.calculatePlacePointsCheckbox.value &&
        this.selectedEvent.SupportedPoints.PerformancePoints) ||
      !this.selectedEvent.SupportedPoints.RankingPoints
    ) {
      this.eventForm.controls.placeInput.setValue('');
      this.eventForm.controls.placePoints.setValue('');
      this.eventForm.controls.competitionTypeSelect.setValue('');
      this.eventForm.controls.meetingCategorySelect.setValue('');
      this.eventForm.controls.placePoints.setValue('');
      this.eventForm.controls.progressedToFinalCombo.setValue('');
    }
    const getPointsCmd: GetPointsCmd = this.eventFormToGetPointsCmd(
      this.eventForm,
      this.selectedEvent
    );
    this.pointsAreCalculated = true;
    this.eventForm = await this.getFormWithPoints(getPointsCmd, this.eventForm);
    this.pointsAreCalculated = false;
    this.eventForm.markAsPristine();
  }

  async getFormWithPoints(getPointsCmd: GetPointsCmd, eventForm: FormGroup) {
    const res: GetPointsDto = await this.rankingService.getPoints(getPointsCmd).toPromise();
    eventForm.controls.performancePoints.setValue(res.performancePoints);
    res.windPoints != null
      ? eventForm.controls.windPoints.setValue(res.windPoints)
      : eventForm.controls.windPoints.setValue('');
    if (
      eventForm.controls.calculatePlacePointsCheckbox.value ||
      (this.selectedEvent.SupportedPoints.RankingPoints &&
        !eventForm.controls.calculatePlacePointsCheckbox.value)
    ) {
      eventForm.controls.placePoints.setValue(res.categoryPlacePoints);
    } else {
      eventForm.controls.placePoints.setValue('');
    }
    eventForm.controls.totalPointsBeforeDeduction.setValue(0);
    if (res.categoryPlacePoints) {
      eventForm.controls.totalPointsBeforeDeduction.setValue(
        eventForm.controls.totalPointsBeforeDeduction.value + Number(res.categoryPlacePoints)
      );
    }
    if (res.windPoints) {
      eventForm.controls.totalPointsBeforeDeduction.setValue(
        eventForm.controls.totalPointsBeforeDeduction.value + Number(res.windPoints)
      );
    }
    if (res.performancePoints) {
      eventForm.controls.totalPointsBeforeDeduction.setValue(
        eventForm.controls.totalPointsBeforeDeduction.value + Number(res.performancePoints)
      );
    }
    if (eventForm.controls.competitionDate.value) {
      const targetDate = eventForm.controls.targetDate.value
        ? eventForm.controls.targetDate.value.toDate()
        : new Date();
      eventForm.controls.targetDate.setValue(targetDate);
      const points = PointsDeductor.getDeductedPoints(
        this.selectedEvent.PointsDeductionStrategy,
        eventForm.controls.competitionDate.value.toDate(),
        eventForm.controls.targetDate.value.toDate()
      );
      if (points == 'MAX') {
        eventForm.controls.datePoints.setValue('All points');
        eventForm.controls.totalPoints.setValue(0);
      } else {
        eventForm.controls.datePoints.setValue(points);
        eventForm.controls.totalPoints.setValue(
          Number(eventForm.controls.totalPointsBeforeDeduction.value) + Number(points)
        );
      }
    } else {
      eventForm.controls.totalPoints.setValue(eventForm.controls.totalPointsBeforeDeduction.value);
    }
    return eventForm;
  }

  private eventFormToGetPointsCmd(eventForm: FormGroup, selectedEvent: EventEntity): GetPointsCmd {
    const getPointsCmd = new GetPointsCmd();
    getPointsCmd.eventId = selectedEvent.Id;
    getPointsCmd.performance =
      eventForm.controls.performanceInput.value == ''
        ? null
        : eventForm.controls.performanceInput.value;
    if (selectedEvent.SupportsWind) {
      getPointsCmd.wind = { wasMeasured: false, value: null };
      if (eventForm.controls.windmeasuredSelect.value == 'true') {
        getPointsCmd.wind.wasMeasured = true;
        if (eventForm.controls.windInput.value) {
          getPointsCmd.wind.value = Number(eventForm.controls.windInput.value);
        }
      }
    }
    if (
      eventForm.controls.calculatePlacePointsCheckbox.value ||
      selectedEvent.SupportedPoints.RankingPoints
    ) {
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

  public createCleanForm(): FormGroup {
    const eventForm = this.formBuilder.group({
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
    eventForm.controls.targetDate.setValue(new Date());
    return eventForm;
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
    return this.eventForm.valid === true && this.eventForm.pristine;
  }

  public async onSaveResults() {
    const dialogRef = this.dialog.open(SaveInfoComponent, {
      maxWidth: '100vw',
      minWidth: '60vw',
      maxHeight: '100vh',
      data: {
        meetingName: this.selectedMeeting ? this.selectedMeeting.Name : ''
      }
    });
    dialogRef.afterClosed().subscribe(async data => {
      if (!isNullOrUndefined(data)) {
        let eventForms: { eventForm: FormGroup; isMain: boolean }[] = [];
        eventForms.push({ eventForm: this.eventForm, isMain: true });
        if (this.eventForm.controls.calculatePlacePointsCheckbox.value) {
          const secondaryForms = await this.getSecondaryForms();
          Array.prototype.push.apply(eventForms, secondaryForms);
        }

        try {
          this.bookmarksService.saveBookmark(data.name, this.selectedEvent, eventForms);
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

  private async getSecondaryForms(): Promise<{ eventForm: FormGroup; isMain: boolean }[]> {
    const isMarathonEvent =
      this.selectedEvent.Groups.filter(group => {
        if (
          group.Name == 'half_sim_to_marathon_25_30' ||
          group.Name == '20km_rw_sim_to_50' ||
          group.Name == '5000_sim_to_10000'
        ) {
          return group;
        }
      }).length > 0;

    if (isMarathonEvent) {
      const formDatas: { eventForm: FormGroup; isMain: boolean }[] = [];
      const groupsToGet = this.selectedEvent.Groups.filter(g => {
        return g.Id != this.eventForm.controls.competitionTypeSelect.value.Id;
      });
      for (let index = 0; index < groupsToGet.length; index++) {
        let form = this.cloneAbstractControl(this.eventForm);
        form.controls.competitionTypeSelect.setValue(groupsToGet[index]);
        const getPointsCmd = this.eventFormToGetPointsCmd(form, this.selectedEvent);
        form = await this.getFormWithPoints(getPointsCmd, form);
        formDatas.push({ eventForm: form, isMain: false });
      }
      return formDatas;
    }
  }

  private cloneAbstractControl<T extends AbstractControl>(control: T): T {
    let newControl: T;
    if (control instanceof FormGroup) {
      const formGroup = new FormGroup({}, control.validator, control.asyncValidator);
      const controls = control.controls;
      Object.keys(controls).forEach(key => {
        formGroup.addControl(key, this.cloneAbstractControl(controls[key]));
      });
      newControl = formGroup as any;
    } else if (control instanceof FormArray) {
      const formArray = new FormArray([], control.validator, control.asyncValidator);
      control.controls.forEach(formControl =>
        formArray.push(this.cloneAbstractControl(formControl))
      );
      newControl = formArray as any;
    } else if (control instanceof FormControl) {
      newControl = new FormControl(control.value, control.validator, control.asyncValidator) as any;
    } else {
      throw new Error('Error: unexpected control value');
    }
    if (control.disabled) {
      newControl.disable({ emitEvent: false });
    }
    return newControl;
  }

  public compareGroupsFn(g1, g2) {
    if (g1 && g1) {
      return g1.Id == g2.Id;
    }
  }
}
