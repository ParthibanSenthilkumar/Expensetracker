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
  // console.log(incomeFilter, "incomeFilter");

  const expenseFilter = data?.filter((item) => item.transType === "Expense");
  // console.log(expenseFilter, "expenseFilter");

  const totalIncome =
    incomeFilter?.reduce((sum, item) => sum + Number(item?.amount), 0) ?? 0;
  // console.log(totalIncome, "totalExpense");

  const totalExpense =
    expenseFilter?.reduce((sum, item) => sum + Number(item?.amount), 0) ?? 0;
  // console.log(totalExpense, "totalExpense");

  const totalBalance = (totalIncome || 0) - (totalExpense || 0);
  // console.log(totalBalance, "totalBalance");

  const categoriesExpense = expenseFilter?.reduce(
    (sum, item) => {
      sum[item.category] = (sum[item.category] || 0) + Number(item.amount);
      return sum;
    },
    {} as Record<string, number>,
  );
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
        <h2 className="text-2xl font-bold text-indigo-500 font-heading mb-5">
            Transaction History
        </h2>
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

      <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-lg w-fit mt-8 mb-3">
        {["All", "Income", "Expense"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterTYpe(type)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              filterType === type
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <TransactionTable filteredData={filteredData} />
    </>
  );
};

export default Reports;
