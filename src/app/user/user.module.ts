import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { SignInComponent } from './signin/signin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignOutComponent } from './signout/signout.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SignInComponent, SignOutComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [UserService],
  exports: [SignInComponent, SignOutComponent]
})
export class UserModule {
  constructor() { }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [UserService]
    };
  }

}

