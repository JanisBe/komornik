import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Expense} from "../model/expense";
import {Debt} from "../model/debt";
import {environment} from "../../environments/environment";

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
    return this.httpClient.get<Debt[]>(`${environment.API_URL}/expense/calculateSettlements/${groupId}`);
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
}
