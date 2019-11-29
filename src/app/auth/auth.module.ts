import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthComponent } from './auth.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RegisterComponent } from './register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerModule } from '../shared/components/loading-spinner/loading-spinner.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { RegistrationCompleteComponent } from './helpers/registration-complete/registration-complete.component';
import { AuthHelpersService } from './helpers/auth-helpers.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NoAuthGuardService } from './guards/no-auth-guard.service';
import { ForgotPasswordComponent } from './helpers/forgot-password/forgot-password.component';
import { ForgotPasswordCompleteComponent } from './helpers/forgot-password-complete/forgot-password-complete.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    AuthComponent,
    RegisterComponent,
    ConfirmationComponent,
    RegistrationCompleteComponent,
    ForgotPasswordComponent,
    ForgotPasswordCompleteComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingSpinnerModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [AuthComponent],
  entryComponents: [
    AuthComponent,
    RegistrationCompleteComponent,
    ForgotPasswordComponent,
    ForgotPasswordCompleteComponent
  ]
})
export class AuthModule {
  constructor(authGuardService: AuthGuardService, noAuthGuardService: NoAuthGuardService) {}

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthHelpersService,
        AuthGuardService,
        NoAuthGuardService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
      ]
    };
  }
}
