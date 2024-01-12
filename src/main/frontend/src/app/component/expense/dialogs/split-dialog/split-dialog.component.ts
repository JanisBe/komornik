import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../model/user";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SnackbarService} from "../../../../service/snackbar.service";
import {Debt} from "../../../../model/debt";

@Component({
  selector: 'split-dialog',
  templateUrl: './split-dialog.component.html',
  styleUrl: './split-dialog.component.scss'
})
export class SplitDialogComponent implements OnInit, AfterViewInit {
  numberForm: FormGroup;
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
    this.numberForm.addControl('splitForTwo', new FormControl([]));
  }

  close() {
    this.dialogRef.close();
  }

  ok(selectedElement: any) {
    console.log(selectedElement)
    if (selectedElement.selectedOptions.selected[0].value == "equal") {
      this.debts.push({
        from: this.data.users[0],
        to: this.data.users[0],
        amount: -this.data.amount / 2
      });
      this.debts.push({
        from: this.data.users[0],
        to: this.data.users[1],
        amount: this.data.amount / 2
      });
      this.dialogRef.close({debts: this.debts, text: "wszyscy po równo"});
    } else {
      this.debts.push({
        from: selectedElement.selectedOptions.selected[0].value,
        to: selectedElement.selectedOptions.selected[0].value,
        amount: -this.data.amount
      });
      this.debts.push({
        from: selectedElement.selectedOptions.selected[0].value,
        to: selectedElement.selectedOptions.selected[0].value,
        amount: this.data.amount
      });
      this.dialogRef.close({
        debts: this.debts,
        text: selectedElement.selectedOptions.selected[0].value.name + " płaci za wszystko"
      });
    }
  }

  getForm(idx: number) {
    return this.numberForm.get('user' + idx) as FormControl;
  }
}
