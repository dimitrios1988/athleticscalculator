import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CombinedRoutingModule } from './combined-routing.module';
import { CombinedComponent } from './combined.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CombinedService } from './combined.service';
import { HttpClientModule } from '@angular/common/http';
import { CombinedEventFiltersComponent } from './combined-event-filters/combined-event-filters.component';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoadingSpinnerModule } from '../shared/components/loading-spinner/loading-spinner.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [CombinedComponent, CombinedEventFiltersComponent],
  imports: [
    CommonModule,
    CombinedRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatSelectModule,
    MatExpansionModule,
    LoadingSpinnerModule,
    PipesModule,
    MatFormFieldModule
  ],
  providers: [CombinedService]
})
export class CombinedModule { }
