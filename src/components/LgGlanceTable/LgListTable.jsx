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

function LgGlanceTable({ comments, information }) {
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
    { name: "सी. नं.", field: "sn", sortable: false },
    { name: "निकाय", field: "name", sortable: false },
    { name: "स्थिति", field: "status", sortable: false },
    { name: "स्थिति हेरिएको मिति र समय", field: "open", sortable: false },
    { name: "विवरण हेर्नुहोस", field: "detail", sortable: false },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const commentsData = useMemo(() => {
    let computedComments = comments;
    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.lg_name.toLowerCase().includes(search.toLowerCase()) ||
          comment.lg_type.toLowerCase().includes(search.toLowerCase())
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
                  {value.lg_name ? (
                    <Link
                      className="hover:text-[#2572bc]"
                      to={`/lg-glance/${value.lg_id}`}
                    >
                      {value.lg_name}
                    </Link>
                  ) : value.mo_name ? (
                    <p>{value.mo_name}</p>
                  ) : (
                    <p>{value.ministry_name}</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  {value.status === "pending" ? (
                    <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-orange-200 text-orange-700 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {t(value.status)}
                    </div>
                  ) : value.status === "processing" ? (
                    <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      {t(value.status)}
                    </div>
                  ) : (
                    <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {t(value.status)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {value.Is_Opened === 1 ? (
                      changeIndexToNepali(value.when_opened)
                    ) : (
                      <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {parseInt(roleId) === 2 && value.status === "completed" ? (
                    information.information_type === "circular" ? (
                      <p>यो जानकारी सङ्कलन कुनै डाटा छैन</p>
                    ) : information.information_type === "invitational" ? (
                      <a
                        target="_blank"
                        href={storage_url + value.receiver_main_doc_path}
                        className="text-xs inline-flex items-center font-bold leading-sm capitalize hover:underline px-4 py-1 bg-blue-200 text-blue-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        कागजात खोल्नुहोस्
                      </a>
                    ) : (
                      <Link
                        to={`/information-collection-results/${value.info_receiver_id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </Link>
                    )
                  ) : (
                    "-"
                  )}
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

export default LgGlanceTable;
