import { RegistrationCompleteComponent } from './registration-complete/registration-complete.component';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordCompleteComponent } from 'src/app/auth/helpers/forgot-password-complete/forgot-password-complete.component';

@Injectable({
  providedIn: 'root'
})
export class AuthHelpersService {
  constructor(private authDialog: MatDialog) { }

  public getRegistrationCompleteDialog() {
    return this.authDialog.open(RegistrationCompleteComponent, {
      minWidth: '60vw',
      minHeight: '40vh',
      maxHeight: '90vh',
      maxWidth: '90vw'
    });
  }

  public getForgotPasswordDialog(email: string) {
    return this.authDialog.open(ForgotPasswordComponent, {
      minWidth: '30vw',
      minHeight: '25vh',
      maxHeight: '90vh',
      maxWidth: '90vw',
      data: {
        email,
      },
    });
  }

  public getForgotPasswordCompleteDialog() {
    return this.authDialog.open(ForgotPasswordCompleteComponent, {
      minWidth: '60vw',
      minHeight: '40vh',
      maxHeight: '90vh',
      maxWidth: '90vw'
    });
  }
}
