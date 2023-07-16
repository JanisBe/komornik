import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Debt} from "../../../model/debt";
import {Group} from "../../../model/group";

@Component({
  selector: 'settlement-dialog',
  templateUrl: './settlement-dialog.component.html',
  styleUrls: ['./settlement-dialog.component.scss']
})
export class SettlementDialogComponent {
  constructor(
      public dialogRef: MatDialogRef<SettlementDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: SettlementDialogData,
  ) {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}

export interface SettlementDialogData {
  debts: Debt[],
  group: Group
}
