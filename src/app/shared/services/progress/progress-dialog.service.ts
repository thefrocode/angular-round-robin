import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressDialogComponent } from '../../ui/dialogs/progress-dialog/progress-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProgressDialogService {

  private opened = false;
  showProgress = true;
  dialogRef!: MatDialogRef<ProgressDialogComponent>;

  constructor(private dialog: MatDialog) { }

  openDialog(message: string): void {
    if (!this.opened) {
      this.opened = true;
      this.dialogRef = this.dialog.open(ProgressDialogComponent, {
        data: { message:message,
        showProgress:true },
        maxHeight: '100%',
        width: '360px',
        maxWidth: '100%',
        disableClose: false,
        hasBackdrop: true,

      });

      this.dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
      });
    }
  }
  close(){
    this.dialogRef.close()
  }
  update(message:string){
    
    this.dialogRef.componentInstance.data =  { message:message, showProgress:false };
  }
}
