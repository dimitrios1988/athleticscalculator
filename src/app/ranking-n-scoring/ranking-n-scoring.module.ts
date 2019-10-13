import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingNScoringRoutingModule } from './ranking-n-scoring-routing.module';
import { RankingNScoringComponent } from './ranking-n-scoring.component';
import { TabsMenuModule } from './tabs-menu/tabs-menu.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RankingModule } from './ranking/ranking.module';
import { MeetingsModule } from './meetings/meetings.module';
import { PerformancesModule } from './performances/performances.module';


@NgModule({
  declarations: [RankingNScoringComponent],
  imports: [
    CommonModule,
    RankingNScoringRoutingModule,
    TabsMenuModule,
    FlexLayoutModule,
    RankingModule,
    MeetingsModule,
    PerformancesModule
  ]
})
export class RankingNScoringModule { }
