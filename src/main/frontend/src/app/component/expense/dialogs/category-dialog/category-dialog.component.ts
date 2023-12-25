import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../model/user";

@Component({
  selector: 'category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User[],
    public dialogRef: MatDialogRef<CategoryDialogComponent>,) {
  }

  close() {
    this.dialogRef.close();
  }
}
