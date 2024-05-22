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
import {ExpenseService} from "../../../service/expense.service";

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
      public expenseService: ExpenseService,
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

  calculate(change: boolean) {
    if (change) {
      Object.keys(this.data.debts)
        .filter(currency => currency !== this.data.group.defaultCurrency)
        .forEach(currency => {
          // Iterate over each transaction in the array for the current currency
          this.data.debts[currency].forEach(transaction => {
            console.log(`From: ${transaction.from.name}, To: ${transaction.to.name}, Amount: ${transaction.amount}`);
            this.expenseService.recalculateForeignCurrency(transaction.amount, currency).subscribe(exchangeRate => {
              transaction.amount = +Math.floor(exchangeRate).toFixed(2);
              currency = this.data.group.defaultCurrency!;
              console.log(`From: ${transaction.from.name}, To: ${transaction.to.name}, Amount: ${transaction.amount}`);
            });
          });
        });

    }
  }
}

export interface SettlementDialogData {
  debts: Settlement,
  group: Group
}
