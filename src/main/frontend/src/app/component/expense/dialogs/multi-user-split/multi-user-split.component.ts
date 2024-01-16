import {AfterViewInit, ChangeDetectorRef, Component, effect, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../model/user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SnackbarService} from "../../../../service/snackbar.service";
import {MatSelectionListChange} from "@angular/material/list";
import {DatasharingService} from "../../../../service/datasharing.service";

@Component({
  selector: 'multi-user-split',
  templateUrl: './multi-user-split.component.html',
  styleUrl: './multi-user-split.component.scss'
})
export class MultiUserSplitComponent implements OnInit, AfterViewInit {
  numberForm: FormGroup;
  sum = 0;
  amount: number = 0;
  private debts: Map<User, number>;
  private participants = '';
  amountValid = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { users: User[], currentUser: User },
    public dialogRef: MatDialogRef<MultiUserSplitComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private dataSharingService: DatasharingService,
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
    this.numberForm = this.fb.group({});
    this.data.users.forEach((user) => {
      this.numberForm.addControl('user' + user.id, this.fb.control(this.amount / this.data.users.length));
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

  ok() {
    if (this.numberForm.pristine) {
      this.dialogRef.close();
      return;
    }
    if (this.checkIfSumIsOK()) {
      this.snackbarService.displayError("Suma musi być równa: " + this.amount + " aktualnie: " + this.getSum());
      return;
    }
    this.dialogRef.close({
      debts: this.recalculate(),
      text: this.participants
    });
  }

  doNothing($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
  }

  onChangeParticipant(event: MatSelectionListChange) {
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
    if (this.getSum() != 0 &&
      this.getSum() / this.amount < 1 &&
      this.getSum() / this.amount > 1.01) {
      this.amountValid = true;
      console.log("true")
      return true;
    }
    this.amountValid = false;
    console.log("false");

    return false;
  }

  private recalculate() {
    this.checkIfSumIsOK()
    const numberOfForms = Object.keys(this.numberForm.controls).length;
    this.debts = new Map<User, number>();
    Object.keys(this.numberForm.controls).forEach(key => {
      this.numberForm.controls[key].patchValue((this.amount / numberOfForms).toFixed(2));
      const uId = Number.parseInt(key.slice(4));
      const user = this.data.users.find(u => u.id === uId)!;
      this.debts.set(user, this.numberForm.controls[key].value);
      this.participants += `${user.name} ,`
    });
    this.participants.slice(0, -1);
    return this.debts;
  }
}
