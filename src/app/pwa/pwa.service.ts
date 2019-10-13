import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AppUpdateComponent } from './app-update/app-update.component';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  constructor(swUpdate: SwUpdate, private snackBar: MatSnackBar) {
    swUpdate.available.subscribe(event => {
      this.openSnackBar().afterDismissed().subscribe(() => window.location.reload());
    });

  }

  private openSnackBar() {
    return this.snackBar.openFromComponent(AppUpdateComponent, {
      duration: 3 * 1000,
    });
  }
}
