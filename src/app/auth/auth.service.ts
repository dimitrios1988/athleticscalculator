import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http/';
import { environment } from 'src/environments/environment';
import { RegisterUserCmd } from './cmd/register.user.cmd';
import { Observable } from 'rxjs';
import { TokenDTO } from './dto/token.dto';
import * as JWTDecode from 'jwt-decode';
import { isNullOrUndefined } from 'util';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/auth';
  public AuthenticationEvent: EventEmitter<boolean>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.AuthenticationEvent = new EventEmitter<boolean>();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(tokenDto: TokenDTO) {
    localStorage.setItem('token', tokenDto.token);
    if (this.isAuthenticated()) {
      this.AuthenticationEvent.emit(true);
      this.router.navigate([this.router.url]);
    }
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (
      !isNullOrUndefined(token) /* && !this.tokenExpired(token) */ &&
      this.getUserStatus() === UserStatus.CONFIRMED
    ) {
      return true;
    } else {
      return false;
    }
  }

  private tokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  private getTokenExpirationDate(token: string): Date {
    const decoded = JWTDecode(token);
    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public getUserStatus(): UserStatus {
    const token = this.getToken();
    if (token) {
      const decoded = JWTDecode(token);
      return decoded.Status;
    }
  }

  public registerUser(data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
  }) {
    const registerUserCmd = new RegisterUserCmd({
      Email: data.email,
      FirstName: data.firstName,
      LastName: data.lastName,
      Password: data.password,
      Username: data.username
    });
    return this.httpClient.put(environment.apiUrl + this.baseUrl + '/register', registerUserCmd);
  }

  public login(data: { username: string; password: string }): Observable<TokenDTO> {
    return this.httpClient.post<TokenDTO>(environment.apiUrl + this.baseUrl + '/login', data);
  }

  public logout() {
    return this.httpClient.get(environment.apiUrl + this.baseUrl + '/logout').pipe(
      tap(() => {
        this.removeToken();
      })
    );
  }

  public resendConfirmationEmail(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + this.baseUrl + '/resendConfirmation');
  }

  public removeToken() {
    localStorage.removeItem('token');
    this.AuthenticationEvent.emit(false);
    this.router.navigate([this.router.url]);
  }

  public confirmUserAccount(email: string, token: string): Observable<TokenDTO> {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('token', token);
    return this.httpClient.get<TokenDTO>(environment.apiUrl + this.baseUrl + '/confirm', {
      params
    });
  }

  public requestNewPassword(email: string) {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.httpClient.post(environment.apiUrl + this.baseUrl + '/forgot', { email });
  }
}

export enum UserStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SUSPENDED = 'suspended'
}
