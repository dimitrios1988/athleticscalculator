import { Injectable, EventEmitter } from '@angular/core';
import { ProfileEntity } from './entities/profile.entity';
import { AuthService, UserStatus } from '../auth/auth.service';
import { Observable, of, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { mergeMap, map, mapTo, tap, every } from 'rxjs/operators';
import { UpdateProfileCmd } from './cmd/update.profile.cmd';
import { ActiveConnectionDto } from './dto/active.connection.dto';
import { RevokeAccessCmd } from './cmd/revoke.access.cmd';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public profileUpdatedEvent: EventEmitter<ProfileEntity>;
  private baseUrl = '/user';

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.profileUpdatedEvent = new EventEmitter<ProfileEntity>();
  }

  public getProfile(): Observable<ProfileEntity> {
    const getProfileRequest$ = this.httpClient.get<ProfileEntity>(
      environment.apiUrl + this.baseUrl + '/profile'
    );
    const authEventRequest$ = this.authService.AuthenticationEvent.pipe(
      mergeMap(authenticated => {
        if (authenticated) {
          return getProfileRequest$;
        } else {
          return of(null);
        }
      })
    );
    const profileUpdated$ = this.profileUpdatedEvent.pipe(
      map(profile => {
        return profile;
      })
    );
    if (this.authService.getUserStatus() === UserStatus.CONFIRMED) {
      return merge(getProfileRequest$, authEventRequest$, profileUpdated$);
    } else {
      return merge(authEventRequest$, profileUpdated$);
    }
  }

  public updateProfile(data: {
    firstName: string;
    lastName: string;
    username: string;
    password?: string;
    email: string;
  }): Observable<ProfileEntity> {
    const updateProfileCmd = new UpdateProfileCmd(data);
    return this.httpClient
      .post<ProfileEntity>(environment.apiUrl + this.baseUrl + '/profile', updateProfileCmd)
      .pipe(
        map(prof => {
          this.profileUpdatedEvent.emit(prof);
          return prof;
        })
      );
  }

  public getActiveConnections(): Observable<ActiveConnectionDto[]> {
    return this.httpClient.get<ActiveConnectionDto[]>(
      environment.apiUrl + this.baseUrl + '/connections'
    );
  }

  public revokeAccess(loginUuid: string) {
    const revokeAccessCmd = new RevokeAccessCmd(loginUuid);
    return this.httpClient.post(
      environment.apiUrl + '/auth' + '/revokeconnection',
      revokeAccessCmd
    );
  }
}
