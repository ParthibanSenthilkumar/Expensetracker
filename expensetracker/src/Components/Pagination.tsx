import React from "react";

interface paginationProp {
  page: number[];
  currentPage:number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handlePrvious: () => void;
  handleNext: () => void;
}
const Pagination = ({
  page,
  currentPage,
  setCurrentPage,
  handlePrvious,
  handleNext,
}: paginationProp) => {
  return (
    <>
      <div className="pagination flex items-center justify-center mt-6">
        <button className="bg-gray-200 text-xs px-3 py-2 rounded-md shadow text-gray-950 font-bold"  onClick={handlePrvious}> {"<"} </button>
        {page.map((item) => {
          return (
            <button className={` text-sm font-bold px-3 py-2 rounded-md mx-2  flex items-center justify-center ${
            currentPage === item ? "bg-indigo-400 text-white" :"bg-gray-50 text-gray-950"
            } `} key={item} onClick={() => setCurrentPage(item)}>
              {item}
            </button>
          );
        })}
        <button className="bg-gray-200 text-xs px-3 py-2 rounded-md shadow text-gray-950 font-bold" onClick={handleNext}>{">"}</button>
      </div>
    </>
  );
};

export default Pagination;
