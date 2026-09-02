import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { errorToast } from "../Components/Toaster";
import useFetch from "../Hooks/useFetch";
import { deletedata, getTransactions } from "../Services/Api";
import type { AddTransaction } from "../Types/Addtransactiontype";
import { useMemo, useState, useCallback, useEffect } from "react";
import Pagination from "../Components/Pagination";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

const Transactions = () => {
  const { data, loading, error, refetch } =
    useFetch<AddTransaction[]>(getTransactions);
  const [userSearch, setuserSearch] = useState<string>("");
  const [transType, setTransType] = useState("All");
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      errorToast(error);
    }
  }, [error]);

  const handleEdit = useCallback(
    (id: string) => {
      navigate(`/dashboard/trans-details/${id}`);
    },
    [navigate],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deletedata(id);
        refetch();
      } catch {
        errorToast("Failed to delete transaction");
      }
    },
    [refetch],
  );

  const filterData = useMemo(() => {
    return data?.filter((item) => {
      const search = item.category
        .toLowerCase()
        .includes(userSearch.toLowerCase());
      const type = transType === "All" || item.transType === transType;
      return search && type;
    });
  }, [data, userSearch, transType]);

  let transPageCount = 5;
  const [currentPage, setCurrentPage] = useState(1);
  let lastIndex = currentPage * transPageCount;
  let fistIndex = lastIndex - transPageCount;
  let total = Math.ceil((filterData?.length ?? 0) / transPageCount);
  let currentList = filterData?.slice(fistIndex, lastIndex);
  const page = useMemo(() => {
    const pages: number[] = [];

    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }

    return pages;
  }, [total]);

  const handlePrvious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleNext = useCallback(() => {
    if (currentPage < total) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, total]);

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
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-indigo-500 font-heading">
          Transactions
        </h2>
        {/* <p className="text-sm text-gray-400 mt-1 font-secondary">
              Manage and track all your income and expenses in one place.
              </p> */}
      </div>
      <div className="flex flex-col flex-wrap md:flex-row md:items-center justify-between gap-3 mb-4">
        <div className="relative w-full min-w-[300px] lg:max-w-[300px]">
          <FiSearch
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            className="w-full border border-gray-200 rounded-lg px-8 py-2 text-sm outline-none focus:border-indigo-500"
            value={userSearch}
            placeholder="Search by Category"
            onChange={(e) => {
              setuserSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="bg-gray-100 p-1.5 rounded-md w-fit">
          {["All", "Income", "Expense"].map((type) => (
            <button
              key={type}
              type="button"
              className={`lg:text-sm px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                transType === type
                  ? "bg-indigo-500 text-white"
                  : "text-gray-400"
              }`}
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
      <div className="w-full overflow-x-auto rounded-lg shadow-custom1 bg-white ">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 text-sm md:text-base text-gray-500 text-left">
              <th className="px-2.5 md:px-4 py-4 font-medium font-heading">
                Sno
              </th>

              <th className="px-2.5 md:px-4 py-4 font-medium font-heading">
                Amount
              </th>

              <th className="px-2.5 md:px-4 py-4 font-medium font-heading">
                Category
              </th>

              <th className="px-2.5 md:px-4 py-4 font-medium font-heading">
                TransType
              </th>

              <th className="px-2.5 md:px-4 py-4 font-medium font-heading">
                Date
              </th>

              <th className="px-2.5 md:px-4 py-4 font-medium font-heading">
                Description
              </th>

              <th className="px-2.5 md:px-4 py-4 font-medium font-heading">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {currentList && currentList.length > 0 ? (
              currentList.map((datalist, index) => (
                <tr
                  key={datalist.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-2.5 md:px-4 py-4 text-sm text-gray-500 font-secondary whitespace-nowrap">
                    {index + 1}
                  </td>

                  <td
                    className={`px-2.5 py-4 md:px-4 text-sm font-medium font-secondary whitespace-nowrap ${
                      datalist.transType === "Income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {datalist.transType === "Income"
                      ? `+${datalist.amount}`
                      : `-${datalist.amount}`}
                  </td>

                  <td className="px-2.5 py-4 md:px-4 text-sm text-indigo-500 font-medium font-secondary whitespace-nowrap">
                    {datalist.category}
                  </td>

                  <td className="px-2.5 py-4 md:px-4 text-sm text-gray-500 font-secondary whitespace-nowrap">
                    <span
                      className={`py-1 px-2 md:px-3 rounded-full text-xs ${
                        datalist.transType === "Income"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-rose-600"
                      }`}
                    >
                      {datalist.transType}
                    </span>
                  </td>

                  <td className="px-2.5 py-4 md:px-4 text-sm text-gray-500 font-secondary whitespace-nowrap">
                    {datalist.date}
                  </td>

                  <td className="px-2.5 py-4 md:px-4 text-sm text-gray-500 font-secondary whitespace-nowrap">
                    {datalist.description.length > 10
                      ? `${datalist.description.slice(0, 10)}...`
                      : datalist.description}
                  </td>

                  <td className="px-2.5 py-4 md:px-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleEdit(datalist.id!)}
                      className="p-2 bg-indigo-50 text-indigo-500 hover:bg-indigo-100 rounded-md transition-colors mr-1.5"
                    >
                      <FiEdit2 size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(datalist.id!)}
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
      </div>
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
