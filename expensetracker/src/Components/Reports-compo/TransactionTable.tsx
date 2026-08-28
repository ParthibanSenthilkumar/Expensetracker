import type { AddTransaction } from "../../Types/Addtransactiontype";

interface TransProp {
  currentList: AddTransaction[];
}
const TransactionTable = ({ currentList }: TransProp) => {
  return (
    <>
    <div className="w-full overflow-x-auto rounded-lg shadow-custom1">
      <table className="w-full bg-white min-w-[700px] ">
        <thead>
          <tr className="border-b border-gray-100 text-sm text-gray-700 text-left">
            <th className="px-4 py-4 font-medium font-heading">S.No</th>
            <th className="px-4 py-4 font-medium font-heading">Amount</th>
            <th className="px-4 py-4 font-medium font-heading">Category</th>
            <th className="px-4 py-4 font-medium font-heading">Date</th>
            <th className="px-4 py-4 font-medium font-heading">TransType</th>
            <th className="px-4 py-4 font-medium font-heading">Description</th>
          </tr>
        </thead>
        <tbody>
          {currentList && currentList.length > 0 ? (
            currentList.map((translist, index) => (
              <tr
                key={translist.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className=" px-2.5 py-4 md:px-4 md:py-4 text-sm text-gray-500 font-secondary">
                  {index + 1}
                </td>
                <td
                  className={`px-2.5 py-4 md:px-4 md:py-4 text-sm font-medium font-secondary whitespace-nowrap ${
                    translist.transType === "Income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {translist.transType === "Income"
                    ? `+₹${translist.amount}`
                    : `-₹${translist.amount}`}
                </td>
                <td className="px-2.5 py-4 md:px-4 md:py-4 text-sm text-indigo-500 font-medium font-secondary whitespace-nowrap">
                  {translist.category}
                </td>
                <td className="px-2.5 py-4 md:px-4 md:py-4 text-sm text-gray-500 font-secondary whitespace-nowrap">
                  {translist.date}
                </td>
                <td className="px-2.5 py-4 md:px-4 md:py-4 text-sm text-gray-500 font-secondary whitespace-nowrap">
                  <span
                    className={`inline-block py-1 px-3 rounded-full text-xs font-medium whitespace-nowrap ${
                      translist.transType === "Income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-rose-600"
                    }`}
                  >
                    {translist.transType}
                  </span>
                </td>
                <td className="px-2.5 py-4 md:px-4 md:py-4 text-sm text-gray-500 font-secondary whitespace-nowrap">
                  {translist.description.length > 25
                    ? `${translist.description.slice(0, 25)}...`
                    : translist.description}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-10 text-center text-sm text-gray-400 font-secondary whitespace-nowrap"
              >
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default TransactionTable;
