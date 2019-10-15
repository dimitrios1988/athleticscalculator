import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookmarksComponent } from './bookmarks.component';

const routes: Routes = [{ path: '', component: BookmarksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookmarksRoutingModule { }
