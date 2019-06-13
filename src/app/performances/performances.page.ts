import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PerformancesService } from "./performances.service";
import { GetPerformancesCmd } from "./cmd/get-performances.cmd";
import { GetPerformancesDto } from "./dto/get-performances.dto";
import { Subscription } from "rxjs";

@Component({
  selector: "app-performances",
  templateUrl: "./performances.page.html",
  styleUrls: ["./performances.page.scss"]
})
export class PerformancesPage implements OnInit, OnDestroy {
  
  private serviceSubscription: Subscription;
  
  public performanceForm: FormGroup;
  public performancesAreCalculated: boolean;  
  public performancesDic;
  public eventTableRows = [
    "60",
    "60h",
    "100",
    "110h",
    "100h",
    "200",
    "300",
    "400",
    "400h",
    "600",
    "800",
    "1000",
    "1500",
    "1mile",
    "2000",
    "3000",
    "3000sc",
    "2miles",
    "5000",
    "10000",
    "hj",
    "pv",
    "lj",
    "tj",
    "sp",
    "dt",
    "ht",
    "jt",
    "heptathlon",
    "pentathlon",
    "decathlon",
    "4x100",
    "4x200",
    "4x400",
    "5km",
    "10km",
    "20km",
    "halfmarathon",
    "marathon",
    "10km_rw",
    "20km_rw",
    "50km_rw"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private performancesService: PerformancesService,
    private _ngZone: NgZone
  ) {}

  ngOnInit() {
    this.serviceSubscription = new Subscription();
    this.performancesDic = {
      m: {},
      w: {}
    };
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

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  onGetPerformances() {
    this.performancesDic = { m: {}, w: {} };
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
    return (
      Object.entries(this.performancesDic.m).length +
        Object.entries(this.performancesDic.w).length >
      0
    );
  }
}
