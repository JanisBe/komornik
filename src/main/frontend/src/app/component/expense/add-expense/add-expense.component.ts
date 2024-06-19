import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExpenseService} from "../../../service/expense.service";
import {RouterLink} from "@angular/router";
import {SnackbarService} from "../../../service/snackbar.service";
import {Expense} from "../../../model/expense";
import {User} from "../../../model/user";
import {CurrencyService} from "../../../service/currency.service";
import {Category} from "../../../model/category";
import {CategoryService} from "../../../service/category.service";
import {GroupService} from "../../../service/group.service";
import {Group} from 'src/app/model/group';
import {AuthService} from "../../../auth/auth.service";
import {Debt} from "../../../model/debt";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Observable, of} from "rxjs";
import {PayerDialogComponent} from "../dialogs/payer-dialog/payer-dialog.component";
import {SplitDialogComponent} from "../dialogs/split-dialog/split-dialog.component";
import {CurrencyDialogComponent} from "../dialogs/currency-dialog/currency-dialog.component";
import {CategoryDialogComponent} from "../dialogs/category-dialog/category-dialog.component";
import {MultiUserSplitComponent} from "../dialogs/multi-user-split/multi-user-split.component";
import {DataSharingService} from "../../../service/data-sharing.service";
import {MatButton} from '@angular/material/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatChip} from '@angular/material/chips';
import {MatInput} from '@angular/material/input';
import {MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe, NgIf} from '@angular/common';
import {LoadingService} from "../../../service/loading.service";
import {SpinnerComponent} from "../../common/spinner/spinner.component";
import {ConfirmationComponent} from "../../common/confirmation/confirmation.component";


