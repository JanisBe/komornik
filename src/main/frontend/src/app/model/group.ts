import {User} from "./user";

export interface Group {
  id?: number,
  groupName: string,
  description: string,
  defaultCurrency?: string,
  groupIconName?: string,
  users: User[],
  isPublic: boolean
}
