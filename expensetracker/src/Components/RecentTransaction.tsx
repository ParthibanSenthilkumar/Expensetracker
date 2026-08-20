import type React from "react";
import useFetch from "../Hooks/useFetch";
import { getTransactions } from "../Services/Api";
import Loader from "./Loader";
import { errorToast } from "./Toaster";
interface filterProp{
  filtertype:string
  setFiltertype:React.Dispatch<React.SetStateAction<string>>
}
const RecentTransaction = ({filtertype,setFiltertype}:filterProp) => {
  const { data, loading, error } = useFetch(getTransactions);
  const lastestrans =[...(data)?? []].sort((a, b) => new Date(b.date).getTime()  - new Date(a.date).getTime() ).slice(0,5);
  // console.log(lastestrans, "lastestrans");
  
  let filteredData = lastestrans ?? [];
  if (filtertype === "Income") {
    filteredData = lastestrans?.filter((item) => item.transType === "Income") ?? [];
  }
  if (filtertype === "Expense") {
     filteredData= lastestrans?.filter((item) => item.transType === "Expense") ?? []
  }
  if(loading){
    return <Loader />
  }
  if(error){
    errorToast(error)
  }
  return (
  <>
        <div className="trans-data">
        <button onClick={() => setFiltertype("All")}> All </button>
        <button onClick={() => setFiltertype("Income")}> Income </button>
        <button onClick={() => setFiltertype("Expense")}> Expense </button>
      </div>
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

export default RecentTransaction;
