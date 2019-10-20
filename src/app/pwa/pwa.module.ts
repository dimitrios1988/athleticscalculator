import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaService } from './pwa.service';
import { AppUpdateComponent } from './app-update/app-update.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppUpdateComponent],
  entryComponents: [AppUpdateComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    FlexLayoutModule
  ],
  providers: [PwaService]
})
export class PwaModule {
  constructor(pwaService: PwaService) { }
}
