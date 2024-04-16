import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {User} from "../../../../model/user";
import {MatButton} from '@angular/material/button';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'payer-dialog',
  templateUrl: './payer-dialog.component.html',
  styleUrl: './payer-dialog.component.scss',
  standalone: true,
  imports: [MatDialogTitle, MatIcon, MatDialogContent, MatSelectionList, MatListOption, MatDialogActions, MatButton]
})
export class PayerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { payerName: User, usersOriginalList: User[] },
              public dialogRef: MatDialogRef<PayerDialogComponent>,) {
  }

  close() {
    this.dialogRef.close();
  }

  ok(value: string[] | null) {
    this.dialogRef.close(value);
  }
}
