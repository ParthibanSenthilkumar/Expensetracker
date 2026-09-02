import type React from "react";
import type { AddTransaction } from "../Types/Addtransactiontype";

interface FilterProp {
  data:AddTransaction[] | []
  filtertype: string;
  setFiltertype: React.Dispatch<React.SetStateAction<string>>;
}
const RecentTransaction = ({ data, filtertype, setFiltertype }: FilterProp) => {

  const latestTrans = [...(data ?? [])]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  let filteredData = latestTrans;
  if (filtertype === "Income") {
    filteredData = latestTrans.filter((item) => item.transType === "Income");
  }
  if (filtertype === "Expense") {
    filteredData = latestTrans.filter((item) => item.transType === "Expense");
  }

  return (
    <div className="w-full rounded-md bg-white p-5 shadow-custom1">
      <div className="flex flex-col justify-center a gap-4 lg:flex-row items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-indigo-500 font-heading">
            Recent Transactions
          </h2>
          <p className="text-sm text-gray-400 mt-1 font-secondary">
            Your latest income and expenses
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg w-fit">
          {["All", "Income", "Expense"].map((type) => (
            <button
              key={type}
              onClick={() => setFiltertype(type)}
              className={`px-2 lg:px-4 py-2 text-sm font-medium font-heading  rounded-md transition-all duration-200
                ${
                  filtertype === type
                    ? "bg-indigo-500 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800 hover:bg-white"
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-gray-100 text-sm text-gray-400">
              <th className="px-2 lg:px-4 py-3 font-medium font-heading">S.No</th>
              <th className="px-2 lg:px-4 py-3 font-medium font-heading">Amount</th>
              <th className="px-2 lg:px-4 py-3 font-medium font-heading">Category</th>
              <th className="px-2 lg:px-4 py-3 font-medium font-heading">Date</th>
              <th className="px-2 lg:px-4 py-3 font-medium font-heading">Type</th>
              <th className="px-2 lg:px-4 py-3 font-medium font-heading">Description</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-2 lg:px-4 py-4 text-sm text-gray-500 font-secondary">
                    {index + 1}
                  </td>

                  <td
                    className={`px-2 lg:px-4 py-4 font-semibold font-secondary ${
                      transaction.transType === "Income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.transType === "Income"
                      ? `+${transaction.amount}`
                      : `-${transaction.amount}`}
                  </td>

                  <td className="px-2 lg:px-4 py-4">
                    <span className="px-3 py-1 rounded-full text-indigo-600 text-xs font-bold font-secondary">
                      {transaction.category}
                    </span>
                  </td>

                  <td className="px-2 lg:px-4 py-4 text-sm text-gray-500 font-secondary">
                    {transaction.date}
                  </td>

                  <td className="px-2 lg:px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold font-secondary ${
                        transaction.transType === "Income"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {transaction.transType}
                    </span>
                  </td>

                  <td className="px-2 lg:px-4 py-4 text-sm text-gray-500 max-w-[200px] truncate">
                    {transaction.description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-400">
                  No Transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RecentTransaction;
