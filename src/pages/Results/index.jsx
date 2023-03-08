import React, { useEffect, useState } from "react";
import { textSearch } from "../../api";
import { Link, useSearchParams } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";
import SingleResult from "./SingleResult";
import { useNavigate, useLocation, useHistory } from "react-router-dom";
import UseInput from "../../utils/UseInput";
import { changeIndexToNepali } from "../../utils";
import i18next from "i18next";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function Results(props) {
  const { t } = useTranslation();
  const location = useLocation();
  const [{}, dispatch] = useStateValue();
  const { value: text, bind: bindText, reset: resetText } = UseInput("");
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();

  const goToNextPage = async (page) => {
    if (load) {
      navigate(`/results?${page.substring(page.indexOf("?") + 1)}`);
    }
  };
  function isFloat(n) {
    return n === +n && n !== (n | 0);
  }

  function roundNumber(n) {
    if (n > 0 && data.per_page > 0) return Math.ceil(n);
    if (isFloat(n)) {
      let numberToRound = parseInt(n);
      return numberToRound + 1;
    } else {
      return parseInt(n);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length > 3) {
      navigate(`/results?keyword=${text}`);
    } else {
      toast.error("कृपया कम्तिमा ३ अक्षरहरू प्रविष्ट गर्नुहोस्!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  useEffect(() => {
    const searchText = async () => {
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      let results = await textSearch(location.search);
      setData(results.data);
      console.log(results.data.searchdata.total);
      if (results || results === "error") {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    searchText();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-gray-900 text-2xl font-extrabold tracking-tight mb-2">
        {changeIndexToNepali(data && data.searchdata.total) + " "} परिणाम फेला
        पर्यो
      </h1>
      {/* <p className="text-base text-gray-500 mt-4">
        {data && data.summary}
      </p> */}
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
              {t("header_home")}
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
                परिणामहरू
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <form onSubmit={handleSubmit} className="mb-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          खोज
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 576 512"
              className="text-[#2571bb] text-[1.5rem]"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z" />
            </svg>{" "}
          </div>
          <input
            type="search"
            {...bindText}
            id="default-search"
            className="block p-4 pl-12 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={searchParams.get("keyword")}
            required
          />
          <button
            type="submit"
            className="flex text-white absolute right-2.5 bottom-2.5 bg-[#276fb9] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 512 512"
              className="text-[#fff] relative top-[3px] right-[3px]"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
            </svg>
            खोज
          </button>
        </div>
      </form>
      {data && data.searchdata !== "No data found" && (
        <SingleResult options={data.summary} comments={data.searchdata} />
      )}
      {data && data.searchdata.data.length === 0 && (
        <div className="p-4">कुनै परिणाम फेला परेन।.</div>
      )}
      {data && data.searchdata !== "No data found" && (
        <div className="flex mt-8">
          <div className="bg-white flex flex-col xs:flex-row items-center xs:justify-between">
            {/* <span className="text-xs xs:text-sm text-gray-900">
                    Showing {comments.current_page} of{" "}
                    {roundNumber(comments.total / comments.per_page)} Pages
                  </span> */}
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                onClick={() => goToNextPage(data.searchdata.prev_page_url)}
                className="text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-l"
              >
                Prev
              </button>
              {data.searchdata.links.slice(1, -1).map((item) => (
                <button
                  onClick={() => item.url !== null && goToNextPage(item.url)}
                  className={
                    item.active
                      ? "text-sm bg-blue-100 bg-[#2571bb] text-white font-semibold py-2 px-4"
                      : "text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4"
                  }
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => goToNextPage(data.searchdata.next_page_url)}
                className="text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-r"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
