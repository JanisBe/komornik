import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../model/user";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {SnackbarService} from "../../../../service/snackbar.service";
import {Debt} from "../../../../model/debt";

@Component({
  selector: 'split-dialog',
  templateUrl: './split-dialog.component.html',
  styleUrl: './split-dialog.component.scss'
})
export class SplitDialogComponent implements OnInit, AfterViewInit {
  numberForm: FormGroup;
  sum = 0;
  @ViewChild("splitForm") splitForm: ElementRef<MatSelectionList>;
  private debts: Debt[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { users: User[], currentUser: User, amount: number },
    public dialogRef: MatDialogRef<SplitDialogComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.numberForm = this.fb.group({});
    this.data.users.forEach((user) => {
      this.numberForm.addControl('user' + user.id, this.fb.control(this.data.amount / this.data.users.length));
    });
    this.numberForm.addControl('splitForTwo', new FormControl([]));

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

    if (this.data.users.length > 2 && this.getSum() != this.data.amount) {
      this.snackbarService.displayError("Suma musi być równa: " + this.data.amount + " aktualnie: " + this.getSum());
      return;
    }
    if (this.data.users.length == 2) {
      if (selectedElement.selectedOptions.selected[0].value == "equal") {
        this.debts.push({
          from: this.data.users[0],
          to: this.data.users[1],
          amount: this.data.amount / 2
        });
        this.debts.push({
          from: this.data.users[0],
          to: this.data.users[1],
          amount: this.data.amount / 2
        });
        this.dialogRef.close({debts: this.debts, text: "wszyscy po równo"});
      } else {
        this.dialogRef.close({
          debts: this.debts,
          text: selectedElement.selectedOptions.selected[0].value.name + " płaci za wszystko"
        });
      }
    }
  }

  getForm(idx: number) {
    return this.numberForm.get('user' + idx) as FormControl;
  }

  onChangeParticipant(event: MatSelectionListChange) {

    const currentOption = event.options[0];
    const idx = currentOption.value.id;

    if (currentOption.selected) {
      currentOption._elementRef.nativeElement.classList.remove('disabled');
      this.numberForm.addControl('user' + idx, this.fb.control(0));
    } else {
      currentOption._elementRef.nativeElement.classList.add('disabled');
      console.log('user' + idx)
      this.numberForm.removeControl('user' + idx);
    }
    console.log(this.numberForm)
  }

  getUserNameForm(id: number) {
    return "user" + id;
  }
}
