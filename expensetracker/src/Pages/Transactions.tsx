import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { errorToast } from "../Components/Toaster";
import useFetch from "../Hooks/useFetch";
import { deletedata, getTransactions } from "../Services/Api";
import type { AddTransaction } from "../Types/Addtransactiontype";
import { useState } from "react";
import Pagination from "../Components/Pagination";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

const Transactions = () => {
  let { data, loading, error } = useFetch<AddTransaction[]>(getTransactions);
  let [userSearch, setuserSearch] = useState<string>("");
  let [transType, setTransType] = useState("All");

  let navigate = useNavigate();
  const handleEdit = (id: string) => {
    navigate(`/dashboard/trans-details/${id}`);
  };

  const handledelete = async (id: string) => {
    await deletedata(id);
  };

  let filterData = data?.filter((item) => {
    const Search = item.category
      .toLowerCase()
      .includes(userSearch.toLowerCase());
    const filterType = transType === "All" || item.transType === transType;
    return Search && filterType;
  });

  let transPageCount = 5;
  const [currentPage, setCurrentPage] = useState(1);
  let lastIndex = currentPage * transPageCount;
  let fistIndex = lastIndex - transPageCount;
  let total = Math.ceil((filterData?.length ?? 0) / transPageCount);
  let currentList = filterData?.slice(fistIndex, lastIndex);
  let page = [];
  for (let i = 1; i <= total; i++) {
    page.push(i);
  }

  const handlePrvious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < total) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen w-screen"><Loader /></div>;
  }
  if (error) {
    errorToast(error);
    return null;
  }
  return (
    <>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-indigo-500 font-heading">
          Transactions
        </h2>
        {/* <p className="text-sm text-gray-400 mt-1 font-secondary">
            Manage and track all your income and expenses in one place.
            </p> */}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="relative max-w-[750px] w-full">
          <FiSearch
            className="absolute left-1 top-[11px] text-gray-400"
            size={18}
          />
          <input
            type="text"
            className="border border-gray-200 rounded-lg px-7 py-2 text-sm outline-none focus:border-indigo-500"
            value={userSearch}
            placeholder="Search by Category"
            onChange={(e) => {
              setuserSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="fitler bg-gray-100  p-[6px] rounded-md">
          {["All", "Income", "Expense"].map((type) => (
            <button
              key={type}
              type="button"
              className={`text-sm px-3 py-2 rounded-md font-medium transition-all duration-200 ${transType == type ? "bg-indigo-500 text-white " : "text-gray-400 "} `}
              value={type}
              onClick={() => {
                setTransType(type);
                setCurrentPage(1);
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full bg-white  rounded-lg shadow-custom1">
        <thead>
          <tr className="border-b border-solid border-gray-100 text-base text-gray-500 text-left">
            <th className="px-4 py-3 font-medium font-heading">Sno</th>
            <th className="px-4 py-3 font-medium font-heading">Amount</th>
            <th className="px-4 py-3 font-medium font-heading">Category</th>
            <th className="px-4 py-3 font-medium font-heading">TransType</th>
            <th className="px-4 py-3 font-medium font-heading">Date</th>
            <th className="px-4 py-3 font-medium font-heading">Description</th>
            <th className="px-4 py-3 font-medium font-heading">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentList && currentList.length > 0 ? (
            currentList.map((datalist, index) => (
              <tr
                key={datalist.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4 text-sm text-gray-500 font-secondary">
                  {index + 1}
                </td>
                <td
                  className={`px-4 py-4 text-sm font-medium font-secondary ${
                    datalist.transType === "Income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {datalist.transType === "Income"
                    ? `+${datalist.amount}`
                    : `-${datalist.amount}`}
                </td>
                <td className="px-4 py-4 text-sm text-indigo-500 font-medium font-secondary">
                  {datalist.category}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500 font-secondary">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      datalist.transType === "Income"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-rose-600"
                    }`}
                  >
                    {datalist.transType}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 font-secondary">
                  {datalist.date}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 font-secondary">
                  {datalist.description.length > 10
                    ? `${datalist.description.slice(0, 10)}...`
                    : datalist.description}
                </td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(datalist.id!)}
                    className="p-2 bg-indigo-50 text-indigo-500 hover:bg-indigo-100 rounded-md transition-colors mr-1.5"
                  >
                    <FiEdit2 size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handledelete(datalist.id!)}
                    className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-md transition-colors"
                  >
                    <FiTrash2 size={17} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="py-12 text-center text-sm text-gray-400 font-secondary"
              >
                No Transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
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

export default Transactions;
