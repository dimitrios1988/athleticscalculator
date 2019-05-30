import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PerformancesService } from "./performances.service";
import { GetPerformancesCmd } from "./cmd/get-performances.cmd";
import { GetPerformancesDto } from "./dto/get-performances.dto";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-performances',
  templateUrl: './performances.page.html',
  styleUrls: ['./performances.page.scss']
})
export class PerformancesPage implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }

  public performanceForm: FormGroup;
  public performancesAreCalculated: boolean;
  private serviceSubscription: Subscription;
  public performancesDic = {
    m: {},
    w: {}
  };

  constructor(
    private formBuilder: FormBuilder,
    private performancesService: PerformancesService
  ) { }

  ngOnInit() {
    this.serviceSubscription = new Subscription();
    this.performancesAreCalculated = false;
    this.performanceForm = this.formBuilder.group({
      pointsInput: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^\\d+$"),
          Validators.min(1),
          Validators.max(1400)
        ])
      ],
      typeSelect: [""]
    });
    this.performanceForm.controls["typeSelect"].setValue("i");
  }

  onGetPerformances() {
    let getPerformancesCmd = new GetPerformancesCmd({
      Points: Number(this.performanceForm.controls["pointsInput"].value),
      Type: this.performanceForm.controls["typeSelect"].value
    });

    this.performancesAreCalculated = true;
    let getPerformancesSubscription = this.performancesService
      .getPerformances(getPerformancesCmd)
      .subscribe((res: GetPerformancesDto[]) => {
        res.forEach(p => {
          let obj = {};
          obj[p.EventName] = p.Performance;
          this.performancesDic[p.EventGender][p.EventName] = p.Performance;
        });
      })
      .add(() => {
        this.performancesAreCalculated = false;
      });
    this.serviceSubscription.add(getPerformancesSubscription);
  }

  tableIsEmpty() {
    return Object.entries(this.performancesDic.m).length + Object.entries(this.performancesDic.w).length > 0
  }
}
