import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { RankingPage } from "./ranking.page";
import { EventFiltersComponent } from "./event-filters/event-filters.component";
import { RankingService } from "./ranking.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { EventDetailsComponent } from "./event-details/event-details.component";

import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule,
  MatDividerModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatListModule,
} from "@angular/material";

import { ErrorResponseInterceptor } from "../interceptors/error-response.interceptor";
import { PipesModule } from '../pipes/pipes.module';
import { RateMeNagModule } from '../rate-me-nag/rate-me-nag.module';
import { RateMeNagComponent } from '../rate-me-nag/rate-me-nag.component';
import { MeetingSearchComponent } from './meeting-search/meeting-search.component';

const routes: Routes = [
  {
    path: "",
    component: RankingPage
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
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    PipesModule,
    RateMeNagModule,
    MatDialogModule,
    MatListModule,
  ],
  declarations: [
    RankingPage,
    EventFiltersComponent,
    EventDetailsComponent,
    MeetingSearchComponent
  ],
  entryComponents: [RateMeNagComponent, MeetingSearchComponent],
  providers: [
    RankingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorResponseInterceptor,
      multi: true
    }
  ]
})
export class RankingPageModule {
}
