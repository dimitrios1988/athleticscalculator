import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformancesRoutingModule } from './performances-routing.module';
import { PerformancesComponent } from './performances.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { LoadingSpinnerModule } from 'src/app/shared/components/loading-spinner/loading-spinner.module';
import { HttpClientModule } from '@angular/common/http';
import { PerformancesService } from './performances.service';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [PerformancesComponent],
  imports: [
    CommonModule,
    PerformancesRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    PipesModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatRippleModule,
    LoadingSpinnerModule,
    MatTableModule
  ],
  providers: [PerformancesService]
})
export class PerformancesModule { }
