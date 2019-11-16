import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingRoutingModule } from './ranking-routing.module';
import { RankingComponent } from './ranking.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { EventFiltersComponent } from './event-filters/event-filters.component';
import { RankingService } from './ranking.service';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EventDetailsComponent } from './event-details/event-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { LoadingSpinnerModule } from '../../shared/components/loading-spinner/loading-spinner.module';
import { MeetingSearchComponent } from './meeting-search/meeting-search.component';
import { MeetingsService } from '../meetings/meetings.service';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { SaveInfoComponent } from './save-info/save-info.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AngularFittextModule } from 'angular-fittext';

@NgModule({
  declarations: [
    RankingComponent,
    EventFiltersComponent,
    EventDetailsComponent,
    MeetingSearchComponent,
    SaveInfoComponent
  ],
  entryComponents: [MeetingSearchComponent, SaveInfoComponent],
  imports: [
    CommonModule,
    RankingRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    HttpClientModule,
    MatRippleModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    PipesModule,
    LoadingSpinnerModule,
    MatListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    AngularFittextModule
  ],
  providers: [RankingService, MeetingsService],
})
export class RankingModule { }
