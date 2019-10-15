import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    RouterModule,
    CommonModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports: [MenuComponent],
})
export class MenuModule { }