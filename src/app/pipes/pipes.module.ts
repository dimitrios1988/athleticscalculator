import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenderPipe } from './gender.pipe';
import { EventTypePipe } from './event-type.pipe';
import { EventNamePipe } from './event-name.pipe';
import { CompetitionTypePipe } from './competition-type.pipe';
import { MeetingCategoryPipe } from './meeting-category.pipe';

@NgModule({
  declarations: [
    GenderPipe,
    EventTypePipe,
    EventNamePipe,    
    CompetitionTypePipe,
    MeetingCategoryPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    GenderPipe,
    EventTypePipe,
    EventNamePipe,    
    CompetitionTypePipe,
    MeetingCategoryPipe
  ]
})
export class PipesModule { }
