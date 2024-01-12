import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../model/user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SnackbarService} from "../../../../service/snackbar.service";
import {Debt} from "../../../../model/debt";
import {MatSelectionList, MatSelectionListChange} from "@angular/material/list";

@Component({
  selector: 'multi-user-split',
  templateUrl: './multi-user-split.component.html',
  styleUrl: './multi-user-split.component.scss'
})
export class MultiUserSplitComponent implements OnInit, AfterViewInit {
  numberForm: FormGroup;
  sum = 0;
  amount = 0
  @ViewChild("splitForm") splitForm: ElementRef<MatSelectionList>;
  private debts: Debt[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { users: User[], currentUser: User, amount: number },
    public dialogRef: MatDialogRef<MultiUserSplitComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnInit() {
    if (!!this.data.amount) {
      this.amount = this.data.amount
    }
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

  ok(selectedElement: any) {
    console.log(selectedElement)
    if (this.getSum() != this.data.amount) {
      this.snackbarService.displayError("Suma musi być równa: " + this.data.amount + " aktualnie: " + this.getSum());
      return;
    }
    return;
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
      console.log('user' + idx)
      this.numberForm.get('user' + idx)?.patchValue(0)
      this.numberForm.removeControl('user' + idx);
      this.recalculate();
    }
  }

  getUserNameForm(id: number) {
    return "user" + id;
  }

  private recalculate() {
    const numberOfForms = Object.keys(this.numberForm.controls).length;
    Object.keys(this.numberForm.controls).forEach(key => {
      this.numberForm.controls[key].patchValue(this.amount / numberOfForms);
    });
  }
}
