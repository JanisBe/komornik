import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpenseService} from "../../../service/expense.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../../../service/snackbar.service";
import {Expense} from "../../../interfaces/expense";
import {User} from "../../../interfaces/user";
import {UserService} from "../../../service/user.service";
import {CurrencyService} from "../../../service/currency.service";
import {Observable} from "rxjs";
import {Category} from "../../../interfaces/category";
import {CategoryService} from "../../../service/category.service";
import {GroupService} from "../../../service/group.service";
import {Group} from 'src/app/interfaces/group';


@Component({
    selector: 'add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
    form: FormGroup;
    users: Observable<User[]>;
    categories: Observable<Category[]>;
    currentUserId = 1;
    currentGroupId = 1;
    currentGroup: Observable<Group>;
    defaultSplit: number = 50;
    currencies: string[] = [];
    defaultCurrency: string;
    @ViewChild("slider") slider: ElementRef;
    @ViewChild("sliderInput") sliderInput: ElementRef;
    protected readonly parseFloat = parseFloat;

    constructor(private expenseService: ExpenseService,
                private router: Router,
                private snackbarService: SnackbarService,
                private userService: UserService,
                private currencyService: CurrencyService,
                private categoryService: CategoryService,
                private route: ActivatedRoute,
                private groupService: GroupService) {
    }

    ngOnInit(): void {
        this.initForm();
        this.currentGroupId = this.route.snapshot.params['groupId'];
        if (!!this.currentGroupId) {
            this.currentGroup = this.groupService.findById(this.currentGroupId)
        }
        this.users = this.userService.findUsersInGroup(this.currentUserId);
        this.categories = this.categoryService.findAllCategories();
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
        const newExpense: Expense = {
            amount: this.form.value.amount,
            description: this.form.value.description,
            currency: this.form.value.currency,
            date: new Date(),
            split: this.form.value.split,
            userId: this.form.value.userName.id,
            categoryId: this.form.value.category
        }
        console.log(newExpense);
        this.expenseService.saveExpense(newExpense).subscribe({
            next: (result) => {
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

    private initForm() {
        this.form = new FormGroup({
            amount: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            currency: new FormControl(this.defaultCurrency, Validators.required),
            userName: new FormControl(null, Validators.required),
            split: new FormControl(50, Validators.required),
            category: new FormControl(null, Validators.required),
            date: new FormControl(new Date(), Validators.required)
        })
    }

    displayFn(user: User): string {
        return user?.name;
    }
}
