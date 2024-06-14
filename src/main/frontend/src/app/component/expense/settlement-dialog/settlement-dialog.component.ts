import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {JsonPipe, KeyValuePipe, NgFor, NgIf} from '@angular/common';
import {Settlement} from "../../../model/settlement";
import {MatCheckbox} from "@angular/material/checkbox";
import {ExpenseService} from "../../../service/expense.service";
import {Debt} from "../../../model/debt";

@Component({
  selector: 'settlement-dialog',
  templateUrl: './settlement-dialog.component.html',
  styleUrls: ['./settlement-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, NgIf, NgFor, MatTooltip, MatIcon, MatDialogActions, MatButton, KeyValuePipe, JsonPipe, MatCheckbox]
})
export class SettlementDialogComponent implements OnInit {
  private wasChanged: boolean;
  settlement: Settlement;

  constructor(
    public dialogRef: MatDialogRef<SettlementDialogComponent>,
    public expenseService: ExpenseService,
    @Inject(MAT_DIALOG_DATA) public data: SettlementDialogData,
  ) {
  }

  ngOnInit(): void {
    this.settlement = this.data.debts;
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

  calculateExchange(change: boolean) {
    if (change && !this.wasChanged) {
      this.wasChanged = true;
      let debts: Debt[] = []
      Object.keys(this.data.debts)
        .filter(currency => currency !== this.data.groupDefaultCurrency)
        .forEach(currency => {
          this.data.debts[currency].forEach(transaction => {
            debts.push({currency: currency, from: transaction.from, to: transaction.to, amount: transaction.amount});
            this.settlement[currency] = [];
          });
        });
      this.expenseService.recalculateForeignCurrency(debts).subscribe(result => {
        result.forEach(transaction => {
          this.settlement[transaction.currency].push(transaction);
        });
        this.recalculateDebts();
      });
    }

  }

  private recalculateDebts() {
    Object.keys(this.settlement).forEach(currency => {
      let groupedTransactions = this.settlement[currency].reduce((acc, transaction) => {
        const key = `${transaction.from.id}-${transaction.to.id}-${transaction.currency}`;
        if (!acc[key]) {
          acc[key] = {
            from: transaction.from,
            to: transaction.to,
            amount: 0,
            currency: transaction.currency
          };
        }
        acc[key].amount += transaction.amount;
        return acc;
      }, {} as { [key: string]: Debt });

      this.settlement[currency] = Object.values(groupedTransactions);
    });
  }

  protected readonly Object = Object;
}

export interface SettlementDialogData {
  debts: Settlement,
  groupDefaultCurrency: string
}
