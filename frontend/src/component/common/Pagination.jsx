import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination flex justify-center items-center my-4 space-x-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`py-2 px-4 rounded-lg transition duration-300 
                        ${
                          number === currentPage
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
