import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<string>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data) {
    this.forgotPasswordForm = this.formBuilder.group({
      emailInput: ['', Validators.compose([Validators.email, Validators.required])],
    });
    if (!isNullOrUndefined(data)) {
      this.forgotPasswordForm.controls.emailInput.setValue(data.email);
    }
  }

  ngOnInit() {
  }

  returnInfo() {
    this.dialogRef.close({
      email: this.forgotPasswordForm.controls.emailInput.value,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
