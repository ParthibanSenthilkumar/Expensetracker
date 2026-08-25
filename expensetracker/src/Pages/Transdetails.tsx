import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { Editdata, getTransDetails } from "../Services/Api";
import Loader from "../Components/Loader";
import { errorToast, successToast } from "../Components/Toaster";
import type { AddTransaction } from "../Types/Addtransactiontype";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const categoryList = {
  Income: ["Salary", "Business", "Freelancing", "Investment", "Bonus"],
  Expense: ["Food", "Fuel", "Shopping", "Medical", "Travel", "Entertainment"],
};

const Transdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState<"Income" | "Expense" | "">(
    "",
  );
  const fetchTransaction = useCallback(() => {
    return getTransDetails(id!);
  }, [id]);
  const { data, loading, error } = useFetch<AddTransaction>(fetchTransaction);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AddTransaction>();

  useEffect(() => {
    if (data) {
      reset(data);
      setSelectedType(data.transType);
    }
  }, [data, reset]);

  useEffect(() => {
    if (data && selectedType === data.transType) {
      setValue("category", data.category);
    }
  }, [selectedType, data, setValue]);

  const changeType = (type: "Income" | "Expense") => {
    setSelectedType(type);
    setValue("transType", type);
    setValue("category", "");
  };

  const categories = selectedType ? categoryList[selectedType] : [];

  const onSubmit = async (formData: AddTransaction) => {
    await Editdata(formData, id!);
    successToast("Edited data Successfully");
    navigate("/dashboard/transactions");
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen w-screen"><Loader /></div>;
  }
  if (error) {
    errorToast(error);
    return null;
  }
  return (
    <div className="shadow-custom1 max-w-lg mx-auto bg-white rounded-xl p-8">
      <h2 className="text-2xl font-bold text-center font-heading text-indigo-500  mb-8">Edit Transaction</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <p className="font-semibold text-gray-700 mb-3">Transaction Type</p>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => changeType("Income")}
              className={`flex-1 py-2 rounded-lg font-semibold transition duration-300 ${
                selectedType === "Income"
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
                selectedType === "Expense"
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              Expense
            </button>
          </div>
        </div>

        <div className="form-item mb-2.5">
          <label
            className="block mb-2 font-medium text-gray-700 font-secondary"
            htmlFor="amount"
          >
            Amount
          </label>

          <input
            type="text"
            id="amount"
            className="w-full border text-sm font-medium font-secondary text-gray-500 border-gray-300"
            placeholder="Enter the amount"
            {...register("amount", {
              required: "Enter the Amount",
            })}
          />

          {errors.amount && (
            <p className="mx-2 text-sm font-medium text-red-500">
              {errors.amount.message}
            </p>
          )}
        </div>
        <div className="form-item mb-2.5">
          <label
            htmlFor="category"
            className="block mb-2 font-medium text-gray-700"
          >
            Category
          </label>

          <select
            id="category"
            className="w-full  text-sm  font-secondary  px-3 py-2 text-gray-500 border rounded-md border-gray-300"
            {...register("category", {
              required: "Select the category",
            })}
          >
            <option value="">Select Category</option>

            {categories.map((item) => (
              <option
                key={item}
                value={item}
                className="text-base text-gray-950"
              >
                {item}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="mx-2 text-sm font-medium text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="form-item mb-2.5">
          <label
            htmlFor="description"
            className="block mb-2 font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 text-sm  font-secondary text-gray-500 rounded-md px-4 py-2 resize-none outline-none"
            placeholder="Enter the message"
            {...register("description", {
              required: "Enter your message",
            })}
          />

          {errors.description && (
            <p className="mx-2 text-sm font-medium text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="form-item mb-2.5">
          <label
            htmlFor="date"
            className="block mb-2 font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            className="text-sm  font-secondary text-gray-500 border border-gray-300 rounded-md "
            {...register("date", {
              required: "Select the date",
            })}
          />
          {errors.date && (
            <p className="mx-2 text-sm font-medium text-red-500">
              {errors.date.message}
            </p>
          )}
        </div>
        <button type="submit" className="sub_btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default Transdetails;
