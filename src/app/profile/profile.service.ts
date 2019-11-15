import { Injectable } from '@angular/core';
import { ProfileEntity } from './entities/profile.entity';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private authService: AuthService) { }

  public getProfile(): Observable<ProfileEntity> {
    return this.authService.AuthenticationEvent.pipe(
      map(p => {
        if (p) {
          return new ProfileEntity('Fivos', 'Karvelas', 'fivosk@yahoo.de');
        }
        else return null;
      })
    )
  }
}
