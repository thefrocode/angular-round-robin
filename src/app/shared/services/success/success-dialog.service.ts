import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../ui/dialogs/success-dialog/success-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SuccessDialogService {

  private opened = false;

  constructor(private dialog: MatDialog) { }

  openDialog(message: string): void {
    if (!this.opened) {
      this.opened = true;
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
        data: { message, status },
        maxHeight: '100%',
        width: '360px',
        maxWidth: '100%',
        disableClose: false,
        hasBackdrop: true,

      });

      dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
      });
    }
  }
}
