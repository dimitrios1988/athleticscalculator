import { Injectable } from '@angular/core';
import { ProfileEntity } from './entities/profile.entity';
import { AuthService, UserStatus } from '../auth/auth.service';
import { Observable, of, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = '/user';

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  public getProfile(): Observable<ProfileEntity> {
    const getProfileRequest$ = this.httpClient.get<ProfileEntity>(environment.apiUrl + this.baseUrl + '/profile');
    const authEventRequest$ = this.authService.AuthenticationEvent.pipe(
      mergeMap(authenticated => {
        if (authenticated) {
          return getProfileRequest$;
        } else {
          return of(null);
        }
      })
    );
    if (this.authService.getUserStatus() === UserStatus.CONFIRMED) {
      return merge(getProfileRequest$, authEventRequest$);
    } else {
      return authEventRequest$;
    }
  }
}
