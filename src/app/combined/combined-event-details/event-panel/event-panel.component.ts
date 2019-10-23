import { Component, OnInit, Input, EventEmitter, OnChanges, Output } from '@angular/core';
import { EventOfCombinedEntity } from '../../entities/event.of.combined.etnity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-panel',
  templateUrl: './event-panel.component.html',
  styleUrls: ['./event-panel.component.scss']
})
export class EventPanelComponent implements OnInit {


  @Input()
  public eventOfCombined: EventOfCombinedEntity;

  @Input()
  eventListener: Observable<string>;

  @Output()
  pointsEmitter: EventEmitter<number>;

  public eventForm: FormGroup;
  public points: string;


  constructor(private formBuilder: FormBuilder) {
    this.eventForm = this.formBuilder.group({
      performanceInput: ['']
    });
    this.points = '';
    this.pointsEmitter = new EventEmitter<number>();
  }

  ngOnInit() {
    this.eventForm.controls.performanceInput.setValidators(Validators.pattern(this.eventOfCombined.PerformanceValidation.Pattern));
    this.eventListener.subscribe((cmd: string) => {
      if (cmd === 'clear') {
        this.clearForm();
      }
      if (cmd === 'calculate') {
        if (!this.eventForm.invalid) {
          this.onCalculate();
          this.pointsEmitter.emit(Number(this.points));
        }
      }
    });
  }

  public onCalculate(event?) {
    if (!isNullOrUndefined(event)) {
      event.preventDefault();
    }
    const performance = Number(this.eventForm.controls.performanceInput.value) * Number(this.eventOfCombined.DParam);
    let points = Number(this.eventOfCombined.AParam) * Math.pow(Math.abs(performance - Number(this.eventOfCombined.BParam)), Number(this.eventOfCombined.CParam))
    this.points = Math.floor(points).toString();
  }

  public clearForm() {
    this.points = '';
    this.eventForm.controls.performanceInput.setValue('');
    this.eventForm.markAsUntouched();
  }

}
