import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CurrencyService} from "../../../../service/currency.service";

@Component({
  selector: 'currency-dialog',
  templateUrl: './currency-dialog.component.html',
  styleUrl: './currency-dialog.component.scss'
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
