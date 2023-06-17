import {User} from "./user";

export interface Group {
  id?: number,
  name: string,
  description: string,
  defaultCurrency?: string,
  users: [User]
}
