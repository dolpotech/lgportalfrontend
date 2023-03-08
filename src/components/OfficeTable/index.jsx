import React, { useEffect, useState, useMemo } from "react";
import HeaderTable from "../../components/DataTable/HeaderTable";
import PaginationComponent from "../../components/DataTable/Pagination";
import SearchTable from "../../components/DataTable/Search";
import {
  getDistrict,
  getLgByDistrict,
  getSpecificLgData,
  getDesiginationStaff,
} from "../../api";
import { Link } from "react-router-dom";
import EditOffice from "../EditInfoCollection/EditOffice";

function OfficeTable({ comments }) {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [refresh, setRrefresh] = useState(false);
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 10;

  const headers = [
    { name: "सं", field: "sn", sortable: false },
    { name: "कार्यालयको नाम", field: "name", sortable: false },
    { name: "कार्यालयको इमेल", field: "email", sortable: false },
    { name: "कार्यालयको फोन नं.", field: "phno", sortable: false },
    { name: "कार्यालयको ठेगाना", field: "address", sortable: false },
    { name: "कार्य", field: "action", sortable: false },
  ];

  console.log(comments);

  useEffect(() => {
    const getData = async (e) => {};
  }, []);

  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) => comment.name.toLowerCase().includes(search.toLowerCase())
        // ||
        // comment.img.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [comments, currentPage, search, sorting]);

  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-between items-center mb-4 mt-4 px-4">
        <SearchTable
          onSearch={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />
        <PaginationComponent
          total={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      {commentsData == "" ? (
        ""
      ) : (
        <table className="w-full table-responsive text-sm text-left text-gray-500 dark:text-gray-400">
          <HeaderTable
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {commentsData.map((value, i) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{1 + i++}</td>
                <td className="px-6 py-4">{value.name}</td>
                <td className="px-6 py-4">{value.email}</td>
                <td className="px-6 py-4">{value.phone_no}</td>
                <td className="px-6 py-4">{value.address}</td>
                <td>
                  {value && (
                    <EditOffice
                      title={value.name}
                      email={value.email}
                      phone_no={value.phone_no}
                      address={value.address}
                      status={value.status}
                      mo_id={value.id}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OfficeTable;
