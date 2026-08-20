import { useState } from "react";
import Loader from "../Components/Loader";
import SummaryCard from "../Components/Reports-compo/SummaryCard";
import { errorToast } from "../Components/Toaster";
import useFetch from "../Hooks/useFetch";
import { getTransactions } from "../Services/Api";
import type { AddTransaction } from "../Types/Addtransactiontype";
import ExpenseChart from "../Components/Reports-compo/ExpenseChart";
import RecentTransaction from "../Components/RecentTransaction";

const Dashboard = () => {
  let { data, loading, error } = useFetch<AddTransaction[]>(getTransactions);
  let [filtertype, setFiltertype] = useState<string>("All");

 let expenseFilter = data?.filter((item) => item.transType === "Expense") ?? [];

  let totalIncome =
    data
      ?.filter((inc) => inc.transType === "Income")
      .reduce((sum, value) => {
        return sum + Number(value.amount);
      }, 0) ?? 0;

  let totalExpense =
    data
      ?.filter((inc) => inc.transType === "Expense")
      .reduce((sum, value) => {
        return sum + Number(value.amount);
      }, 0) ?? 0;

  let totalBalance = (totalIncome || 0) - (totalExpense || 0);

  let filteredData = data ?? [];
  if (filtertype === "Income") {
    filteredData = data?.filter((item) => item.transType === "Income") ?? [];
  }
  if (filtertype === "Expense") {
     filteredData= expenseFilter
  }
  const categoriesExpense = expenseFilter?.reduce(
    (sum, item) => {
      sum[item.category] = (sum[item.category] || 0) + Number(item.amount);
      return sum;
    },
    {} as Record<string, number>,
  );

  let expenseChartData=Object.entries(categoriesExpense ?? {} ).map(([category,amount])=>({
      Name:category,
      value:amount
  }),
);


  if (loading) {
    return <Loader />;
  }
  if (error) {
    errorToast(error);
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

      <RecentTransaction filtertype={filtertype} setFiltertype={setFiltertype} />
      
      <ExpenseChart expenseChartData={expenseChartData} />
    </>
  );
};

export default Dashboard;
