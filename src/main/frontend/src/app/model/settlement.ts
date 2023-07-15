import {User} from "./user";

export interface Settlement {
  from: User;
  to: User;
  amount: number
}
