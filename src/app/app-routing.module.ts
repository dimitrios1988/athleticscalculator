import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'ranking', pathMatch: 'full' },
  // { path: 'ranking', loadChildren: './ranking/ranking.module#RankingPageModule' },  
  { path: '', loadChildren: './ranking/ranking.module#RankingPageModule' },
  { path: 'ranking', redirectTo: '', pathMatch: 'full' },
  { path: 'performances', loadChildren: './performances/performances.module#PerformancesPageModule' },
  { path: 'info', loadChildren: './info/info.module#InfoPageModule' },
  { path: 'meetings', loadChildren: './meetings/meetings.module#MeetingsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
