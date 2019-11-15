import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { SignInComponent } from './signin/signin.component';
import { SignOutComponent } from './signout/signout.component';
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
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { switchMap, filter, map } from 'rxjs/operators';
import { of } from 'rxjs';

@NgModule({
  declarations: [SignInComponent, SignOutComponent, AuthComponent, RegisterComponent],
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
  entryComponents: [AuthComponent]
})
export class AuthModule {
  constructor(authService: AuthService, router: Router, route: ActivatedRoute) {

    /* console.log(router);
    const navigationEnd = router.events.pipe(
      filter((event) => {
        return event instanceof NavigationEnd;
      })
    );
    const params = navigationEnd.pipe(
      map(() => route.root),
      map(root => root.firstChild),
      switchMap(firstChild => {
        if (firstChild) {
          return firstChild.queryParams
        } else {
          return of(null);
        }
      })
    ); 

    params.subscribe(
      res => {
        authService.confirmUserAccount(res['email'], res['token']);
      }
    );*/
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AuthGuardService],
    };
  }
}
