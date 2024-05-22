import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {User} from "../../../../model/user";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Debt} from "../../../../model/debt";
import {DataSharingService} from "../../../../service/data-sharing.service";
import {SnackbarService} from "../../../../service/snackbar.service";
import {MatButton} from '@angular/material/button';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'split-dialog',
  templateUrl: './split-dialog.component.html',
  styleUrl: './split-dialog.component.scss',
  standalone: true,
  imports: [MatDialogTitle, MatIcon, MatDialogContent, FormsModule, ReactiveFormsModule, MatSelectionList, MatListOption, MatDialogActions, MatButton]
})
export class SplitDialogComponent implements OnInit, AfterViewInit {
  numberForm: FormGroup;
  private debts: Debt[] = [];
  amount = this.dataSharingService.amount;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { users: User[], currentUser: User, currency: string },
    public dialogRef: MatDialogRef<SplitDialogComponent>,
    private fb: FormBuilder,
    private dataSharingService: DataSharingService,
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
        amount: -this.amount() / 2,
        currency: this.data.currency
      });
      this.debts.push({
        from: this.data.users[0],
        to: this.data.users[1],
        amount: this.amount() / 2,
        currency: this.data.currency
      });
      this.dialogRef.close({debts: this.debts, text: "wszyscy po równo"});
    } else {
      this.debts.push({
        from: selectedElement.selectedOptions.selected[0].value,
        to: selectedElement.selectedOptions.selected[0].value,
        amount: -this.amount(),
        currency: this.data.currency
      });
      this.debts.push({
        from: selectedElement.selectedOptions.selected[0].value,
        to: selectedElement.selectedOptions.selected[0].value,
        amount: this.amount(),
        currency: this.data.currency
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
