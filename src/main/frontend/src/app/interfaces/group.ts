import {User} from "./user";

export interface Group {
  id?: number,
  name: string,
  groupDescription: string,
  defaultCurrency?: string,
  users: [User]
}
