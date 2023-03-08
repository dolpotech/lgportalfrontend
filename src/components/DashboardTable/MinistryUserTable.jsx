import React, { useEffect, useState, useMemo } from "react";
import HeaderTable from "../../components/DataTable/HeaderTable";
import PaginationComponent from "../../components/DataTable/Pagination";
import SearchTable from "../../components/DataTable/Search";
import { approveInformation, getCommentsUserListMinistry } from "../../api";
import { Link } from "react-router-dom";
import ModalComponent from "../ModalComponent";
import { useStateValue } from "../../utils/StateProvider";
import { useTranslation } from "react-i18next";
import { changeIndexToNepali } from "../../utils";
import EditInfoCollection from "../EditInfoCollection";
import UploadDocumentModal from "../UploadDocumentModal";

function MinistryUserTable({ comments, dashboard }) {
  const { t } = useTranslation();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [{}, dispatch] = useStateValue();
  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  const ITEMS_PER_PAGE = 10;
  const roleId = JSON.parse(localStorage.getItem("userData")).roles.map(
    (item) => item.pivot.role_id
  );
  const headers = [
    { name: "सी. नं.", field: "sn", sortable: false },
    { name: "शीर्षक", field: "title", sortable: false },
    {
      name: "निकाए",
      field: "agency",
      sortable: false,
    },
    { name: "प्राथमिकता", field: "priority", sortable: false },
    { name: "पेश गरिएको मिति", field: "start", sortable: false },
    { name: "पेश गर्ने मिति", field: "submission", sortable: false },
    { name: "जानकारी प्रकार", field: "type", sortable: false },
    { name: "स्थिति", field: "status", sortable: false },
    { name: "कार्य", field: "status", sortable: false },
  ];
  const LgHeaders = [
    { name: "सी. नं.", field: "sn", sortable: false },
    { name: "शीर्षक", field: "id", sortable: false },
    {
      name: "निकाए",
      field: "agency",
      sortable: false,
    },
    { name: "प्राथमिकता", field: "priority", sortable: false },
    { name: "पेश गरिएको मिति", field: "start", sortable: false },
    { name: "पेश गर्ने मिति", field: "submission", sortable: false },
    { name: "जानकारी प्रकार", field: "type", sortable: false },
    { name: "स्थिति", field: "status", sortable: false },
    { name: "कार्य", field: "status", sortable: false },
  ];

  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter((comment) =>
        comment.user_type === "local_government"
          ? comment.title.toLowerCase().includes(search.toLowerCase()) ||
            comment.local_government.name
              .toLowerCase()
              .includes(search.toLowerCase())
          : comment.title.toLowerCase().includes(search.toLowerCase())
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
      {dashboard === "true" && (
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
      )}
      {commentsData == "" ? (
        <div className="p-4">कुनै जानकारी सङ्कलन डाटा फेला परेन...</div>
      ) : (
        <table className="w-full table-responsive text-sm text-left text-gray-500 dark:text-gray-400">
          <HeaderTable
            headers={roleId === 2 ? headers : LgHeaders}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {commentsData.map((value, i) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{1 + i++}</td>
                <td className="px-6 py-4">{value.title}</td>
                <td className="px-6 py-4">
                  {value.agency_type === "local_government"
                    ? "स्थानीयतह"
                    : value.agency_type === "ministry"
                    ? "मन्त्रालयतह"
                    : "कार्यालय"}
                </td>
                <td className="px-6 py-4">
                  {value.priority === "high" ? (
                    <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-orange-200 text-orange-700 rounded-full">
                      {t(value.priority)}
                    </div>
                  ) : (
                    <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
                      {t(value.priority)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {value.start_date === null
                    ? "-"
                    : changeIndexToNepali(value.start_date)}
                </td>

                <td className="px-6 py-4">
                  {value.submission_date === null
                    ? "-"
                    : changeIndexToNepali(value.submission_date)}
                </td>
                <td className="px-6 py-4 capitalize">{t(value.type)}</td>
                <td className="px-6 py-4">
                  {value.info_receiver_status === "pending" ? (
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
                      {t(value.info_receiver_status)}
                    </div>
                  ) : value.info_receiver_status === "processing" ? (
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
                      {t(value.info_receiver_status)}
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
                      {t(value.info_receiver_status)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 flex justify-between">
                  <div className="flex gap-4">
                    <Link
                      to={`/information-collection-detail/${value.information_id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {value.info_receiver_status === "pending" ? (
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
                      ) : (
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </Link>

                    {roleId != 8 &&
                      value.type === "information_collection" &&
                      value.info_receiver_status !== "pending" && (
                        <Link
                          to={`/self-assessment-form/${value.info_receiver_id}`}
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
                      )}
                    {roleId != 8 &&
                      value.type === "invitational" &&
                      (value.receiver_main_doc_path === null ? (
                        value.info_receiver_status !== "pending" && ""
                      ) : (
                        <a
                          href={
                            value.information_url +
                            "/" +
                            value.receiver_main_doc_path
                          }
                          target="_blank"
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
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </a>
                      ))}
                    {roleId == 8 &&
                      value.type === "invitational" &&
                      value.receiver_main_doc_path !== null && (
                        <a
                          href={
                            value.information_url +
                            "/" +
                            value.receiver_main_doc_path
                          }
                          target="_blank"
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
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </a>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MinistryUserTable;
