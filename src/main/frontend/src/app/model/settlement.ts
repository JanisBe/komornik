import {Debt} from "./debt";

export interface Settlement {
  [currency: string]: Debt[]
}
