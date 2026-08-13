
interface sumaryProps{
    totalBalance:number
    totalIncome:number
    totalExpense:number
}
const SummaryCard = ({totalBalance,totalIncome,totalExpense}:sumaryProps) => {
  return (
    <>
    <div className="ccard flex items-center justify-between gap-2.5">
      <div className="card p-5 shadow rounded-lg ">
        <h3 className="text-base text-gray-400">Total Balance</h3>
        <span className="text-2xl font-bold text-gray-950">{totalBalance}</span>
      </div>
      <div className="card p-5 shadow rounded-lg ">
        <h3 className="text-base text-gray-400">Total Income</h3>
        <span className="text-2xl font-bold text-gray-950">{totalIncome}</span>
      </div>
      <div className="card p-5 shadow rounded-lg ">
        <h3 className="text-base text-gray-400">Total Expense</h3>
        <span className="text-2xl font-bold text-gray-950">{totalExpense}</span>
      </div>
    </div>
    </>
  )
}

export default SummaryCard