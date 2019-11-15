import { Injectable, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthComponent } from './auth.component';
import { HttpClient, HttpParams } from '@angular/common/http/';
import { environment } from 'src/environments/environment';
import { RegisterUserCmd } from './cmd/register.user.cmd';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = '/auth';
  public AuthenticationEvent: EventEmitter<boolean>;

  constructor(private authDialog: MatDialog, private httpClient: HttpClient) {
    this.AuthenticationEvent = new EventEmitter<boolean>();
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return (!this.tokenExpired(token));
  }

  private tokenExpired(token: string): boolean {
    return false;
  }

  public openAuthenticationDialog() {
    const dialogRef = this.authDialog.open(AuthComponent, {
      minWidth: '100vw',
      minHeight: '100vh',
      maxHeight: '100vh',
      maxWidth: '100vh'

    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (this.isAuthenticated()) {
        this.AuthenticationEvent.emit(true);
      }
    });
  }

  public registerUser(data: {
    email: string
    firstName: string,
    lastName: string,
    password: string,
    username: string,
  }) {

    const registerUserCmd = new RegisterUserCmd({
      Email: data.email, FirstName: data.firstName, LastName: data.lastName, Password: data.password, Username: data.username
    })
    return this.httpClient.put(environment.apiUrl + this.baseUrl + '/register', registerUserCmd);
  }

  public confirmUserAccount(email: string, token: string) {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('token', token);
    return this.httpClient.get(environment.apiUrl + this.baseUrl + '/confirm', { params });
  }
}
