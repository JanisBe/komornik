import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpenseService} from "../../../service/expense.service";
import {ActivatedRoute} from "@angular/router";
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
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable, of} from "rxjs";
import {PayerDialogComponent} from "../dialogs/payer-dialog/payer-dialog.component";
import {SplitDialogComponent} from "../dialogs/split-dialog/split-dialog.component";
import {CurrencyDialogComponent} from "../dialogs/currency-dialog/currency-dialog.component";
import {CategoryDialogComponent} from "../dialogs/category-dialog/category-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {MultiUserSplitComponent} from "../dialogs/multi-user-split/multi-user-split.component";
import {DatasharingService} from "../../../service/datasharing.service";


@Component({
  selector: 'add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  form: FormGroup;
  users: User[];
  categories: Category[];
  currentUser: User;
  currentGroupId: number;
  currentGroup: Group;
  currentGroupName$: Observable<string>;
  currentExpense: Expense;
  currencies: string[] = [];
  defaultCurrency: string;
  payer: User;
  betweenWho = "wszyscy";
  splitHow = "po równo";
  userName = new FormControl('');
  isUserInGroup = false;
  noResults = false;
  categoryIcon = "description";
  private payerDialogRef: MatDialogRef<PayerDialogComponent>;
  private currencyDialogRef: MatDialogRef<CurrencyDialogComponent>;
  private categoryDialogRef: MatDialogRef<CategoryDialogComponent>;
  private editMode: boolean;
  private debts: Debt[] = [];
  private splitDialogRef: MatDialogRef<SplitDialogComponent | MultiUserSplitComponent>;

  constructor(private expenseService: ExpenseService,
              private snackbarService: SnackbarService,
              private currencyService: CurrencyService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private groupService: GroupService,
              private authService: AuthService,
              private dataSharingService: DatasharingService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { groupId: number }) {
  }

  ngOnDestroy(): void {
    this.onCancel();
  }


  ngOnInit(): void {
    this.currentUser = Object.assign({}, this.authService.user.value!);
    this.currentUser.token = undefined;
    this.payer = this.currentUser;
    this.currentGroupId = this.route.snapshot.params['groupId'] ? this.route.snapshot.params['groupId'] : this.data.groupId;
    this.initForm();
    this.groupService.findById(this.currentGroupId).subscribe(group => {
      this.currentGroup = group;
      this.currentGroupName$ = of(this.currentGroup.groupName);
      this.isUserInGroup = this.currentGroup.users.map(user => user.id).includes(this.currentUser.id);
      this.users = group.users;
    });
    this.currencyService.getDefaultCurrencyForGroup(this.currentGroupId)
      .subscribe(response => {
        this.defaultCurrency = response;
        this.form.get('currency')?.patchValue(this.defaultCurrency)
      });

    this.categoryService.findAllCategories().subscribe(category => this.categories = category);
    this.currencies = this.currencyService.getAllCurrencies();

    if (!!this.route.snapshot.params['expenseId']) {
      this.editMode = true;
      this.expenseService.findById(this.route.snapshot.params['expenseId']).subscribe({
        next: (expense) => {
          this.currentExpense = expense;
          let debtors = expense.debt.flatMap(d => d.from);
          let creditors = expense.debt.flatMap(d => d.to);
          let allUsers = creditors.concat(debtors.filter((item) => debtors.indexOf(item) < 0));
          this.isUserInGroup = allUsers.map(user => user.id).includes(this.currentUser.id);
          this.patchForm(expense);
          this.users = allUsers.filter(user => user.id !== this.currentUser.id);
        }, error: (err: HttpErrorResponse) => {
          console.log(err)
          this.snackbarService.displayError("nie ma wyników");
          this.noResults = true;
        }
      });
    }
  }

  onCancel() {
    this.dialog.closeAll()
  }

  onSubmit() {
    let debts: Debt[] = [];
    const sanitizedAmount = parseInt(this.sanitizeAmount(this.form.value.amount));
    console.log(this.users.length);
    if (debts.length == 0) {
      this.users.forEach((user) => {
        if (user.id !== this.payer.id) {
            let debt: Debt = {
              from: this.payer,
              to: user,
              amount: +(sanitizedAmount / (this.users.length)).toFixed(2)
            }
            debts.push(debt);
          } else {
          const myDue = (sanitizedAmount / (this.users.length)) * (this.users.length - 1);
            let debt: Debt = {
              from: user,
              to: this.payer,
              amount: -myDue.toFixed(2)
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
      debt: debts,
      categoryId: +this.form.value.category,
      groupId: this.currentGroupId
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
      amount: new FormControl(null, [Validators.required, Validators.pattern('^\\d*\\.?,?\\d*$')]),
      description: new FormControl(null, Validators.required),
      currency: new FormControl(this.defaultCurrency, Validators.required),
      name: this.userName,
      split: new FormControl(50, Validators.required),
      category: new FormControl(null),
      group: new FormControl(this.currentGroupId, Validators.required),
      date: new FormControl(new Date(), Validators.required)
    })
  }

  private patchForm(expense: Expense) {
    const debt = expense.debt.reduce((sum, {amount}) => ({
      amount: sum.amount + Math.abs(amount),
      from: sum.from,
      to: sum.to
    }));
    this.form.get('amount')?.patchValue(debt.amount);
    this.form.get('description')?.patchValue(expense.description);
    this.form.get('currency')?.patchValue(expense.currency);

    const currentCategory = this.categories.filter(c => c.id === expense.categoryId)[0];
    this.form.get('category')?.patchValue(currentCategory.id);
    this.form.get('date')?.patchValue(expense.date);
    this.form.get('group')?.patchValue(expense.groupId);
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
    });
  }

  openSplitDialog(usersOriginalList: User[]) {
    if (this.splitDialogRef &&
      (this.splitDialogRef as MatDialogRef<SplitDialogComponent>)?.getState() === 0 || this.dialog.openDialogs.length > 1) {
      return;
    }
    const config = {
      data: {users: usersOriginalList, currentUser: this.payer},
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
      if (split === undefined) {
        return;
      }
      this.splitHow = split.text;
      this.betweenWho = "";
      this.debts = split.debts;
      console.log(split);
    });
  }

  sanitizeInput(amount: string) {
    this.form.get('amount')?.patchValue(this.sanitizeAmount(amount));
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
      this.defaultCurrency = currency;
      this.form.get('currency')?.patchValue(currency);
    });
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
      width: '300px',
      position: {left: '68%'},
      panelClass: 'slide-in-from-right'
    });
    this.categoryDialogRef.afterClosed().subscribe(icon => {
      if (icon === undefined) {
        return;
      }
      const category = this.categories.filter(c => c.categoryIconName === icon)[0];
      this.form.get('category')?.patchValue(category.id);
      this.categoryIcon = category.categoryIconName!;
    });
  }

  private sanitizeAmount(amount: string) {
    return amount?.replace(/,/g, '.');
  }

  updateValue(value: string) {
    const amount = this.sanitizeAmount(value);
    let parseInt = Number.parseInt(amount);
    if (isNaN(parseInt)) {
      parseInt = 0;
    }
    this.dataSharingService.amount.set(parseInt);
  }
}
