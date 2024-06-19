import {Component, Input, OnInit} from '@angular/core';
import {ExpenseService} from "../../../service/expense.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../service/snackbar.service";
import {Expense} from "../../../model/expense";
import {ConfirmationComponent} from "../../common/confirmation/confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DatePipe, NgIf} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {AddExpenseComponent} from "../add-expense/add-expense.component";

@Component({
  selector: 'all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatIcon,
    MatIconButton,
    NgIf,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    DatePipe,
  ],
})
export class AllExpensesComponent implements OnInit {
  displayedColumns: string[] = ['description', 'amount', 'with', 'currency', 'date', 'actions'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'szczegóły'];
  expenses: Expense[];
  expandedElement: Expense | null;

  constructor(private expenseService: ExpenseService,
              private router: Router,
              private snackbarService: SnackbarService,
              private dialog: MatDialog) {
  }

  @Input() groupId: number;

  ngOnInit(): void {
      this.fetchExpensesForGroup(this.groupId);
  }

  editExpense(id?: number) {
    this.dialog.open(AddExpenseComponent, {data: {expenseId: id, groupId: this.groupId}, width: '600px'})
      .afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteExpense(expense: Expense) {
    let dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {content: expense.description, category: 'expense'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.deleteExpense(expense.id!).subscribe(
          () => {
            this.snackbarService.displayMessage(`Wydatek ${expense.description} został skasowany`, 3000);
            this.fetchExpensesForGroup(expense.groupId);
          }
        );
      }
    });

  }

  printUsers(expense: Expense) {
    let output = '';
    expense.debt.forEach(debt => {
      output += debt.from.name + ' -> ' + debt.to.name + '<br> \n';
    });
    return output;
  }

  printAmount(expense: Expense) {
    let output = '';
    expense.debt.forEach(debt => {
      output += debt.amount + '<br> \n';
    });
    return output;
  }

  private fetchExpensesForGroup(groupId: number) {
    this.expenseService.findAllByGroupId(groupId).subscribe(value => this.expenses = value);
  }

}
