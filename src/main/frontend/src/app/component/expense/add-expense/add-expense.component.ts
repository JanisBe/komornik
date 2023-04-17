import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {

  }

  private initForm() {
    this.form = new FormGroup({})
  }
}
