import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpenseService} from "../../../service/expense.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../service/snackbar.service";
import {Expense} from "../../../interfaces/expense";
import {User} from "../../../interfaces/user";
import {UserService} from "../../../service/user.service";


@Component({
  selector: 'add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  currentUserId = 10;

  constructor(private expenseService: ExpenseService,
              private router: Router,
              private snackbarService: SnackbarService,
              private userService: UserService,) {
  }

  ngOnInit(): void {
    this.initForm();
    this.userService.findCommonFriends(this.currentUserId).subscribe(response => {
      this.users = response;
    });
  }

  onSubmit() {
    const newExpense: Expense = {
      amount: this.form.value.amount,
      description: this.form.value.name,
      currency: this.form.value.currency,
      date: new Date()
    }
    this.expenseService.saveExpense(newExpense).subscribe(result => {
      this.snackbarService.displayMessage(`Nowy wydatek ${result.description} założony!`);
      this.onCancel();
    });
  }

  onCancel() {
    this.router.navigate(['expense/list']);
  }

  private initForm() {
    this.form = new FormGroup({
      amount: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      currency: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      split: new FormControl(50, Validators.required),
      date: new FormControl(new Date(), Validators.required)
    })
  }
}
