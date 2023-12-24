import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../model/user";

@Component({
  selector: 'payer-dialog',
  templateUrl: './payer-dialog.component.html',
  styleUrl: './payer-dialog.component.scss'
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
