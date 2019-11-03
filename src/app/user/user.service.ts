import { Injectable } from '@angular/core';
import { User } from './entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn: boolean;

  public setLoggedIn(status: boolean): void {
    this.isLoggedIn = status;
  }

  constructor() {
    this.setLoggedIn(true);
  }

  public getProfile() {
    if (this.isLoggedIn) {
      return new User('Fivos', 'Karvelas', 'fivosk@yahoo.de');
    }
    return null;
  }
}
