import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
