import {User} from "./user";

export interface Debt {
  id?: number,
  from: User,
  to: User,
  amount: number,
  currency: string
}
