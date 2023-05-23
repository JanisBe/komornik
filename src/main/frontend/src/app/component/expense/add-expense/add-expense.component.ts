import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpenseService} from "../../../service/expense.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../../../service/snackbar.service";
import {Expense} from "../../../interfaces/expense";
import {User} from "../../../interfaces/user";
import {UserService} from "../../../service/user.service";
import {CurrencyService} from "../../../service/currency.service";
import {Observable, of} from "rxjs";
import {Category} from "../../../interfaces/category";
import {CategoryService} from "../../../service/category.service";
import {GroupService} from "../../../service/group.service";
import {Group} from 'src/app/interfaces/group';
import {AuthService} from "../../../auth/auth.service";


@Component({
  selector: 'add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  form: FormGroup;
  users$: Observable<User[]>;
  categories$: Observable<Category[]>;
  currentUserId: number;
  currentGroupId: number = 1;
  currentGroup$: Observable<Group>;
  userGroups$: Observable<Group[]>;
  defaultSplit: number = 50;
  currencies: string[] = [];
  defaultCurrency: string;
  @ViewChild("slider") slider: ElementRef;
  @ViewChild("sliderInput") sliderInput: ElementRef;

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
    this.initForm();
    this.currentUserId = this.authService.user.value?.id!;
    console.log(this.currentUserId);
    if (!!this.route.snapshot.params['groupId']) {
      this.currentGroupId = this.route.snapshot.params['groupId'];
      this.currentGroup$ = this.groupService.findById(this.currentGroupId);
    } else {
      this.userGroups$ = this.groupService.findAllGroupsForUser(this.currentUserId);
    }
    this.users$ = this.userService.findUsersInGroup(this.currentGroupId);
    this.categories$ = this.categoryService.findAllCategories();
    this.currencies = this.currencyService.getAllCurrencies();
    this.currencyService.getDefaultCurrencyForGroup(this.currentGroupId)
      .subscribe(response => {
        this.defaultCurrency = response;
        this.form.get('currency')?.patchValue(this.defaultCurrency)
      });
  }

  onCancel() {
    this.router.navigate(['expense/list']);
  }

  onSubmit() {
    const amount = this.form.value.amount;
    const newExpense: Expense = {
      amount: amount.replace(/,/g, '.'),
      description: this.form.value.description,
      currency: this.form.value.currency,
      date: new Date(),
      split: +this.defaultSplit,
      userId: +this.form.value.userName.id,
      categoryId: +this.form.value.category,
      fromUserId: +this.currentUserId,
      groupId: this.currentGroupId
    }

    this.expenseService.saveExpense(newExpense).subscribe({
      next: (result) => {
        this.snackbarService.displayMessage(`Nowy wydatek ${result.description} założony!`);
        // this.onCancel();
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
    this.users$ = of(group.users);
    this.currentGroupId = group.id!;
  }

  private initForm() {
    this.form = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.pattern('^\\d*\\.?,?\\d*$')]),
      description: new FormControl(null, Validators.required),
      currency: new FormControl(this.defaultCurrency, Validators.required),
      userName: new FormControl(null, Validators.required),
      split: new FormControl(50, Validators.required),
      category: new FormControl(null, Validators.required),
      group: new FormControl(this.currentGroupId, Validators.required),
      date: new FormControl(new Date(), Validators.required)
    })
    }
}
