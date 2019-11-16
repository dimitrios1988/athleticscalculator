import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { BookmarksComponent } from './bookmarks.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatIconModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AngularFittextModule } from 'angular-fittext';

@NgModule({
  declarations: [BookmarksComponent],
  imports: [
    CommonModule,
    BookmarksRoutingModule,
    MatToolbarModule,
    MatIconModule,
    PipesModule,
    FlexLayoutModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    AngularFittextModule
  ],
})
export class BookmarksModule { }
