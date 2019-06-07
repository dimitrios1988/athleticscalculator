import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeetingsPage } from './meetings.page';
import { MatToolbarModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { MeetingFiltersComponent } from './meeting-filters/meeting-filters.component';

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
    IonicModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [MeetingsPage, MeetingFiltersComponent]
})
export class MeetingsPageModule {}
