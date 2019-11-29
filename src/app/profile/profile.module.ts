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
import { AuthService } from '../auth/auth.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActiveConnectionsComponent } from './active-connections/active-connections.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { LoadingSpinnerModule } from '../shared/components/loading-spinner/loading-spinner.module';
import { isNullOrUndefined } from 'util';

@NgModule({
  declarations: [ProfileComponent, ProfileInfoComponent, ActiveConnectionsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    AngularFittextModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    LoadingSpinnerModule
  ]
})
export class ProfileModule {
  private authenticationEvent: Observable<boolean>;
  constructor(
    authService: AuthService,
    private snackBar: MatSnackBar,
    private profileService: ProfileService
  ) {
    this.authenticationEvent = authService.AuthenticationEvent;
    const profile$ = this.authenticationEvent.pipe(
      mergeMap(authEvent => {
        if (authEvent) {
          return this.profileService.getProfile();
        }
        return of(null);
      })
    );
    profile$.subscribe({
      next: p => {
        if (isNullOrUndefined(p)) {
          this.openSnackBar(`You have logged out`, 'Close');
        }
      }
    });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProfileModule,
      providers: [ProfileService]
    };
  }
}
