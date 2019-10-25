import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  public installPrompt$;

  constructor(swUpdate: SwUpdate, private snackBar: MatSnackBar) {
    swUpdate.available.subscribe(event => {
      this.openSnackBar().afterDismissed().subscribe(() => window.location.reload());
    });

    this.installPrompt$ = fromEvent(window, 'beforeinstallprompt');
  }

  private openSnackBar() {
    return this.snackBar.open('App updated successfully! Restarting...', '', {
      duration: 2500,
    });
  }

}
