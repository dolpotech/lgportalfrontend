import React, { useEffect, useState, useMemo } from "react";
import UseInput from "../../utils/UseInput";

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 25,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [roundTotal, setRoundTotal] = useState(0);
  const { value: pageNumber, bind: bindPage, reset: resetPage } = UseInput(1);
  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
    if (isFloat(total / itemsPerPage)) {
      let numberToRound = parseInt(total / itemsPerPage);
      setRoundTotal(numberToRound + 1);
    } else {
      setRoundTotal(parseInt(total / itemsPerPage));
    }
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages
        .push
        // <li
        //   data-test="page-item"
        //   className={
        //     i === currentPage ? "active page-item border" : "page-item border"
        //   }
        //   key={i}
        //   onClick={() => onPageChange(i)}
        // >
        //   <a data-test="page-link" className="page-link page-link">
        //     {i}
        //     <span className="sr-only">Previous</span>
        //   </a>
        // </li>
        ();
    }

    return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  function isFloat(n) {
    return n === +n && n !== (n | 0);
  }

  return (
    <div className="dataTables_paginate mt-5 p-4">
      {total > itemsPerPage && (
        <div className="pagination flex items-center justify-between">
          <form
            className="flex"
            onSubmit={(event) => {
              event.preventDefault();
              if (event.target.value >= roundTotal + 1) {
                return alert("exceed"), false;
              }
              onPageChange(pageNumber);
            }}
          >
            <p className="m-2 font-semibold">Go to</p>
            <input
              type="number"
              min={1}
              max={roundTotal}
              {...bindPage}
              className="mr-2 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </form>
          <ul data-test="pagination" className="pagination flex">
            <li
              data-test="page-item"
              className={
                currentPage === 1
                  ? "text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-l disablePrevious"
                  : "text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-l"
              }
              onClick={() => onPageChange(parseInt(currentPage) - 1)}
              id={currentPage === 1 ? "disabledLogin" : ""}
            >
              <button data-test="page-link" className="page-link page-link">
                Previous<span className="sr-only">Previous</span>
              </button>
            </li>
            {/* {paginationItems} */}
            <p className="m-2 font-semibold">
              Page {currentPage + " of " + roundTotal}
            </p>
            <li
              data-test="page-item"
              className={
                currentPage === totalPages
                  ? "text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-r disablePrevious"
                  : "text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-r"
              }
              onClick={() => onPageChange(parseInt(currentPage) + 1)}
              disabled={currentPage === totalPages}
              id={currentPage === totalPages ? "disabledLogin" : ""}
            >
              <button
                data-test="page-link"
                disable={true}
                className={"page-link"}
              >
                Next
                <span className="sr-only">Next</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaginationComponent;
