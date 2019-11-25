import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './profile.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { AngularFittextModule } from 'angular-fittext';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    AngularFittextModule,
    HttpClientModule
  ],
})
export class ProfileModule {
  constructor() { }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProfileModule,
      providers: [ProfileService],
    };
  }

}

