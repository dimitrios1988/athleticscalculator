import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeetingsPage } from './meetings.page';
import { MatToolbarModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, MatRippleModule, MatTableModule, MatSortModule, MatAutocompleteModule } from '@angular/material';
import { MeetingFiltersComponent } from './meeting-filters/meeting-filters.component';
import { MeetingsService } from './meetings.service';
import { PipesModule } from '../pipes/pipes.module';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorResponseInterceptor } from '../interceptors/error-response.interceptor';

const routes: Routes = [
  {
    path: '',
    component: MeetingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatTableModule,
    MatSortModule,
    MatAutocompleteModule,
    PipesModule,
  ],
  declarations: [MeetingsPage, MeetingFiltersComponent, MeetingDetailsComponent],
  providers: [
    MeetingsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorResponseInterceptor,
      multi: true
    }
  ],
})
export class MeetingsPageModule { }
