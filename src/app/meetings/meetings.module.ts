import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeetingsPage } from './meetings.page';
import { MatToolbarModule } from '@angular/material';

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
    MatToolbarModule
  ],
  declarations: [MeetingsPage]
})
export class MeetingsPageModule {}
