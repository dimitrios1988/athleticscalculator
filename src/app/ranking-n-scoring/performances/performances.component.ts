import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Option } from './entities/option.entity';
import { isNullOrUndefined } from 'util';
import { GetPerformancesCmd } from './cmd/get-performances.cmd';
import { PerformancesService } from './performances.service';
import { GetPerformancesDto } from './dto/get-performances.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.scss']
})
export class PerformancesComponent implements OnInit {

  public performanceForm: FormGroup;
  public performancesAreCalculated: boolean;
  public performancesDic;
  public eventTableRows = [
    '60',
    '60h',
    '100',
    '110h',
    '100h',
    '200',
    '300',
    '400',
    '400h',
    '600',
    '800',
    '1000',
    '1500',
    '1mile',
    '2000',
    '3000',
    '3000sc',
    '2miles',
    '5000',
    '10000',
    'hj',
    'pv',
    'lj',
    'tj',
    'sp',
    'dt',
    'ht',
    'jt',
    'heptathlon',
    'pentathlon',
    'decathlon',
    '4x100',
    '4x200',
    '4x400',
    '5km',
    '10km',
    '20km',
    'halfmarathon',
    'marathon',
    '10km_rw',
    '20km_rw',
    '50km_rw'
  ];

  private savedOptions: Option;

  constructor(private formBuilder: FormBuilder, private performancesService: PerformancesService, private router: Router) {
    this.performancesAreCalculated = false;
    this.performancesDic = {
      m: {},
      w: {}
    };
    this.performanceForm = this.formBuilder.group({
      pointsInput: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^\\d+$'),
          Validators.min(1),
          Validators.max(1400)
        ])
      ],
      typeSelect: ['']
    });
    this.loadOptions();
    if (!isNullOrUndefined(router.getCurrentNavigation().extras.state)) {
      this.savedOptions.type = router.getCurrentNavigation().extras.state.type;
      this.savedOptions.points = router.getCurrentNavigation().extras.state.points;
    }
  }

  ngOnInit() {
    if (!isNullOrUndefined(this.savedOptions)) {
      if ((this.savedOptions.type !== '')) {
        this.performanceForm.controls.typeSelect.setValue(this.savedOptions.type);
      } else {
        this.performanceForm.controls.typeSelect.setValue('i');
      }
      if (!isNullOrUndefined(this.savedOptions.points)) {
        this.performanceForm.controls.pointsInput.setValue(this.savedOptions.points.toString());
      }
    } else {
      this.performanceForm.controls.typeSelect.setValue('i');
    }
  }

  public onGetPerformances() {
    this.onFilterSelection();
    this.performancesDic = { m: {}, w: {} };
    const getPerformancesCmd = new GetPerformancesCmd({
      Points: Number(this.performanceForm.controls.pointsInput.value),
      Type: this.performanceForm.controls.typeSelect.value
    });
    this.performancesAreCalculated = true;
    this.performancesService.getPerformances(getPerformancesCmd).subscribe((res: GetPerformancesDto[]) => {
      res.forEach(p => {
        const obj = {};
        obj[p.EventName] = p.Performance;
        this.performancesDic[p.EventGender][p.EventName] = p.Performance;
      });
    })
      .add(() => {
        this.performancesAreCalculated = false;
      });
  }

  public onFilterSelection() {
    this.savedOptions.type = this.performanceForm.controls.typeSelect.value;
    this.savedOptions.points = this.performanceForm.controls.pointsInput.value;
    this.saveOptions();
  }

  public tableIsEmpty() {
    return (
      ( Object.entries(this.performancesDic.m).length +
      Object.entries(this.performancesDic.w).length )
      === 0
    );
  }

  private loadOptions() {
    this.savedOptions = JSON.parse(localStorage.getItem('performancesOptions'));
    if (isNullOrUndefined(this.savedOptions)) {
      this.savedOptions = { points: null, type: '' };
    }
  }

  private saveOptions() {
    localStorage.setItem('performancesOptions', JSON.stringify(this.savedOptions));
  }

}
