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
import Pagination from "../Components/Pagination";

const Reports = () => {
  const { data, loading, error } = useFetch<AddTransaction[]>(getTransactions);
  const [filterType, setFilterTYpe] = useState("All");
  const [search, setSearch] = useState("");
  const incomeFilter = data?.filter((item) => item.transType === "Income");
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
  filteredData = filteredData.filter((item) =>
    item.description.toLowerCase().includes(search.toLowerCase()),
  );
  let pageCount = 5;
  let [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(filteredData.length / pageCount);
  const lastIndex = currentPage * pageCount;
  const firstIndex = lastIndex - pageCount;
  const currentList = filteredData.slice(firstIndex, lastIndex);
  let page = [];
  for (let i = 1; i <= totalPage; i++) {
    page.push(i);
  }
  let handlePrvious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  let handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr]">
        <ExpenseChart expenseChartData={expenseChartData} />

        <div className="shadow-custom1 rounded-md py-11 px-3">
          <h3 className="mb-9 text-xl text-indigo-500 font-semibold capitalize">
            balance details
          </h3>
          <SummaryCard
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />
          <p className="text-sm text-gray-400 mt-8 font-secondary">
            Get a quick overview of your income, expenses, and current balance*
          </p>
        </div>
      </div>
      <CategorySummary
        categoriesIncome={categoriesIncome}
        categoriesExpense={categoriesExpense}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />
      <div className="flex items-center justify-between gap-4 mt-8 mb-3">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500"
        />

        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-lg">
          {["All", "Income", "Expense"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilterTYpe(type);
                setCurrentPage(1);
              }}
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
      </div>
      <TransactionTable currentList={currentList} />
      <Pagination
        page={page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handlePrvious={handlePrvious}
        handleNext={handleNext}
      />
    </>
  );
};

export default Reports;
