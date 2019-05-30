import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerformancesPage } from './performances.page';
import { MatToolbarModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatProgressSpinnerModule, MatButtonModule, MatRippleModule, MatTableModule } from '@angular/material';
import { ErrorResponseInterceptor } from '../interceptors/error-response.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PerformancesService } from './performances.service';
import { PipesModule } from '../pipes/pipes.module';

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
    PipesModule,
    HttpClientModule,
  ],
  declarations: [PerformancesPage],
  providers: [
    PerformancesService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorResponseInterceptor,
    multi: true
  }]
})
export class PerformancesPageModule {}
