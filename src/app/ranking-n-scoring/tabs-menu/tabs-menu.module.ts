import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsMenuComponent } from './tabs-menu.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [TabsMenuComponent],
  imports: [
    FlexLayoutModule,
    CommonModule,
    MatTabsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [TabsMenuComponent]
})
export class TabsMenuModule { }
