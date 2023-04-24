import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Expense} from "../interfaces/expense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private httpClient: HttpClient) {
  }

  saveExpense(expense: Expense) {
    return this.httpClient.post<Expense>("http://localhost:8080/expense/save", expense);
  }

  deleteExpense(expenseId: number) {
    return this.httpClient.delete(`http://localhost:8080/expense/delete${expenseId}`);
  }

  editExpense(expense: Expense) {
    return this.httpClient.patch<Expense>("http://localhost:8080/expense/edit", expense);
  }


}
