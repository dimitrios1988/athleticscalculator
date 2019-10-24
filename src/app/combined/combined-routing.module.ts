import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CombinedComponent } from './combined.component';


const routes: Routes = [{ path: '', component: CombinedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CombinedRoutingModule { }
