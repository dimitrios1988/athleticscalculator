import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService, UserStatus } from '../auth.service';
import { TokenDTO } from '../dto/token.dto';
import { Router } from '@angular/router';
import { AuthHelpersService } from '../helpers/auth-helpers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginIsLoading: boolean;
  public resendConfimrationIsLoading: boolean;
  public loginForm: FormGroup;
  public errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authHelpersService: AuthHelpersService
  ) {
    this.loginIsLoading = false;
    this.resendConfimrationIsLoading = false;
    this.errorMessage = '';
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onLogin() {
    this.loginIsLoading = true;
    this.authService
      .login(this.loginForm.value)
      .subscribe({
        next: (token: TokenDTO) => {
          this.authService.setToken(token);
          if (this.authService.getUserStatus() !== UserStatus.CONFIRMED) {
            this.errorMessage = this.authService.getUserStatus();
          }
        },
        error: err => {
          this.errorMessage = err.error;
        }
      })
      .add(() => {
        this.loginIsLoading = false;
      });
  }

  public onResendEmail() {
    this.resendConfimrationIsLoading = true;
    this.authService
      .resendConfirmationEmail()
      .subscribe({ next: () => (this.errorMessage = '') })
      .add(() => {
        this.resendConfimrationIsLoading = false;
        this.authHelpersService.getRegistrationCompleteDialog();
      });
  }

  public onForgotPassword() {
    this.authHelpersService
      .getForgotPasswordDialog(this.loginForm.controls.username.value)
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.authService.requestNewPassword(res.email).subscribe({
            next: () => {
              this.authHelpersService.getForgotPasswordCompleteDialog();
            },
            error: err => {
              this.errorMessage = err.error;
            }
          });
        }
      });
  }
}
