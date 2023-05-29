import {Debt} from "./debt";

export interface Expense {
  id?: number,
  currency: string,
  description: string,
  note?: string,
  date: Date,
  categoryId: number,
  debt: Debt[],
  groupId: number
}
