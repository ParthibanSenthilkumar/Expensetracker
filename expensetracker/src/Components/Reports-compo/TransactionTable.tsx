import type { AddTransaction } from "../../Types/Addtransactiontype";

interface TransProp {
  filteredData: AddTransaction[];
}
const TransactionTable = ({ filteredData }: TransProp) => {
  return (
    <>
      <table className="w-full bg-white rounded-lg shadow-custom1 overflow-hidden">
        <thead>
          <tr className="border-b border-gray-100 text-sm text-gray-700 text-left">
            <th className="px-4 py-3 font-medium font-heading">S.No</th>
            <th className="px-4 py-3 font-medium font-heading">Amount</th>
            <th className="px-4 py-3 font-medium font-heading">Category</th>
            <th className="px-4 py-3 font-medium font-heading">Date</th>
            <th className="px-4 py-3 font-medium font-heading">TransType</th>
            <th className="px-4 py-3 font-medium font-heading">Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((translist, index) => (
              <tr
                key={translist.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4 text-sm text-gray-500 font-secondary">
                  {index + 1}
                </td>
                <td
                  className={`px-4 py-4 text-sm font-medium font-secondary ${
                    translist.transType === "Income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {translist.transType === "Income"
                    ? `+₹${translist.amount}`
                    : `-₹${translist.amount}`}
                </td>
                <td className="px-4 py-4 text-sm text-indigo-500 font-medium font-secondary">
                  {translist.category}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 font-secondary">
                  {translist.date}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 font-secondary">
                  <span
                    className={`inline-block py-1 px-3 rounded-full text-xs font-medium ${
                      translist.transType === "Income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-rose-600"
                    }`}
                  >
                    {translist.transType}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 font-secondary">
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
                className="px-4 py-10 text-center text-sm text-gray-400 font-secondary"
              >
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TransactionTable;
