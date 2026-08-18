import type { AddTransaction } from "../../Types/Addtransactiontype";

interface TransProp {
  filteredData: AddTransaction[];
}
const TransactionTable = ({ filteredData }: TransProp) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Amount</th>
            <th>category</th>
            <th>date</th>
            <th>transType</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData?.length > 0 ? (
            filteredData.map((translist, index) => (
              <tr key={translist.id}>
                <td>{index + 1}</td>
                <td>{translist.amount} </td>
                <td>{translist.category} </td>
                <td>{translist.date} </td>
                <td>{translist.transType} </td>
                <td>{translist.description} </td>
              </tr>
            ))
          ) : (
            <tr>
                <td colSpan={6}>No data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TransactionTable;
