import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'rns', loadChildren: () => import('./ranking-n-scoring/ranking-n-scoring.module').then(m => m.RankingNScoringModule) },
  { path: 'info', loadChildren: () => import('./info/info.module').then(m => m.InfoModule) },
  { path: 'combined', loadChildren: () => import('./combined/combined.module').then(m => m.CombinedModule)},
  {
    path: '**',
    redirectTo: 'rns'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
