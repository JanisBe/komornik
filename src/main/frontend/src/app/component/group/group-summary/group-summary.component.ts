import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ExpenseService} from "../../../service/expense.service";
import {Expense} from "../../../model/expense";
import {DatePipe, KeyValue, KeyValuePipe, NgFor} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {AddExpenseComponent} from "../../expense/add-expense/add-expense.component";
import {MatButton} from '@angular/material/button';
import '@angular/common/locales/global/pl';
import {LoadingService} from "../../../service/loading.service";
import {EditExpenseComponent} from "../../expense/edit-expense/edit-expense.component";
import {SpinnerComponent} from "../../common/spinner/spinner.component";

@Component({
  selector: 'group-summary',
  templateUrl: './group-summary.component.html',
  styleUrl: './group-summary.component.scss',
  standalone: true,
  imports: [MatButton, NgFor, DatePipe, KeyValuePipe, SpinnerComponent]
})
export class GroupSummaryComponent implements OnInit {
  groupId: number;
  expenses: Map<string, Expense[]> = new Map<string, Expense[]>();

  constructor(private expenseService: ExpenseService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              protected loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.expenseService.findAllByGroupId(this.groupId).subscribe(expenses => {
        this.expenses = this.groupByDate(expenses);
      });
    });
  }

  groupByDate(objects: Expense[]): Map<string, Expense[]> {
    return objects.reduce((groupedMap, currentObject) => {
      // Extract the date in a format that represents the day (YYYY-MM-DD)
      const dateKey = currentObject.date.toString().split('T')[0];

      // Check if there's already a group for the current day
      if (!groupedMap.has(dateKey)) {
        groupedMap.set(dateKey, []);
      }

      // Add the current object to the group
      groupedMap.get(dateKey)!.unshift(currentObject);

      return groupedMap;
    }, new Map<string, Expense[]>());
  }

  reverseKeyOrder = (a: KeyValue<string, Expense[]>, b: KeyValue<string, Expense[]>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  addExpense() {
    this.dialog.open(AddExpenseComponent, {data: {groupId: this.groupId}, width: '600px'})
      .afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  editExpense(id: number) {
    console.log(id);
    this.dialog.open(EditExpenseComponent, {data: {id: id}, width: '600px'})
  }
}
