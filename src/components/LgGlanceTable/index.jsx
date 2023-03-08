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

function LgGlanceTable({ comments }) {
  console.log(comments);
  const { t } = useTranslation();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [refresh, setRrefresh] = useState(false);
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 10;

  const headers = [
    { name: "सं", field: "sn", sortable: false },
    { name: "स्थानीय तह", field: "lg", sortable: false },
    { name: "जिल्ला", field: "district", sortable: false },
    { name: "प्रकार", field: "type", sortable: false },
    { name: "एक नजर पृष्ठ", field: "glance", sortable: false },
    { name: "वेबसाइट", field: "website", sortable: false },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.district.toLowerCase().includes(search.toLowerCase())
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
                <td className="px-6 py-4">{1 + i++}</td>
                <td className="px-6 py-4">
                  <Link
                    className="hover:text-[#2572bc]"
                    to={`/lg-glance/${value.id}`}
                  >
                    {i18next.language === "np" ? value.name : value.name_en}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  {i18next.language === "np"
                    ? value.district_nep
                    : value.district}
                </td>
                <td className="px-6 py-4">
                  {i18next.language === "np" ? value.type_nep : value.type}
                </td>
                <td className="px-6 py-4">
                  <Link
                    className="hover:text-[#2572bc]"
                    to={`/lg-glance/${value.id}`}
                  >
                    <div className="text-xs inline-flex items-center font-bold leading-sm capitalize hover:underline px-4 py-1 bg-blue-200 text-blue-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      {t("go_to_glance")}
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={value.website}
                    className="hover:text-[#2572bc]"
                    target="_blank"
                  >
                    <div className="text-xs inline-flex items-center font-bold leading-sm capitalize hover:underline px-4 py-1 bg-gray-200 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      {t("go_to_website")}
                    </div>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <PaginationComponent
        total={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default LgGlanceTable;
