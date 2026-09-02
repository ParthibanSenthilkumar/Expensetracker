import { useState, useMemo, useEffect, useCallback } from "react";
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
  const incomeFilter = useMemo(() => {
    return data?.filter((item) => item.transType === "Income");
  }, [data]);

  const expenseFilter = useMemo(() => {
    return data?.filter((item) => item.transType === "Expense");
  }, [data]);

  const totalIncome = useMemo(() => {
    return (
      incomeFilter?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0
    );
  }, [incomeFilter]);

  const totalExpense = useMemo(() => {
    return (
      expenseFilter?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0
    );
  }, [expenseFilter]);
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
  const page = useMemo(() => {
    const pages: number[] = [];

    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [totalPage]);

  const handlePrvious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPage]);
    useEffect(() => {
    if (error) {
      errorToast(error);
    }
  }, [error]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader />
      </div>
    );
  }
  if (error) {
    return null;
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-indigo-500 font-heading mb-5">
        Transaction History
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-7 lg:gap-0">
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-8 mb-3">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border h-12 border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500"
        />

        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-lg w-fit">
          {["All", "Income", "Expense"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilterTYpe(type);
                setCurrentPage(1);
              }}
              className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-all ${
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
