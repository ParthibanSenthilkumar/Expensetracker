import { useForm } from "react-hook-form";
import type { budget } from "../Types/Budgettype";
import {
  addBudget,
  getTransactions,
  getBudget,
  deleteBudget,
} from "../Services/Api";
import { errorToast, successToast } from "../Components/Toaster";
import useFetch from "../Hooks/useFetch";
import { useCallback, useState, useEffect } from "react";
import Loader from "../Components/Loader";
import type { AddTransaction } from "../Types/Addtransactiontype";
import { BsCurrencyRupee } from "react-icons/bs";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import BudgetModal from "../Components/BudgetModal";

const Budget = () => {
  let categoryList = [
    "Food",
    "Travel",
    "ShoppingBills",
    "Entertainment",
    "Health",
    "Education",
    "Other",
  ];
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<budget>();

  let getBudgetData = useCallback(() => {
    return getBudget();
  }, []);
  let getaddtransactions = useCallback(() => {
    return getTransactions();
  }, []);
  const {
    data: budgetData,
    loading: budgetLoading,
    error: budgetError,
    refetch: refetchBudget,
  } = useFetch<budget[]>(getBudgetData);
  const {
    data: transData,
    loading: transLoading,
    error: transError,
  } = useFetch<AddTransaction[]>(getaddtransactions);
  let [modalshow, setmodalShow] = useState(false);
  let [selectedItem, setSelectedItem] = useState<budget | null>(null);
  let formSubmit = async (data: budget) => {
    let resData = await addBudget(data);
    console.log(resData);
    reset();
    refetchBudget();
    successToast("Budget Created Successfully");
  };
  const handleDelete = async (id: string) => {
    await deleteBudget(id);
    refetchBudget();
    successToast("Budget Deleted Successfully");
  };

  useEffect(() => {
    if (budgetError) {
      errorToast(budgetError);
    }
  }, [budgetError]);
  useEffect(() => {
    if (transError) {
      errorToast(transError);
    }
  }, [transError]);
  if (budgetLoading || transLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader />
      </div>
    );
  }

  if (budgetError) {
    return null;
  }
  if (transError) {
    return null;
  }
  return (
    <>
      <div className="budget">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-indigo-500">
              Budget Management
            </h1>
          </div>
          <div className="bg-white shadow-custom1 p-6 lg:p-8 rounded-2xl">
            <div className="mb-6">
              <h2 className="font-heading text-xl font-semibold text-gray-800">
                Add New Budget
              </h2>
              <p className="text-sm font-secondary text-gray-500 mt-1">
                Set a spending limit for your category
              </p>
            </div>

            <form
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="form-item">
                <label
                  className="block text-sm text-gray-700 font-secondary font-medium mb-2"
                  htmlFor="category"
                >
                  Category
                </label>

                <select
                  id="category"
                  className="w-full h-12 border font-secondary border-gray-300 px-4 bg-gray-50 text-sm text-gray-600 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  {...register("category", {
                    required: "Select the Category",
                  })}
                >
                  <option value="">Select Category</option>

                  {categoryList.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {errors.category && (
                  <p className="text-red-500 font-secondary text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="form-item">
                <label
                  htmlFor="amount"
                  className="block text-sm text-gray-700 font-secondary font-medium mb-2"
                >
                  Budget Amount
                </label>

                <input
                  className="w-full h-12 border font-secondary border-gray-300 px-4 bg-gray-50 text-sm text-gray-600 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  type="number"
                  id="amount"
                  placeholder="Enter amount"
                  {...register("amount", {
                    required: "Enter the amount",
                    valueAsNumber: true,
                  })}
                />
                {errors.amount && (
                  <p className="text-red-500 font-secondary text-xs mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>
              <div className="form-item">
                <label
                  htmlFor="month"
                  className="block text-sm text-gray-700 font-secondary font-medium mb-2"
                >
                  Month
                </label>
                <input
                  className="w-full h-12 border font-secondary border-gray-300 px-4 bg-gray-50 text-sm text-gray-600 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  type="month"
                  id="month"
                  {...register("month", {
                    required: "Select the Month",
                  })}
                />
                {errors.month && (
                  <p className="text-red-500 font-secondary text-xs mt-1">
                    {errors.month.message}
                  </p>
                )}
              </div>
              <div className="md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 transition text-white py-3 px-7 text-sm font-medium rounded-lg"
                >
                  + Add Budget
                </button>
              </div>
            </form>
          </div>
          <div>
            <div className="mb-5">
              <h2 className="fond-heading text-xl font-semibold text-indigo-500">
                Your Budgets
              </h2>
              <p className="text-sm text-gray-500 font-secondary mt-1">
                Track your spending against each budget
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5">
              {budgetData && budgetData.length > 0 ? (
                budgetData.map((item) => {
                  const categorytransaction = transData?.filter((trans) => {
                    return (
                      trans.category === item.category &&
                      trans.date.slice(0, 7) === item.month &&
                      trans.transType === "Expense"
                    );
                  });

                  const spent =
                    categorytransaction?.reduce((sum, trans) => {
                      return sum + Number(trans.amount);
                    }, 0) ?? 0;

                  const isOverBudget = spent > item.amount;
                  const remainingAmount = Math.max(item.amount - spent, 0);

                  const percentageProgress =
                    item.amount > 0
                      ? Math.min((spent / item.amount) * 100, 100)
                      : 0;

                  return (
                    <div
                      key={item.id}
                      className="bg-white shadow-custom1 p-6 rounded-2xl hover:shadow-lg transition space-y-2.5"
                    >
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-gray-800">
                            {item.category}
                          </h3>

                          <p className="font-secondary text-xs text-gray-400 mt-1">
                            {item.month}
                          </p>
                        </div>

                        <div className="w-10 h-10 font-heading rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {item.category.charAt(0)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between ">
                        <div className="mb-5">
                          <p className="font-secondary text-xs text-gray-500">
                            Budget
                          </p>
                          <p className="font-heading text-2xl font-bold text-indigo-500 mt-1 inline-flex  items-center">
                            <BsCurrencyRupee className="font-heading" />
                            {item.amount}
                          </p>
                        </div>

                        <div className="mb-5">
                          <p className="font-secondary text-sm text-gray-500 text-center">
                            Status
                          </p>
                          <span
                            className={
                              isOverBudget
                                ? "text-red-500 font-semibold block text-[10px] mt-1 bg-red-50 text-center py-1 px-2 rounded-full"
                                : "text-green-500 font-semibold block text-[10px] mt-1 bg-green-50 text-center py-1 px-2 rounded-full"
                            }
                          >
                            {isOverBudget ? "Over Budget" : "Within Budget"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-red-50 rounded-xl p-3">
                          <p className="font-secondary text-xs text-gray-500">
                            Spent
                          </p>

                          <p className="font-secondary text-sm font-semibold text-red-500 mt-1 inline-flex  items-center">
                            <BsCurrencyRupee />
                            {spent}
                          </p>
                        </div>

                        <div className="bg-green-50 rounded-xl p-3">
                          <p className="font-secondary text-xs text-gray-500">
                            Remaining
                          </p>

                          <p className="font-secondary text-sm font-semibold text-green-600 mt-1 inline-flex items-center">
                            <BsCurrencyRupee />
                            {remainingAmount}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <p className="font-secondary text-xs text-gray-500">
                          Spending Progress
                        </p>

                        <p className="font-secondary text-xs font-semibold text-gray-700">
                          {percentageProgress.toFixed(0)}%
                        </p>
                      </div>

                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full transition-all"
                          style={{
                            width: `${percentageProgress}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
                        <button
                          className="flex items-center gap-1 text-sm text-indigo-500"
                          onClick={() => {
                            (setmodalShow(true), setSelectedItem(item));
                          }}
                        >
                          <FiEdit3 />
                          Edit
                        </button>

                        <button
                          className="flex items-center gap-1 text-sm text-red-500"
                          onClick={() => handleDelete(item.id!)}
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16">
                  <p className="font-secondary text-sm text-gray-400 mt-1">
                    Create your first budget to start tracking your expenses.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BudgetModal
        show={modalshow}
        categoryList={categoryList}
        budgetdata={selectedItem}
        refetch={refetchBudget}
        onClose={() => {
          (setmodalShow(false), setSelectedItem(null));
        }}
      />
    </>
  );
};

export default Budget;
