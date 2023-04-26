import {User} from "./user";

export interface Group {
  id?: number,
  name: string,
  groupDescription: string
  users: [User]
}
