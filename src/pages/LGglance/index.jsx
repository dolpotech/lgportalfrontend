import React, { useEffect, useState, useMemo } from "react";
import { getLgList } from "../../api";
import Card from "../../components/Card";
import HeaderTable from "../../components/DataTable/HeaderTable";
import SearchTable from "../../components/DataTable/Search";
import PaginationComponent from "../../components/DataTable/Pagination";
import LgGlanceTable from "../../components/LgGlanceTable";
import { useStateValue } from "../../utils/StateProvider";
import { Link, useNavigate, useParams } from "react-router-dom";
import i18next from "i18next";

export default function LGglance() {
  const [{}, dispatch] = useStateValue();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    const getData = async () => {
      let data = await getLgList();
      await setData(data);
      if (data) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    getData();
    i18next.on("languageChanged", () => {
      getData();
    });
  }, []);
  return (
    <div className="container px-4 lg:px-0 mx-auto mt-8">
      <h1 className="text-gray-900 text-2xl font-extrabold tracking-tight mb-2">
        स्थानीय तह
      </h1>
      <nav className="flex" aria-label="Breadcrumb" className="mb-5">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="mr-2 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              गृह पृष्ठ
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <a
                href="#"
                className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                स्थानीय तह
              </a>
            </div>
          </li>
        </ol>
      </nav>

      {data && (
        <Card padding="true">
          <LgGlanceTable comments={data} />
        </Card>
      )}
    </div>
  );
}
