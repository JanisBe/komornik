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

  calculateDebts(debts: Debt[]): boolean {
    return debts.reduce((accumulator, curValue) => accumulator + curValue.amount, 0) > 0;
  }
}

export interface SettlementDialogData {
  debts: Debt[],
  group: Group
}
