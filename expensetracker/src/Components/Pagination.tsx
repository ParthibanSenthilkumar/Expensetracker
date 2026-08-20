import React from "react";

interface paginationProp {
  page: number[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handlePrvious: () => void;
  handleNext: () => void;
}
const Pagination = ({
  page,
  setCurrentPage,
  handlePrvious,
  handleNext,
}: paginationProp) => {
  return (
    <>
      <div className="pagination flex items-center justify-center mx-5">
        <button onClick={handlePrvious}> {"<"} </button>
        {page.map((item) => {
          return (
            <button key={item} onClick={() => setCurrentPage(item)}>
              {item}
            </button>
          );
        })}
        <button onClick={handleNext}>{">"}</button>
      </div>
    </>
  );
};

export default Pagination;
