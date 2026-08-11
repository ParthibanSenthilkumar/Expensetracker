export interface AddTransaction{
  id?:string
  amount:string,
  category:string,
  description:string,
  date:string,
  transType: "Income" | "Expense"
}