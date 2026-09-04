import React, { useState } from "react";
import type { AddTransaction } from "../Types/Addtransactiontype";
import { Addtransaction } from "../Services/Api";
import Loader from "../Components/Loader";
import { errorToast, successToast } from "../Components/Toaster";

const categoryList = {
  Income: ["Salary", "Business", "Freelancing", "Investment", "Bonus"],
  Expense: ["Food", "Fuel", "Shopping", "Medical", "Travel", "Entertainment"],
};
const Addtransactions = () => {
  const [transData, settransData] = useState<AddTransaction>({
    amount: "",
    category: "",
    description: "",
    date: "",
    transType: "Expense",
  });
  const [loading, setloading] = useState(false);
  const changeType = (type: "Income" | "Expense") => {
    settransData((prev) => ({
      ...prev,
      transType: type,
      category: "",
    }));
  };
  const categories = categoryList[transData.transType];
  const handleChance = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    settransData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      if (
        !transData.amount.trim() ||
        !transData.category.trim() ||
        !transData.description.trim() ||
        !transData.date.trim()
      ) {
        return errorToast("Fill All Feilds");
      }
      await Addtransaction(transData);
      settransData({
        amount: "",
        category: "",
        description: "",
        date: "",
        transType: "Expense",
      });
      successToast("Added Successfully");
    } catch (err) {
      if (err instanceof Error) {
        errorToast(err.message);
      }
    } finally {
      setloading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader />
      </div>
    );
  }
  return (
    <section className="mt-5">
      <div className="shadow-custom1 max-w-lg mx-auto bg-white rounded-xl p-5  md:p-8">
        <h2 className="text-2xl font-bold font-heading text-indigo-500 text-center mb-8">
          Add Transaction
        </h2>
        <div className="mb-6">
          <p className="font-semibold text-gray-700 mb-3">Transaction Type</p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => changeType("Income")}
              className={`flex-1 py-2 rounded-lg font-semibold transition duration-300 ${
                transData.transType === "Income"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => changeType("Expense")}
              className={`flex-1 py-2 rounded-lg font-semibold transition duration-300 ${
                transData.transType === "Expense"
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              Expense
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="Amount"
              className="block mb-2 text-sm font-medium font-secondary   text-gray-700"
            >
              Amount
            </label>

            <input
              type="text"
              name="amount"
              id="Amount"
              value={transData.amount}
              onChange={handleChance}
              placeholder="Enter Amount"
              className="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm  font-secondary text-gray-600 outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label
              htmlFor="Category"
              className="block mb-2 text-sm font-medium font-secondary text-gray-700"
            >
              Category
            </label>

            <select
              name="category"
              value={transData.category}
              id="Category"
              onChange={handleChance}
              className="w-full h-12 border border-gray-300 px-4 bg-gray-50 text-sm text-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">Select Category</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="Description"
              className="block mb-2 text-sm font-medium font-secondary text-gray-700"
            >
              Description
            </label>

            <textarea
              id="Description"
              name="description"
              value={transData.description}
              onChange={handleChance}
              rows={3}
              placeholder="Enter Description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-sm text-gray-600 resize-none outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label
              htmlFor="Date"
              className="block mb-2 text-sm font-medium font-secondary text-gray-700"
            >
              Date
            </label>

            <input
              type="date"
              name="date"
              id="Date"
              value={transData.date}
              onChange={handleChance}
              className="w-full h-12 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 font-secondary bg-gray-50  outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <button type="submit" className="sub_btn transition duration-300">
            Add Transaction
          </button>
        </form>
      </div>
    </section>
  );
};

export default Addtransactions;
