import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { isNullOrUndefined } from 'util';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthHelpersService } from '../helpers/auth-helpers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  showErrorMessage: boolean;
  isLoading: boolean;
  errorMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private authHelpersService: AuthHelpersService) {
    this.createRegistrationForm();
    this.isLoading = false;
    this.showErrorMessage = false;
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    });
  }

  private matchValidator(controlA: AbstractControl, controlB: AbstractControl): ValidatorFn {
    return (formControl): { [key: string]: boolean } | null => {
      if (!isNullOrUndefined(controlA) && !isNullOrUndefined(controlB)) {
        if (controlA.value != controlB.value) {
          return { valueMatch: true };
        }
      }
      return null;
    };
  }
  ngOnInit() { }

  onRegister() {
    this.isLoading = true;
    this.showErrorMessage = false;
    this.authService.registerUser(this.registrationForm.value)
      .subscribe(
        {
          next: () => {
            this.isLoading = false;
            this.authHelpersService.getRegistrationCompleteDialog();
          },
          error: (err) => {
            if ((err.error) && (err.error === 'ER_DUP_EMAIL_ENTRY')) {
              this.errorMessage = 'There was an error during registartion. This email already exists.';
            } else if ((err.error) && (err.error === 'ER_DUP_USERNAME_ENTRY')) {
              this.errorMessage = 'There was an error during the registration. This username already exists.';
            } else {
              this.errorMessage = 'There was an error during the registration. Please try again later.';
            }
            this.showErrorMessage = true;
            this.isLoading = false;
          },
        }
      );
  }

}
