import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-savings-group',
  templateUrl: './view-savings-group.component.html',
  styleUrls: ['./view-savings-group.component.scss'],
})
export class ViewSavingsGroupComponent implements OnInit {
  viewSavingsGroupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ViewSavingsGroupComponent>
  ) {}

  ngOnInit(): void {
    this.viewSavingsGroupForm = this.fb.group({
      group_address: ['', [Validators.required]],
      
    });
  }
  open() {
    this.dialogRef.close(this.viewSavingsGroupForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
