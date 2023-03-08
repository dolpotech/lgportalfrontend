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

function UserTable({ comments }) {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [refresh, setRrefresh] = useState(false);
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 10;

  const headers = [
    { name: "सं", field: "sn", sortable: false },
    { name: "नाम", field: "name", sortable: false },
    { name: "इमेल", field: "email", sortable: false },
    { name: "फोन नं.", field: "phno", sortable: false },
    { name: "निकाय", field: "agency", sortable: false },
    {
      name: "भूमिका",
      field: "role",
      sortable: false,
    },
    { name: "स्थिति", field: "status", sortable: false },
    // { name: "कार्य", field: "action", sortable: false },
  ];

  console.log(comments);

  useEffect(() => {
    const getData = async (e) => {};
  }, []);

  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.full_name.toLowerCase().includes(search.toLowerCase())
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
                <td className="px-6 py-4">
                  {value.ministry_office
                    ? value.ministry_office.name
                    : value.ministry
                    ? value.ministry.name
                    : value.local_government.name}
                </td>
                <td className="px-6 py-4">
                  {value.roles.map((item) => item.name)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 ">
                    {value.status == 1 ? "सक्रिय" : "निष्क्रिय"}
                  </div>
                </td>
                {/* <td className="px-6 py-4">
                  <Link
                    to="/information-collection-section"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserTable;
