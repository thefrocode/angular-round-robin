import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-make-contribution',
  templateUrl: './make-contribution.component.html',
  styleUrls: ['./make-contribution.component.scss']
})
export class MakeContributionComponent implements OnInit {

  makeContributionForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<MakeContributionComponent>) { }

  ngOnInit(): void {
    this.makeContributionForm = this.fb.group({
      contribution_amount: ['50', [Validators.required]],
      
    });
  }
  save() {
    this.dialogRef.close(this.makeContributionForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
