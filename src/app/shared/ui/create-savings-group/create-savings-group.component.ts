import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-savings-group',
  templateUrl: './create-savings-group.component.html',
  styleUrls: ['./create-savings-group.component.scss'],
})
export class CreateSavingsGroupComponent implements OnInit {
  createSavingsGroupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateSavingsGroupComponent>
  ) {}

  ngOnInit(): void {
    this.createSavingsGroupForm = this.fb.group({
      group_name: ['Test Name', [Validators.required]],
      contribution_amount: ['0.005', [Validators.required]],
      contribution_frequency: ['0', [Validators.required]],
      reserve_balance: ['0.005', [Validators.required]]
    });
  }
  save() {
    this.dialogRef.close(this.createSavingsGroupForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
