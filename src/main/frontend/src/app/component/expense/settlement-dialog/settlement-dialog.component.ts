import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Group} from "../../../model/group";
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {JsonPipe, KeyValuePipe, NgFor, NgIf} from '@angular/common';
import {Settlement} from "../../../model/settlement";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'settlement-dialog',
  templateUrl: './settlement-dialog.component.html',
  styleUrls: ['./settlement-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, NgIf, NgFor, MatTooltip, MatIcon, MatDialogActions, MatButton, KeyValuePipe, JsonPipe, MatCheckbox]
})
export class SettlementDialogComponent {
  constructor(
      public dialogRef: MatDialogRef<SettlementDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: SettlementDialogData,
  ) {
    console.log(data)
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  getCurrencies(): string[] {
    return Object.keys(this.data.debts);
  }

  // calculateDebts(debts: Settlement[]): boolean {
  //   return debts.reduce((accumulator, curValue) => accumulator + curValue.amount, 0) > 0;
  // }   || calculateDebts(data.debts)

}

export interface SettlementDialogData {
  debts: Settlement,
  group: Group
}
