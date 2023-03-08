import React, { useEffect, useState, useMemo } from "react";
import Card from "../../components/Card";
import {
  getDistrict,
  getLgByDistrict,
  getLgRelatedData,
  getLgRelatedDataType,
  getType,
  getLgRelatedDataDistrict,
  getLgRelatedDataLg,
  getLgRelatedDataPagination,
  exportSearchResults,
} from "../../api";
import HeaderTable from "../../components/DataTable/HeaderTable";
import SearchTable from "../../components/DataTable/Search";
import PaginationComponent from "../../components/DataTable/Pagination";
import logo from "../../assets/logo.svg";
import { useStateValue } from "../../utils/StateProvider";
import AdvanceSearch from "./AdvanceSearch";
import { Link, useSearchParams } from "react-router-dom";
import { changeIndexToNepali } from "../../utils/index";
import { useTranslation } from "react-i18next";

function SearchByCategory(props) {
  const { t } = useTranslation();
  const [districts, setDistricts] = useState();
  const [districtId, setDistrictId] = useState();
  const [lg, setLg] = useState();
  const [type, setType] = useState();
  const [advanceType, setAdvanceType] = useState();
  const [typeList, setTypeList] = useState();
  const [lgId, setLgId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [{}, dispatch] = useStateValue();
  const [searchParams] = useSearchParams();

  const handleSelectSearchCategory = async (e) => {
    setCurrentPage(1);
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    setTypeList();
    const getData = async () => {
      let districtData = await getDistrict();
      setDistricts(districtData.data);
    };
    getData();
    setComments(await getLgRelatedData(false, e.target.value));
    if (comments) {
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
    setType(e.target.value);
  };

  const handleSelectType = async (e) => {
    setCurrentPage(1);
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    setComments(await getLgRelatedDataType(type, e.target.value));
    setTypeList(e.target.value);
    if (comments) {
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
  };

  const handleSelectDistrict = async (e) => {
    setCurrentPage(1);
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    setLg(await getLgByDistrict(e.target.value));
    setComments(await getLgRelatedDataDistrict(type, typeList, e.target.value));
    setDistrictId(e.target.value);
    if (comments) {
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
  };

  const handleSelectLg = async (e) => {
    setCurrentPage(1);
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    setLgId(e.target.value);
    setComments(
      await getLgRelatedDataLg(type, typeList, districtId, e.target.value)
    );
    if (comments) {
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
  };
  const handlePaginationNumber = async (e) => {
    setCurrentPage(1);
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    setLgId(e.target.value);
    setComments(
      await getLgRelatedDataPagination(
        type,
        typeList,
        districtId,
        lgId,
        e.target.value
      )
    );
    if (comments) {
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
  };
  const LinkSearchCategory = async (e) => {
    setCurrentPage(1);
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    const getData = async () => {
      let districtData = await getDistrict();
      setDistricts(districtData.data);
    };
    getData();
    setComments(await getLgRelatedData(false, e));
    if (comments) {
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
    setType(e);
  };

  const goToNextPage = async (fullUrl, url) => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    setComments(await getLgRelatedData(fullUrl, url));
    setCurrentPage(comments.current_page);
    if (comments) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
  };

  useEffect(() => {
    if (type) {
      var dropDown = document.getElementById("advance_type_id");
      dropDown.selectedIndex = 0;
      var dropDown = document.getElementById("district_id");
      dropDown.selectedIndex = 0;
      var dropDown2 = document.getElementById("lg_id");
      dropDown2.selectedIndex = 0;
    }
    const getAdvanceTypeApi = async () => {
      let newType;
      if (type !== undefined) {
        newType = await getType(type);
      }
      setAdvanceType(newType.data);
    };
    getAdvanceTypeApi();
  }, [type]);
  useEffect(() => {
    if (typeList) {
      var dropDown = document.getElementById("district_id");
      dropDown.selectedIndex = 0;
      var dropDown2 = document.getElementById("lg_id");
      dropDown2.selectedIndex = 0;
    }
  }, [typeList]);
  useEffect(() => {
    if (districtId) {
      var dropDown2 = document.getElementById("lg_id");
      dropDown2.selectedIndex = 0;
    }
  }, [districtId]);
  useEffect(() => {
    if (searchParams.get("category")) {
      LinkSearchCategory(searchParams.get("category"));
    }
  }, [searchParams.get("category")]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  function isFloat(n) {
    return n === +n && n !== (n | 0);
  }

  function roundNumber(n) {
    if (n > 0 && comments.per_page > 0) return Math.ceil(n);
    if (isFloat(n)) {
      let numberToRound = parseInt(n);
      return numberToRound + 1;
    } else {
      return parseInt(n);
    }
  }

  return (
    <div>
      {/* <AdvanceSearch /> */}
      {/* <Banner /> */}
      <section className="container px-4 lg:px-0 mx-auto mt-8 grid">
        <h1 className="text-gray-900 text-2xl font-extrabold tracking-tight mb-2">
          डाटासेटहरूको आधारमा खोजि
        </h1>
        <nav className="flex" aria-label="Breadcrumb" className="mb-5">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                href="#"
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
                  उन्नत खोज
                </a>
              </div>
            </li>
          </ol>
        </nav>
        <div>
          <div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <select
                className="form-select block min-w-full md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200 "
                onChange={handleSelectSearchCategory}
              >
                <option disabled selected>
                  श्रेणी चयन गर्नुहोस्
                </option>

                <option
                  selected={
                    searchParams.get("category") === "staff" ? "selected" : ""
                  }
                  value="staff"
                >
                  {t("staffs")}
                </option>
                <option
                  selected={
                    searchParams.get("category") === "elected_representative"
                      ? "selected"
                      : ""
                  }
                  value="elected_representative"
                >
                  {t("elected_official")}
                </option>
                <option
                  selected={
                    searchParams.get("category") === "website_directory"
                      ? "selected"
                      : ""
                  }
                  value="website_directory"
                >
                  {t("website_directory")}
                </option>
                <option
                  selected={
                    searchParams.get("category") === "document"
                      ? "selected"
                      : ""
                  }
                  value="document"
                >
                  {t("documents")}
                </option>
                <option
                  selected={
                    searchParams.get("category") === "service" ? "selected" : ""
                  }
                  value="service"
                >
                  {t("services")}
                </option>
                <option
                  selected={
                    searchParams.get("category") === "contact" ? "selected" : ""
                  }
                  value="contact"
                >
                  {t("contact")}
                </option>
                <option
                  selected={
                    searchParams.get("category") === "resource_map"
                      ? "selected"
                      : ""
                  }
                  value="resource_map"
                >
                  {t("resource_maps")}
                </option>
                <option
                  selected={
                    searchParams.get("category") === "article" ? "selected" : ""
                  }
                  value="article"
                >
                  {t("article")}
                </option>
              </select>
            </div>
          </div>
          <div
            className={
              type === "resource_map" || type === "contact"
                ? "hidden"
                : "grid grid-cols-1 gap-4 mt-4"
            }
          >
            {type === "resource_map" || type === "contact" ? (
              <div>
                <select
                  id="advance_type_id"
                  className="form-select block min-w-full md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200 "
                  onChange={handleSelectType}
                >
                  <option selected disabled>
                    कृपया प्रकार चयन गर्नुहोस्
                  </option>
                  {advanceType &&
                    advanceType.map((value, i) => (
                      <option value={value.id}>{value.name}</option>
                    ))}
                </select>
              </div>
            ) : (
              type && (
                <div>
                  <select
                    id="advance_type_id"
                    className="form-select block min-w-full md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200 "
                    onChange={handleSelectType}
                  >
                    <option selected disabled>
                      कृपया प्रकार चयन गर्नुहोस्
                    </option>
                    {advanceType &&
                      advanceType.map((value, i) => (
                        <option value={value.id}>{value.name}</option>
                      ))}
                  </select>
                </div>
              )
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-4">
            {type === "resource_map" || type === "contact" ? (
              <div>
                <select
                  id="district_id"
                  className="form-select block min-w-full md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200 "
                  onChange={handleSelectDistrict}
                >
                  <option selected disabled>
                    जिल्ला चयन गर्नुहोस्
                  </option>
                  {districts &&
                    districts.map((value, i) => (
                      <option value={value.id}>{value.name}</option>
                    ))}
                </select>
              </div>
            ) : (
              type && (
                <div>
                  <select
                    id="district_id"
                    className="form-select block min-w-full md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200 "
                    onChange={handleSelectDistrict}
                  >
                    <option selected disabled>
                      जिल्ला चयन गर्नुहोस्
                    </option>
                    {districts &&
                      districts.map((value, i) => (
                        <option value={value.id}>{value.name}</option>
                      ))}
                  </select>
                </div>
              )
            )}
            {type === "resource_map" || type === "contact" ? (
              <div>
                <select
                  id="lg_id"
                  className="form-select block min-w-full md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200 "
                  onChange={handleSelectLg}
                >
                  <option selected disabled>
                    स्थानीय सरकार चयन गर्नुहोस्
                  </option>
                  {lg &&
                    lg.map((value) => (
                      <option value={value.id}>{value.name}</option>
                    ))}
                </select>
              </div>
            ) : (
              type && (
                <div>
                  <select
                    id="lg_id"
                    className="form-select block min-w-full md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200 "
                    onChange={handleSelectLg}
                  >
                    <option selected disabled>
                      स्थानीय सरकार चयन गर्नुहोस्
                    </option>
                    {lg &&
                      lg.map((value) => (
                        <option value={value.id}>{value.name}</option>
                      ))}
                  </select>
                </div>
              )
            )}
          </div>
        </div>
        <div className="">
          {type && (
            <button
              className=" text-basehover:underline p-2 w-max flex items-center hover:underline"
              onClick={() => {
                window.location.reload();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="mr-2 bi bi-arrow-repeat"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
                <path
                  fill-rule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                ></path>
              </svg>
              रिसेट
            </button>
          )}
          {type && (
            <a
              className="flex w-max items-center mt-5 text-white bg-[#276fb9] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              target="_blank"
              href={`https://sikaah.com/api/exportexcel?search_by=${type}&type${
                typeList !== undefined ? "=" + typeList : ""
              }&district_id${
                districtId !== undefined ? "=" + districtId : ""
              }&lg_id${lgId != undefined ? "=" + lgId : ""}`}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              एक्सेलको रूपमा डाउनलोड गर्नुहोस्
            </a>
          )}
        </div>
        <Card className="mt-5 overflow-hidden" padding="true">
          {comments.data && (
            <p className="p-4">
              {comments &&
                `${changeIndexToNepali(
                  comments.per_page
                )} पृष्ठमा मा ${changeIndexToNepali(
                  comments.total
                )}  प्रविष्टिहरू देखाउँदै`}
            </p>
          )}

          <AdvanceSearch type={type} comments={comments} />
          {comments.data && (
            <div className="f dataTables_paginate mt-5 p-4">
              <div className="pagination flex items-center justify-between ">
                <select
                  onChange={handlePaginationNumber}
                  className="form-select block h-max w-max px-3 py-1.5 pr-14 ml-4 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200"
                >
                  <option selected disabled>
                    प्रविष्टिहरू देखाउनुहोस्
                  </option>
                  <option
                    disabled={comments.total < 12 && "disabled"}
                    value={12}
                  >
                    {changeIndexToNepali(10)}
                  </option>
                  <option
                    disabled={comments.total < 24 && "disabled"}
                    value={24}
                  >
                    {changeIndexToNepali(24)}
                  </option>
                  <option
                    disabled={comments.total < 48 && "disabled"}
                    value={48}
                  >
                    {changeIndexToNepali(48)}
                  </option>
                  <option
                    disabled={comments.total < 96 && "disabled"}
                    value={96}
                  >
                    {changeIndexToNepali(96)}
                  </option>
                </select>
                <div className="bg-white flex flex-col xs:flex-row items-center xs:justify-between">
                  {/* <span className="text-xs xs:text-sm text-gray-900">
                    Showing {comments.current_page} of{" "}
                    {roundNumber(comments.total / comments.per_page)} Pages
                  </span> */}
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button
                      onClick={() => goToNextPage(true, comments.prev_page_url)}
                      className="text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-l"
                    >
                      Prev
                    </button>
                    {comments.links.slice(1, -1).map((item) => (
                      <button
                        onClick={() =>
                          item.url !== null && goToNextPage(true, item.url)
                        }
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
                      onClick={() => goToNextPage(true, comments.next_page_url)}
                      className="text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-r"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}

export default SearchByCategory;
