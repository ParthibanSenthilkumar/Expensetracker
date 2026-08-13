import { useState } from "react";
import Loader from "../Components/Loader";
import { errorToast } from "../Components/Toaster";
import useFetch from "../Hooks/useFetch";
import { getTransactions } from "../Services/Api";
import type { AddTransaction } from "../Types/Addtransactiontype";
import SummaryCard from "../Components/Reports-compo/SummaryCard";
import CategorySummary from "../Components/Reports-compo/CategorySummary";
import ExpenseChart from "../Components/Reports-compo/ExpenseChart";
import TransactionTable from "../Components/Reports-compo/TransactionTable";

const Reports = () => {
  const { data, loading, error } = useFetch<AddTransaction[]>(getTransactions);
  const [filterType, setFilterTYpe] = useState("All");

  const incomeFilter = data?.filter((item) => item.transType === "Income");
  console.log(incomeFilter, "incomeFilter");

  const expenseFilter = data?.filter((item) => item.transType === "Expense");
  console.log(expenseFilter, "expenseFilter");

  const totalIncome =
    incomeFilter?.reduce((sum, item) => sum + Number(item?.amount), 0) ?? 0;
  console.log(totalIncome, "totalExpense");

  const totalExpense =
    expenseFilter?.reduce((sum, item) => sum + Number(item?.amount), 0) ?? 0;
  console.log(totalExpense, "totalExpense");

  const totalBalance = (totalIncome || 0) - (totalExpense || 0);
  console.log(totalBalance, "totalBalance");

  const categoriesExpense = expenseFilter?.reduce(
    (sum, item) => {
      sum[item.category] = (sum[item.category] || 0) + Number(item.amount);
      return sum;
    },
    {} as Record<string, number>,
  );
  console.log(categoriesExpense);

  const expenseChartData = Object.entries(categoriesExpense ?? {}).map(
    ([category, amount]) => ({
      Name: category,
      value: amount,
    }),
  );

  const categoriesIncome = incomeFilter?.reduce(
    (sum, item) => {
      sum[item.category] = (sum[item.category] || 0) + Number(item.amount);
      return sum;
    },
    {} as Record<string, number>,
  );
  console.log(categoriesIncome);

  let filteredData = data ?? [];

  if (filterType === "Income") {
    filteredData = incomeFilter ?? [];
  }

  if (filterType === "Expense") {
    filteredData = expenseFilter ?? [];
  }

  if (loading) {
    return <Loader />;
  }
  if (error) {
    errorToast(error);
    return null;
  }

  return (
    <>
      <SummaryCard
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />
      <CategorySummary
        categoriesIncome={categoriesIncome}
        categoriesExpense={categoriesExpense}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />
      <ExpenseChart expenseChartData={expenseChartData} />
      <button onClick={() => setFilterTYpe("All")}>All</button>
      <button onClick={() => setFilterTYpe("Income")}>income</button>
      <button onClick={() => setFilterTYpe("Expense")}>Expense </button>

      <TransactionTable filteredData={filteredData} />
    </>
  );
};

export default Reports;
