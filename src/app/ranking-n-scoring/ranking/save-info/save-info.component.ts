import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-save-info',
  templateUrl: './save-info.component.html',
  styleUrls: ['./save-info.component.scss']
})
export class SaveInfoComponent implements OnInit {

  public infoForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<SaveInfoComponent>, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data) {
    this.infoForm = this.formBuilder.group({
      nameInput: [''],
    });
    if (!isNullOrUndefined(data.meetingName)) {
      this.infoForm.controls.nameInput.setValue(data.meetingName);
    }
  }

  ngOnInit() {
  }

  returnInfo() {
    return {
      name: this.infoForm.controls.nameInput.value,
    };
  }

  onCancel() {
    this.dialogRef.close();
  }

}
