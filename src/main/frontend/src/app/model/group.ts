import {User} from "./user";

export interface Group {
  id?: number,
  name: string,
  description: string,
  defaultCurrency?: string,
  groupIconName?: string,
  users: User[]
}
