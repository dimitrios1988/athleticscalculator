import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from '../app.service';
import { AngularFittextModule } from 'angular-fittext';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    RouterModule,
    CommonModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    AngularFittextModule
  ],
  exports: [MenuComponent],
  providers: [AppService]
})
export class MenuModule { }
