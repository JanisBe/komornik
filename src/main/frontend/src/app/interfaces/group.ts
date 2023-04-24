import {User} from "./user";

export interface Group {
  id?: number,
  groupName: string,
  groupDescription: string
  users: [User]
}
