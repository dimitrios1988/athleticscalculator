import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerformancesComponent } from './performances.component';

const routes: Routes = [{ path: '', component: PerformancesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformancesRoutingModule { }
