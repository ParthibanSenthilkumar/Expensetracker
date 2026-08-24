import { FaWallet } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

interface sumaryProps {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}
const SummaryCard = ({
  totalBalance,
  totalIncome,
  totalExpense,
}: sumaryProps) => {
  return (
    <>
      <div className="flex items-center justify-between gap-2.5">
        <div className="card p-5 flex items-center justify-between shadow-custom1 rounded-lg grow max-w-2xs w-full">
          <div className="card-info ">
            <h3 className="text-[14px] text-gray-400 font-secondary">Total Balance</h3>
            <span className="text-3xl font-bold text-indigo-500 mt-2 font-heading block">
              {totalBalance}
            </span>
          </div>
          <FaWallet className="text-base text-indigo-500 h-12 w-12 flex items-center justify-between bg-indigo-100 rounded-md p-3 " />
        </div>
        <div className="card p-5 flex items-center justify-between shadow-custom1 rounded-lg grow max-w-2xs w-full">
          <div className="">
            <h3 className="text-[14px] text-gray-400 font-secondary">Total Income</h3>
            <span className="text-2xl font-bold text-green-500  mt-2 font-heading block">
              {totalIncome}
            </span>
          </div>
          <FaArrowTrendUp className="text-base text-green-500 h-12 w-12 flex items-center justify-between bg-green-100 rounded-md p-3"  />
        </div>
        <div className="card p-5 flex items-center justify-between shadow-custom1 rounded-lg grow max-w-2xs w-full">
          <div className="">
            <h3 className="text-[14px] text-gray-400 font-secondary">Total Expense</h3>
            <span className="text-2xl font-bold text-red-500  mt-2 font-heading block">
              {totalExpense}
            </span>
          </div>
          <FaArrowTrendDown className="text-base text-red-500 h-12 w-12 flex items-center justify-between bg-red-100 rounded-md p-3" />
        </div>
      </div>
    </>
  );
};

export default SummaryCard;
