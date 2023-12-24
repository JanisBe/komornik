import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../model/user";

@Component({
  selector: 'split-dialog',
  templateUrl: './split-dialog.component.html',
  styleUrl: './split-dialog.component.scss'
})
export class SplitDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User[],
    public dialogRef: MatDialogRef<SplitDialogComponent>,) {
  }

  close() {
    this.dialogRef.close();
  }
}
