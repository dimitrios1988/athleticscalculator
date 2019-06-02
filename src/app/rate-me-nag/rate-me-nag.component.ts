import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RateMeNagService } from "./rate-me-nag.service";

@Component({
  selector: "app-rate-me-nag",
  templateUrl: "./rate-me-nag.component.html",
  styleUrls: ["./rate-me-nag.component.scss"]
})
export class RateMeNagComponent implements OnInit {
  rating: number;

  constructor(
    public dialogRef: MatDialogRef<RateMeNagComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.rating = 3.0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    window.open("https://play.google.com/store/apps/details?id=dchondrokoukis.athleticspointscalculator", "_blank");
  }
}
