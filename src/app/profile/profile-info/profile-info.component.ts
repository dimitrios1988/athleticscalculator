import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Observable } from 'rxjs';
import { ProfileEntity } from '../entities/profile.entity';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { async } from 'q';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  public profileInfoForm: FormGroup;
  public isSaveLoading: boolean;
  public isLoading: boolean;
  public passwordIsEditable: boolean;
  private profile: ProfileEntity;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    this.isLoading = false;
    this.isSaveLoading = false;
    this.passwordIsEditable = false;
    this.createProfileInfoForm();
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (profile: ProfileEntity) => {
        if (profile) {
          this.profile = profile;
          this.profileInfoForm.setValue({
            firstName: profile.FirstName,
            lastName: profile.LastName,
            username: profile.Username,
            email: profile.Email,
            password: ''
          });
        }
      }
    });
  }

  private createProfileInfoForm() {
    this.profileInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['']
    });
  }

  onNewPassword() {
    this.passwordIsEditable = true;
    this.profileInfoForm.controls.password.setValidators(Validators.required);
    this.profileInfoForm.controls.password.updateValueAndValidity();
  }

  onCancelNewPassword() {
    this.passwordIsEditable = false;
    this.profileInfoForm.controls.password.clearValidators();
    this.profileInfoForm.controls.password.updateValueAndValidity();
  }

  onGenerateRandomPass() {
    const randomPass = this.getRandomString(10);
    this.profileInfoForm.controls.password.setValue(randomPass);
  }

  private getRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  onSave() {
    this.isSaveLoading = true;
    const newProfileInfo = this.profileInfoForm.value;

    const { password, ...result } = newProfileInfo;
    const profile$ = this.profileService.updateProfile(result);
    profile$.subscribe().add(() => {
      this.isSaveLoading = false;
    });
  }
}
