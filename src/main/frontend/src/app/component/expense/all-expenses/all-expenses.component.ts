import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "../../../service/expense.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  private groupId: number = 1;
  expandedElement: Expense | null;
  constructor(private expenseService: ExpenseService,
              private router: Router,
              private snackbarService: SnackbarService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
        if (!!this.route.snapshot.params['groupId']) {
            this.groupId = this.route.snapshot.params['groupId'];
            this.fetchExpensesForGroup(this.groupId);
        } else {
            this.fetchAllExpenses();
        }
    }

    editExpense(expense: Expense) {
        this.router.navigate(['expense/details', expense.id]);
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

  private fetchAllExpenses() {
    this.expenseService.findAll()
      .subscribe(value => {
        value.map(ex => {
          ex.date = new Date(ex.date);
        });
        this.expenses = value;
      });
  }
}
