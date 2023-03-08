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
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { changeIndexToNepali } from "../../utils";
import { info } from "autoprefixer";
import { useStateValue } from "../../utils/StateProvider";

function ResultTable({ comments, information }) {
  const roleId = JSON.parse(localStorage.getItem("userData")).roles.map(
    (item) => item.pivot.role_id
  );
  const [{ storage_url }, dispatch] = useStateValue();
  const { t } = useTranslation();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [refresh, setRrefresh] = useState(false);
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 10;

  const headers = [
    { name: "सं", field: "sn", sortable: false },
    { name: "प्रश्नको नाम", field: "name", sortable: false },
    { name: "प्रश्नको प्रकार", field: "type", sortable: false },
    { name: "जवाफ", field: "open", sortable: false },
    { name: "कागजात सिर्जना मिति", field: "date", sortable: false },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const commentsData = useMemo(() => {
    let computedComments = comments;
    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.field_name.toLowerCase().includes(search.toLowerCase()) ||
          comment.field_type.toLowerCase().includes(search.toLowerCase())
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
              <tr className="bg-white text-black border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{changeIndexToNepali(1 + i++)}</td>
                <td className="px-6 py-4">{value.field_name}</td>
                <td className="px-6 py-4">{value.field_type}</td>
                <td className="px-6 py-4">{value.answer}</td>
                <td className="px-6 py-4">
                  {changeIndexToNepali(value.document_created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {totalItems > ITEMS_PER_PAGE && (
        <PaginationComponent
          total={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default ResultTable;