@Component({
  selector: 'add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, NgIf, FormsModule, ReactiveFormsModule, MatIcon, MatFormField, MatLabel, MatInput, MatChip, MatSuffix, MatDatepickerInput, MatHint, MatDatepickerToggle, MatDatepicker, RouterLink, MatDialogActions, MatButton, AsyncPipe, SpinnerComponent]
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  form: FormGroup;
  users: User[];
  categories: Category[];
  currentUser: User;
  currentGroup: Group;
  currentGroupName$: Observable<string>;
  currentExpense: Expense;
  currencies: string[] = [];
  defaultCurrency: string;
  currentCurrency: string;
  payer: User;
  betweenWho = "wszyscy";
  splitHow = "po równo";
  userName = new FormControl('');
  isUserInGroup = false;
  categoryIcon = "description";
  private payerDialogRef: MatDialogRef<PayerDialogComponent>;
  private currencyDialogRef: MatDialogRef<CurrencyDialogComponent>;
  private categoryDialogRef: MatDialogRef<CategoryDialogComponent>;
  protected editMode: boolean;
  private debts: Debt[] = [];
  private splitDialogRef: MatDialogRef<SplitDialogComponent | MultiUserSplitComponent>;

  private readonly AMOUNT_PATTERN = '^\\d+(?:[.,]\\d{0,2})?$';

  constructor(private expenseService: ExpenseService,
              private snackbarService: SnackbarService,
              private currencyService: CurrencyService,
              private categoryService: CategoryService,
              private groupService: GroupService,
              private authService: AuthService,
              private dataSharingService: DataSharingService,
              private dialog: MatDialog,
              protected loadingService: LoadingService,
              @Inject(MAT_DIALOG_DATA) public data: { expenseId?: number, groupId: number }) {
  }

  ngOnDestroy(): void {
    this.onCancel();
  }

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.currentUser = Object.assign({}, this.authService.user.value!);
    this.payer = this.currentUser;
    this.initForm();
    if (this.data.expenseId) {
      this.editMode = true;
      this.expenseService.findById(this.data.expenseId).subscribe(expense => {
        this.currentExpense = expense;
        this.currentCurrency = expense.currency;
        this.debts = expense.debt;
        this.patchForm(expense);
        this.form.patchValue(this.currentExpense);
        this.loadingService.setLoading(false);

      });
    }
    this.groupService.findById(this.data.groupId).subscribe(group => {
      this.currentGroup = group;
      this.defaultCurrency = group.defaultCurrency!;
      this.currentGroupName$ = of(this.currentGroup.groupName);
      this.isUserInGroup = this.currentGroup.users.map(user => user.id).includes(this.currentUser.id);
      this.users = group.users;
      if (!this.editMode) {
        this.currentCurrency = this.defaultCurrency;
        this.form.get('currency')?.patchValue(this.currentCurrency);
      }
    });

    this.categoryService.findAllCategories().subscribe(category => this.categories = category);
    this.currencies = this.currencyService.getAllCurrencies();
    this.loadingService.setLoading(false);
  }

  onCancel() {
    this.dialog.closeAll()
  }

  onSubmit() {
    let debts: Debt[] = this.debts;
    const sanitizedAmount = parseInt(this.sanitizeAmount(this.form.value.amount));
    if (debts.length == 0) {
      this.users.forEach((user) => {
        if (user.id !== this.payer.id) {
            let debt: Debt = {
              from: this.payer,
              to: user,
              amount: +(sanitizedAmount / (this.users.length)).toFixed(2),
              currency: this.form.value.currency
            }
            debts.push(debt);
          } else {
          const myDue = (sanitizedAmount / (this.users.length)) * (this.users.length - 1);
            let debt: Debt = {
              from: user,
              to: this.payer,
              amount: -myDue.toFixed(2),
              currency: this.form.value.currency
            }
            debts.push(debt);
          }
        }
      );
    } else {
      debts = this.debts;
    }
    const dateTime = new Date(this.form.value.date);
    dateTime.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
    const newExpense: Expense = {
      description: this.form.value.description,
      currency: this.form.value.currency,
      date: dateTime,
      amount: sanitizedAmount,
      debt: debts,
      categoryId: +this.form.value.category,
      groupId: this.data.groupId
    }
    if (this.editMode) {
      newExpense.id = this.currentExpense.id;
    }
    console.log(newExpense);
    this.expenseService.saveExpense(newExpense).subscribe({
      next: (result) => {
        this.editMode ?
          this.snackbarService.displayMessage(`Zapisano wydatek ${result.description}!`, 3000) :
          this.snackbarService.displayMessage(`Nowy wydatek ${result.description} założony!`, 3000);
        this.onCancel();
      },
      error: () => {
        this.snackbarService.displayError(`Nie udało się założyć wydatku ${newExpense.description}`);
      }
    });
    this.onCancel();
  }

  private initForm() {
    this.form = new FormGroup({
      amount: new FormControl(this.calculateAmount(this.currentExpense), [Validators.required, Validators.pattern(this.AMOUNT_PATTERN)]),
      description: new FormControl(this.currentExpense?.description ?? null, Validators.required),
      currency: new FormControl(this.defaultCurrency, Validators.required),
      name: this.userName,
      category: new FormControl(this.currentExpense?.categoryId ?? null),
      group: new FormControl(this.data.groupId, Validators.required),
      date: new FormControl(this.currentExpense?.date ?? new Date(), Validators.required)
    });
    this.listenForAmountChange();
  }

  openPayerDialog(payer: User, usersOriginalList: User[]) {
    if (this.payerDialogRef && (this.payerDialogRef as MatDialogRef<PayerDialogComponent>)?.getState() === 0 || this.dialog.openDialogs.length > 1) {
      return;
    }
    this.payerDialogRef = this.dialog.open(PayerDialogComponent, {
      data: {payerName: payer, usersOriginalList: usersOriginalList},
      hasBackdrop: false,
      width: '300px',
      position: {left: '68%'},
      panelClass: 'slide-in-from-right'
    });

    this.payerDialogRef.afterClosed().subscribe(payerId => {
      if (payerId === undefined) {
        return;
      }
      this.form.get('name')?.patchValue(payerId);
      this.payer = payerId;
      this.betweenWho = "wszyscy";
      this.splitHow = "po równo";
      this.debts = [];
    });
  }

  onDelete() {
    this.dialog.open(ConfirmationComponent, {data: {category: "wydatek", content: this.currentExpense.description}})
      .afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.expenseService.deleteExpense(this.currentExpense.id!).subscribe(
          () => {
            this.snackbarService.displayMessage(`Wydatek ${this.currentExpense.description} został skasowany`, 3000);
            this.dialog.closeAll();
          }
        );
      }
    });
  }

  openCurrencyDialog(currencies: string[], defaultCurrency: string) {
    if (this.currencyDialogRef &&
      (this.currencyDialogRef as MatDialogRef<CurrencyDialogComponent>)?.getState() === 0 || this.dialog.openDialogs.length > 1) {
      return;
    }

    this.currencyDialogRef = this.dialog.open(CurrencyDialogComponent, {
      data: {currencies: currencies, defaultCurrency: defaultCurrency},
      hasBackdrop: false,
      width: '300px',
      position: {left: '68%'},
      panelClass: 'slide-in-from-right'
    });

    this.currencyDialogRef.afterClosed().subscribe(currency => {
      if (currency === undefined) {
        return;
      }
      this.currentCurrency = currency;
      this.form.get('currency')?.patchValue(currency);
      this.debts.forEach((debt) => {
        debt.currency = currency;
      });
    });
  }

  openSplitDialog(usersOriginalList: User[]) {
    if (this.splitDialogRef &&
      (this.splitDialogRef as MatDialogRef<SplitDialogComponent>)?.getState() === 0 || this.dialog.openDialogs.length > 1) {
      return;
    }
    const config = {
      data: {users: usersOriginalList, currentUser: this.payer, currency: this.form.value.currency},
      hasBackdrop: false,
      width: '400px',
      position: {left: '68%'},
      panelClass: 'slide-in-from-right'
    };
    if (this.users.length > 2) {
      this.splitDialogRef = this.dialog.open(MultiUserSplitComponent, config);
    } else {
      this.splitDialogRef = this.dialog.open(SplitDialogComponent, config);
    }
    this.splitDialogRef.afterClosed().subscribe(split => {
      console.log(split);
      if (split === undefined) {
        return;
      }
      this.splitHow = split.text;
      this.betweenWho = "";
      this.debts = split.debts;
    });
  }

  sanitizeInput(amount: string) {
    this.form.get('amount')?.patchValue(this.sanitizeAmount(amount));
  }

  openCategoryDialog() {
    if (this.categoryDialogRef &&
      (this.categoryDialogRef as MatDialogRef<CategoryDialogComponent>)?.getState() === 0 || this.dialog.openDialogs.length > 1) {
      return;
    }
    const iconList = this.categories.map(c => c.categoryIconName);
    this.categoryDialogRef = this.dialog.open(CategoryDialogComponent, {
      data: {iconList: iconList},
      hasBackdrop: false,
      width: '500px',
      height: '600px',
      position: {left: '38%'},
      panelClass: 'slide-in-from-right'
    });
    this.categoryDialogRef.afterClosed().subscribe(category => {
      console.log(category);
      if (category === undefined) {
        return;
      }
      this.form.get('category')?.patchValue(category.id);
      this.categoryIcon = category.icon!;
    });
  }

  private patchForm(expense: Expense) {
    this.editMode = true;
    this.form.patchValue({
      amount: this.calculateAmount(expense),
      description: expense.description,
      currency: expense.currency,
      category: expense.categoryId,
      group: expense.groupId,
      date: expense.date
    });
    this.form.addControl("id", new FormControl(expense.id));
  }

  private sanitizeAmount(amount: string) {
    return amount.toString().replace(/,/g, '.');
  }

  updateValue(value: string) {
    const amount = this.sanitizeAmount(value);
    let parseInt = +amount;
    if (isNaN(parseInt)) {
      parseInt = 0;
    }
    this.dataSharingService.amount.set(parseInt);
  }

  private listenForAmountChange() {
    this.form.controls['amount'].valueChanges.subscribe((val: string) => {
      if (!val.toString().match(this.AMOUNT_PATTERN)) {
        this.form.controls['amount'].setErrors({invalidAmount: true})  // <--- Set invalidAmount to true
      } else {
        this.form.controls['amount'].setErrors(null)
      }
    });
  }

  private calculateAmount(expense: Expense): number | string {
    if (!expense?.debt) {
      return "";
    }
    let total = 0;
    expense.debt.map((debt) => {
      if (debt.amount < 0) {
        total = -(debt.amount * expense.debt.length / (expense.debt.length - 1)).toFixed(2);
      }
    })
    return total;
  }
}
