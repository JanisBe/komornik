import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSliderModule} from "@angular/material/slider";
import {MatChipsModule} from "@angular/material/chips";
import {AllExpensesComponent} from "./all-expenses/all-expenses.component";
import {AddExpenseComponent} from "./add-expense/add-expense.component";
import {SettlementDialogComponent} from './settlement-dialog/settlement-dialog.component';
import {EditExpenseComponent} from './edit-expense/edit-expense.component';
import {PayerDialogComponent} from './dialogs/payer-dialog/payer-dialog.component';
import {SplitDialogComponent} from './dialogs/split-dialog/split-dialog.component';
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    AllExpensesComponent,
    AddExpenseComponent,
    SettlementDialogComponent,
    EditExpenseComponent,
    PayerDialogComponent,
    SplitDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatChipsModule,
    MatListModule
  ]
})
export class ExpenseModule {
}
