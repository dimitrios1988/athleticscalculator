import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingsComponent } from './meetings.component';
import { MeetingsService } from './meetings.service';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MeetingFiltersComponent } from './meeting-filters/meeting-filters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule, MatInputModule, MatToolbarModule, MatRippleModule } from '@angular/material';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { LoadingSpinnerModule } from '../../shared/components/loading-spinner/loading-spinner.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    MeetingsComponent,
    MeetingFiltersComponent,
    MeetingDetailsComponent,
  ],
  imports: [
    CommonModule,
    MeetingsRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    PipesModule,
    MatTableModule,
    LoadingSpinnerModule,
    MatButtonModule,
    MatToolbarModule,
    MatSortModule,
    MatRippleModule
  ],
  providers: [MeetingsService]
})
export class MeetingsModule { }
