import {User} from "./user";

export interface Debt {
  from: User,
  to: User,
  amount: number
}
