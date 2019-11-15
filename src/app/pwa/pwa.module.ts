import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaService } from './pwa.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    FlexLayoutModule
  ],
})
export class PwaModule {
  constructor() { }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PwaModule,
      providers: [PwaService]
    };
  }
}
