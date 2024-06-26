import {AfterViewInit, ChangeDetectorRef, Component, effect, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {User} from "../../../../model/user";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SnackbarService} from "../../../../service/snackbar.service";
import {MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {DataSharingService} from "../../../../service/data-sharing.service";
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Debt} from "../../../../model/debt";

@Component({
  selector: 'multi-user-split',
  templateUrl: './multi-user-split.component.html',
  styleUrl: './multi-user-split.component.scss',
  standalone: true,
  imports: [MatDialogTitle, MatIcon, MatDialogContent, FormsModule, ReactiveFormsModule, MatSelectionList, MatListOption, MatDialogActions, MatButton]
})
export class MultiUserSplitComponent implements OnInit, AfterViewInit {
  numberForm: FormGroup;
  sum = 0;
  amount: number = 0;
  private debts: Map<User, number>;
  private participants = '';
  amountValid = false;
  private wasChanged = false;
  private editMode: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { users: User[], currentUser: User, currency: string, existingDebts: Debt[] },
    public dialogRef: MatDialogRef<MultiUserSplitComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private dataSharingService: DataSharingService,
    private cd: ChangeDetectorRef) {
    effect(() => {
      this.amount = this.dataSharingService.amount();
      this.recalculate();
    });
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnInit() {
    if (this.data.existingDebts.length > 0) {
      this.editMode = true;
    }
    this.numberForm = this.fb.group({});
    const divideMap = this.divideCurrencyEvenly(this.amount, this.data.users.length);
    this.data.users.forEach((user, index) => {
      const debtPerUser = divideMap.at(index);
      this.numberForm.addControl('user' + user.id, this.fb.control(debtPerUser));
    });
  }

  getSum(): number {
    let sum = 0;
    this.data.users.forEach((user) => {
      sum += +this.numberForm.get('user' + user.id)?.value || 0;
    });
    this.sum = sum;
    return sum;
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.numberForm.pristine && !this.wasChanged) {
      this.dialogRef.close();
      return;
    }
    if (!this.checkIfSumIsOK()) {
      this.snackbarService.displayError("Suma musi być równa: " + this.amount + " aktualnie: " + this.getSum());
      return;
    }
    let calculatedDebts = this.recalculate();
    console.log(this.data.existingDebts);
    if (this.editMode) {
      this.assignIdsToDebts(calculatedDebts, this.data.existingDebts);
      console.log(calculatedDebts);
    }
    this.dialogRef.close({
      debts: calculatedDebts,
      text: this.participants
    });
  }

  doNothing($event: MouseEvent) {
    this.checkIfSumIsOK()
    $event.stopPropagation();
    $event.preventDefault();
  }

  onChangeParticipant(event: MatSelectionListChange) {
    this.wasChanged = true;
    const currentOption = event.options[0];
    const idx = currentOption.value.id;
    if (currentOption.selected) {
      currentOption._elementRef.nativeElement.classList.remove('disabled');
      this.numberForm.addControl('user' + idx, this.fb.control(0));
      this.recalculate();
    } else {
      currentOption._elementRef.nativeElement.classList.add('disabled');
      this.numberForm.get('user' + idx)?.patchValue(0)
      this.numberForm.removeControl('user' + idx);
      this.recalculate();
    }
  }

  getUserNameForm(id: number) {
    return "user" + id;
  }

  private checkIfSumIsOK() {
    if (this.getSum() === this.amount) {
      this.amountValid = true;
      return true;
    }
    this.amountValid = false;
    return false;
  }

  divideCurrencyEvenly(numerator: number, divisor: number) {
    const results = [];
    const dividend = +(Math.floor(numerator / divisor * 100) / 100).toFixed(2);
    for (let i = 0; i < divisor - 1; i++) {
      results.push(dividend);
    }
    results.push(numerator - (divisor - 1) * dividend);
    return results;
  }

  private recalculate() {
    this.participants = "";
    let participants = '';
    const allFormControls = Object.keys(this.numberForm.controls);
    const numberOfForms = allFormControls.length;
    const divideMap = this.divideCurrencyEvenly(this.amount, numberOfForms);
    this.debts = new Map<User, number>();
    allFormControls.forEach((key, index) => {
      this.numberForm.controls[key].patchValue(divideMap.at(index));
      const uId = +key.slice(4);
      const user = this.data.users.find(u => u.id === uId)!;
      this.debts.set(user, this.numberForm.controls[key].value);
      participants += `${user.name} ,`
    });
    this.participants = participants.slice(0, -2);
    this.checkIfSumIsOK();
    return this.convertToDebts(this.debts, this.data.currentUser);
  }

  private convertToDebts(debtMap: Map<User, number>, currentUser: User) {
    let debts: Debt[] = [];
    let totalValue: number = 0;
    debtMap.forEach((value, user) => {
      if (user.id !== currentUser.id) {
        let debtForOtherUser: Debt = {from: user, to: currentUser, amount: value, currency: this.data.currency};
        debts.push(debtForOtherUser);
        totalValue += value;
      }
    });
    let debtForCurrenUser: Debt = {
      from: currentUser,
      to: currentUser,
      amount: -totalValue,
      currency: this.data.currency
    };
    debts.push(debtForCurrenUser);
    return debts;
  }

  private assignIdsToDebts(calculatedDebts: Debt[], existingDebts: Debt[]) {
    existingDebts.forEach(debt => {
      calculatedDebts.map(calculatedDebt => {
        if (debt.from.id === calculatedDebt.from.id && debt.to.id === calculatedDebt.to.id) {
          calculatedDebt.id = debt.id;
        }
      })
    })
  }
}
