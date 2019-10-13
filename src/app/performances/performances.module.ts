import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerformancesPage } from './performances.page';
import { MatToolbarModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatProgressSpinnerModule, MatButtonModule, MatRippleModule, MatTableModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { ErrorResponseInterceptor } from '../interceptors/error-response.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PerformancesService } from './performances.service';
import { PipesModule } from '../pipes/pipes.module';
import { RateMeNagModule } from '../rate-me-nag/rate-me-nag.module';
import { RateMeNagComponent } from '../rate-me-nag/rate-me-nag.component';

const routes: Routes = [
  {
    path: '',
    component: PerformancesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,    
    MatRippleModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    PipesModule,
    RateMeNagModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [PerformancesPage],
  entryComponents: [RateMeNagComponent],
  providers: [
    PerformancesService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorResponseInterceptor,
    multi: true
  }
],
})
export class PerformancesPageModule {}
