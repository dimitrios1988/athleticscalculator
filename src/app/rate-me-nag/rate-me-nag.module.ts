import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RateMeNagService } from './rate-me-nag.service';
import { RateMeNagInterceptor } from './rate-me-nag.interceptor';
import { StarRatingModule } from 'angular-star-rating';

import {MatDialogModule, MatFormFieldModule, MatButtonModule} from '@angular/material'; 
import { RateMeNagComponent } from './rate-me-nag.component';
import { FormsModule } from '@angular/forms';
import { ErrorResponseInterceptor } from '../interceptors/error-response.interceptor';

@NgModule({
  declarations: [RateMeNagComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    StarRatingModule.forRoot()
  ],
  providers: [RateMeNagService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RateMeNagInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorResponseInterceptor,
      multi: true
    },
  ]
})
export class RateMeNagModule { }
