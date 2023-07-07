import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Expense} from "../model/expense";

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
      return this.httpClient.delete(`http://localhost:8080/expense/delete/${expenseId}`);
    }

  editExpense(expense: Expense) {
    return this.httpClient.patch<Expense>("http://localhost:8080/expense/edit", expense);
  }

  findAllByGroupId(groupId: number) {
    return this.httpClient.get<Expense[]>(`http://localhost:8080/expense/findAllByGroup/${groupId}`);
  }

  calculateExpenses(groupId: number) {
    return this.httpClient.get<Expense[]>(`http://localhost:8080/expense/calculateSettlements/${groupId}`);
  }

  findAllByUser(userId: number) {
    return this.httpClient.get<Expense[]>(`http://localhost:8080/expense/findAllByUser/${userId}`);
  }

  findAll() {
    return this.httpClient.get<Expense[]>(`http://localhost:8080/expense/findAll`);
  }

  findById(expenseId: number) {
    return this.httpClient.get<Expense>(`http://localhost:8080/expense/findById/${expenseId}`);
  }
}
