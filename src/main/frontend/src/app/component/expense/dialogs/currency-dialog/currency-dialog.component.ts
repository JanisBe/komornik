import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {CurrencyService} from "../../../../service/currency.service";
import {MatButton} from '@angular/material/button';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'currency-dialog',
  templateUrl: './currency-dialog.component.html',
  styleUrl: './currency-dialog.component.scss',
  standalone: true,
  imports: [MatDialogTitle, MatIcon, MatDialogContent, MatSelectionList, MatListOption, MatDialogActions, MatButton]
})
export class CurrencyDialogComponent implements OnInit {
  currencies: string[] = [];

  constructor(private dialogRef: MatDialogRef<CurrencyDialogComponent>,
              private currencyService: CurrencyService,
              @Inject(MAT_DIALOG_DATA) public data: { currencies: string[], defaultCurrency: string }) {
  }

  ngOnInit(): void {
    this.currencies = this.currencyService.getAllCurrencies();
  }

  close() {
    this.dialogRef.close();
  }

  ok(_value: string[] | null) {
    this.dialogRef.close(_value);
  }
}
