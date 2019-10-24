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
import { CombinedEventDetailsComponent } from './combined-event-details/combined-event-details.component';
import { EventPanelComponent } from './combined-event-details/event-panel/event-panel.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CombinedComponent, CombinedEventFiltersComponent, CombinedEventDetailsComponent, EventPanelComponent],
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
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [CombinedService]
})
export class CombinedModule { }
