import React, { useState, useEffect } from "react";
import type { budget } from "../Types/Budgettype";
import { FiX } from "react-icons/fi";
import { upDateBudget } from "../Services/Api";
import { successToast } from "./Toaster";

interface modalProp {
  show: boolean;
  categoryList: string[];
  budgetdata: budget | null;
  refetch: () => void;
  onClose: () => void;
}
const BudgetModal = ({
  show,
  categoryList,
  budgetdata,
  onClose,
  refetch,
}: modalProp) => {
  let [editData, setEditData] = useState<budget>(budgetdata!);
  useEffect(() => {
    if (budgetdata) {
      setEditData(budgetdata);
    }
  }, [budgetdata]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let id = editData?.id;
    if (!id) return;
    await upDateBudget(id, editData);
    successToast("Edited Successfully");
    onClose();
    refetch();
  };

  if (!show || !budgetdata || !editData) return;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl font-semibold text-gray-800">
                Edit Budget
              </h2>

              <p className="text-sm text-gray-500 font-secondary mt-1">
                Update your budget details
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX size={22} />
            </button>
          </div>
          <form className="space-y-5" onSubmit={handleEdit}>
            <div>
              <label className="block text-sm text-gray-700 font-secondary font-medium mb-2">
                Category
              </label>
              <select
                value={editData?.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
                className="w-full h-12 border border-gray-300 px-4 bg-gray-50 text-sm text-gray-600 rounded-lg outline-none focus:border-indigo-500"
              >
                <option value="">Select Category</option>

                {categoryList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 font-secondary font-medium mb-2">
                Budget Amount
              </label>

              <input
                type="number"
                value={editData?.amount}
                onChange={(e) =>
                  setEditData({ ...editData, amount: Number(e.target.value) })
                }
                className="w-full h-12 border border-gray-300 px-4 bg-gray-50 text-sm text-gray-600 rounded-lg outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 font-secondary font-medium mb-2">
                Month
              </label>

              <input
                type="month"
                value={editData?.month}
                onChange={(e) =>
                  setEditData({ ...editData, month: e.target.value })
                }
                className="w-full h-12 border border-gray-300 px-4 bg-gray-50 text-sm text-gray-600 rounded-lg outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-sm text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
              >
                Update Budget
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BudgetModal;
