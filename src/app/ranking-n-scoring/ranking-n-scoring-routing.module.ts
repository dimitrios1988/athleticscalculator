import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingNScoringComponent } from './ranking-n-scoring.component';
import { RankingComponent } from './ranking/ranking.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { PerformancesComponent } from './performances/performances.component';

const routes: Routes = [
  {
    path: '',
    component: RankingNScoringComponent,
    children: [
      {
        path: 'ranking',
        component: RankingComponent
      },
      {
        path: 'meetings',
        component: MeetingsComponent
      },
      {
        path: 'performances',
        component: PerformancesComponent
      },
      {
        path: 'bookmarks',
        loadChildren: () => import('./bookmarks/bookmarks.module').then(m => m.BookmarksModule)
      },
      {
        path: '**',
        redirectTo: 'ranking',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankingNScoringRoutingModule {}
