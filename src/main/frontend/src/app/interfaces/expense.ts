export interface Expense {
  id?: number,
  currency: string,
  amount: number,
  description: string,
  note?: string,
  date: Date,
  split: number,
  userId: number,
  categoryId: number,
  fromUserId: number
  groupId: number
}
