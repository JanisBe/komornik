import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpenseService} from "../../../service/expense.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../../../service/snackbar.service";
import {Expense} from "../../../model/expense";
import {User} from "../../../model/user";
import {UserService} from "../../../service/user.service";
import {CurrencyService} from "../../../service/currency.service";
import {Category} from "../../../model/category";
import {CategoryService} from "../../../service/category.service";
import {GroupService} from "../../../service/group.service";
import {Group} from 'src/app/model/group';
import {AuthService} from "../../../auth/auth.service";
import {Debt} from "../../../model/debt";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";


@Component({
  selector: 'add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  form: FormGroup;
  users: User[];
  usersOriginalList: User[];
  categories: Category[];
  currentUser: User;
  currentGroupId: number;
  currentGroup: Group;
  currentExpense: Expense;
  userGroups: Group[];
  defaultSplit: number = 50;
  currencies: string[] = [];
  defaultCurrency: string;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userName = new FormControl('');
  isUserInGroup = false;
  noResults = false;
  @ViewChild("slider") slider: ElementRef;
  @ViewChild("sliderInput") sliderInput: ElementRef;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
  private editMode: boolean;

  constructor(private expenseService: ExpenseService,
              private router: Router,
              private snackbarService: SnackbarService,
              private userService: UserService,
              private currencyService: CurrencyService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private groupService: GroupService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.user.value!;
    this.currentGroupId = this.route.snapshot.params['groupId'];
    this.initForm();
    this.groupService.findById(this.currentGroupId).subscribe(group => {
      this.currentGroup = group;
      this.isUserInGroup = this.currentGroup.users.map(user => user.id).includes(this.currentUser.id);
      this.userService.findUsersInGroup(this.currentGroupId).subscribe(((users) => {
        this.users = users.filter(user => user.id !== this.currentUser.id);
        this.usersOriginalList = [...this.users];
      }));
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
          this.usersOriginalList = [...this.users];
        }, error: () => {
          this.snackbarService.displayMessage("nie ma wyników");
          this.noResults = true;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['group/list']);
  }

  onSubmit() {
    let debts: Debt[] = [];
    const amount = this.form.value.amount;
    const sanitizedAmount = amount.replace(/,/g, '.');
    const currentUsers: User[] = [this.currentUser, ...this.users];
    currentUsers.forEach((user) => {
      if (user.id !== this.currentUser.id) {
        let debt: Debt = {
          from: this.currentUser,
          to: user,
          amount: +(sanitizedAmount / (currentUsers.length)).toFixed(2)
        }
        debts.push(debt);
      } else {
        const myDue = (sanitizedAmount / (currentUsers.length)) * (currentUsers.length - 1);
        let debt: Debt = {
          from: this.currentUser,
          to: user,
          amount: -myDue.toFixed(2)
        }
        debts.push(debt);
      }
    });
    const newExpense: Expense = {
      description: this.form.value.description,
      currency: this.form.value.currency,
      date: new Date(),
      debt: debts,
      categoryId: +this.form.value.category,
      groupId: this.currentGroupId
    }
    this.expenseService.saveExpense(newExpense).subscribe({
      next: (result) => {
        this.editMode ?
            this.snackbarService.displayMessage(`Zapisano wydatek ${result.description}!`) :
        this.snackbarService.displayMessage(`Nowy wydatek ${result.description} założony!`);
        this.onCancel();
      },
      error: () => {
        this.snackbarService.displayMessage(`Nie udało się założyć wydatku ${newExpense.description}`);
      }
    });
  }

  updateSlider() {
    if (this.sliderInput.nativeElement.value > 101) {
      this.sliderInput.nativeElement.value = 100;
    }
    if (this.sliderInput.nativeElement.value < 0) {
      this.sliderInput.nativeElement.value = 0;
    }
    this.defaultSplit = this.sliderInput.nativeElement.value;
  }

  updateSliderInput() {
    this.defaultSplit = this.slider.nativeElement.value;
  }

  displayFn(user: User): string {
    return user?.name;
  }

  onGroupChange(group: Group) {
    this.form.get('currency')?.patchValue(group.defaultCurrency);
    this.users = group.users;
    this.currentGroupId = group.id!;
  }

  add(event: MatChipInputEvent): void {
    const value = event.value;
    // Add our fruit
    if (value) {
      // this.users.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

  }

  remove(user: User): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.users.indexOf(event.option.value) < 0) {
      this.users.push(event.option.value);
    }
    this.userNameInput.nativeElement.value = '';
    this.userName.setValue(null);
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
}
