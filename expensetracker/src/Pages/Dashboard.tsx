import { useEffect, useMemo, useState } from "react";
import Loader from "../Components/Loader";
import SummaryCard from "../Components/Reports-compo/SummaryCard";
import { errorToast } from "../Components/Toaster";
import useFetch from "../Hooks/useFetch";
import { getTransactions } from "../Services/Api";
import type { AddTransaction } from "../Types/Addtransactiontype";
// import ExpenseChart from "../Components/Reports-compo/ExpenseChart";
import RecentTransaction from "../Components/RecentTransaction";

const Dashboard = () => {
  let { data, loading, error } = useFetch<AddTransaction[]>(getTransactions);
  let [filtertype, setFiltertype] = useState<string>("All");

const expenseFilter = useMemo(() => {
  return data?.filter(
    (item) => item.transType === "Expense"
  ) ?? [];
}, [data]);

const totalIncome = useMemo(() => {
  return data
    ?.filter((item) => item.transType === "Income")
    .reduce(
      (sum, item) => sum + Number(item.amount),
      0
    ) ?? 0;
}, [data]);

const totalExpense = useMemo(() => {
  return expenseFilter.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );
}, [expenseFilter]);

const totalBalance = totalIncome - totalExpense;
    
  // const categoriesExpense = expenseFilter?.reduce(
  //   (sum, item) => {
  //     sum[item.category] = (sum[item.category] || 0) + Number(item.amount);
  //     return sum;
  //   },
  //   {} as Record<string, number>,
  // );

//   let expenseChartData=Object.entries(categoriesExpense ?? {} ).map(([category,amount])=>({
//       Name:category,
//       value:amount
//   }),
// );
 useEffect(()=>{
    errorToast(error);
 },[error])
 
  if (loading) {
    return <div className="flex items-center justify-center h-screen w-screen"><Loader /></div>
  }
  if (error) {
    return null;
  }
  return (
    <>
      <div className="top_section ">
        <SummaryCard
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
      </div>
      {/* <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] items-start gap-6 my-10">
        <div className="expense_chart">
            <ExpenseChart expenseChartData={expenseChartData} />  
        </div>
      </div> */}
      <div className="recent_trans mt-7">
          <RecentTransaction data={data ?? [] } filtertype={filtertype} setFiltertype={setFiltertype} />
        </div>
    </>
  );
};

export default Dashboard;
