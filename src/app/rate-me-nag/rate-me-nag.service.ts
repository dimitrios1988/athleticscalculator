import { Injectable } from "@angular/core";
import { AppComponent } from "../app.component";
import { MatDialog } from "@angular/material";
import { RateMeNagComponent } from "./rate-me-nag.component";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: "root"
})
export class RateMeNagService {
  private previousNag: number;
  private baseUrl = "/rating";
  

  constructor(
    private dialog: MatDialog,
    private httpClient: HttpClient,
  ) {
    this.previousNag = JSON.parse(localStorage.getItem("lastNagged"));
  }

  onRequestMade() {
    this.previousNag = JSON.parse(localStorage.getItem("lastNagged"));
    if (!this.previousNag) {
      setTimeout(() => this.showDialog(), 3000);
    } else if (
      Date.now() - this.previousNag > 86400000 / 2 &&
      localStorage.getItem("hasRated") != "true"
    ) {
      setTimeout(() => this.showDialog(), 3000);
    }
    
  }

  showDialog() {
    const dialogRef = this.dialog.open(RateMeNagComponent, {
    });
    dialogRef
      .afterClosed()
      .subscribe(result => {
        localStorage.setItem("lastNagged", JSON.stringify(Date.now()));
        if (result) {
          Promise.resolve(
            this.httpClient.put(environment.apiUrl + this.baseUrl, { Value: result }).toPromise()
          );
          localStorage.setItem("hasRated", "true");
        }
      });      
  }
}
