import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MenuModule } from './menu/menu.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PwaModule } from './pwa/pwa.module';
import { CombinedModule } from './combined/combined.module';
import { AppService } from './app.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { AngularFittextModule } from 'angular-fittext';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTooltipModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    MatBottomSheetModule,
    PwaModule.forRoot(),
    CombinedModule,
    AngularFittextModule,
    ProfileModule.forRoot(),
    AuthModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    AppService,
    /* {
      provide: DateAdapter,
      useClass: NativeDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }, */
  ]
})
export class AppModule {
  //private _adapter: DateAdapter<any>
  constructor() {
    //this.setLocaleFromSystem();
  }

  private setLocaleFromSystem() {
    var language;
    if (window.navigator.languages) {
      language = window.navigator.languages[0];
    } else {
      language = window.navigator.language;
    }
    //this._adapter.setLocale(language);
  }
}
