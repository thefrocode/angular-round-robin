import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  addMemberForm!:FormGroup
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMemberComponent>) { }

  ngOnInit(): void {
    this.addMemberForm = this.fb.group({
      member_name: ['Member 1', [Validators.required]],
      member_address: ['50', [Validators.required]],
      member_title: ['', [Validators.required]]
      
    });
  }
  save() {
    this.dialogRef.close(this.addMemberForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
