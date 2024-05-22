import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Expense} from "../model/expense";
import {environment} from "../../environments/environment";
import {Settlement} from "../model/settlement";
import {Debt} from "../model/debt";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private httpClient: HttpClient) {
  }

  saveExpense(expense: Expense) {
    return this.httpClient.post<Expense>(`${environment.API_URL}/expense/save`, expense);
  }

  deleteExpense(expenseId: number) {
    return this.httpClient.delete(`${environment.API_URL}/expense/delete/${expenseId}`);
  }

  editExpense(expense: Expense) {
    return this.httpClient.patch<Expense>(`${environment.API_URL}/expense/edit`, expense);
  }

  findAllByGroupId(groupId: number) {
    return this.httpClient.get<Expense[]>(`${environment.API_URL}/expense/findAllByGroup/${groupId}`);
  }

  calculateExpenses(groupId: number) {
    return this.httpClient.get<Settlement[]>(`${environment.API_URL}/expense/calculateSettlements/${groupId}`);
  }

  findAllByUser() {
    return this.httpClient.get<Expense[]>(`${environment.API_URL}/expense/findAllByUser/`);
  }

  findAll() {
    return this.httpClient.get<Expense[]>(`${environment.API_URL}/expense/findAll`);
  }

  findById(expenseId: number) {
    return this.httpClient.get<Expense>(`${environment.API_URL}/expense/findById/${expenseId}`);
  }

  recalculateForeignCurrency(debts: Debt[]) {
    return this.httpClient.post<Debt[]>(`${environment.API_URL}/expense/recalculateForeignCurrency`, debts);
  }
}
