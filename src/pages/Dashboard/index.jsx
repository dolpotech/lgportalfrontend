import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import DashboardTable from "../../components/DashboardTable";
import NepalMap from "../../components/NepalMap";
import {
  getInfoCollection,
  getInfoCollectionAdmin,
  getLgInfoCollection,
  getInfoCollectionOffice,
  getMinistryCard,
  getLgCard,
} from "../../api";
import { useStateValue } from "../../utils/StateProvider";
import { useTranslation } from "react-i18next";
import OfficeDashboardTable from "../../components/DashboardTable/OfficeDashboardTable";
import LgDashboardTable from "../../components/DashboardTable/LgDashboardTable";
import { Link, useSearchParams } from "react-router-dom";
import { changeIndexToNepali } from "../../utils/index";
import MinistryUserTable from "../../components/DashboardTable/MinistryUserTable";
function Dashboard(props) {
  const [{ recall, recallOpt, updateLoading }, dispatch] = useStateValue();
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [adminData, setAdminData] = useState();
  const [card, setCard] = useState();
  const [activeTab, setActiveTab] = useState(true);
  const roleId = JSON.parse(localStorage.getItem("userData")).roles.map(
    (item) => item.pivot.role_id
  );
  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    dispatch({
      type: "SET_RECALL",
      item: false,
    });
    // Ministry Information List
    const getData = async () => {
      let listData = await getInfoCollection(token, false);
      await setData(listData.data);
      if (listData) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    // Local Government Information List
    const getLgData = async () => {
      let listData = await getLgInfoCollection(token, false);
      await setData(listData.data);
      let cardData = await getLgCard(token);
      await setCard(cardData);
      console.log(data);
      if (listData) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      } else {
        setData([]);
      }
    };
    // Ministry Information List
    const getMinAdminData = async () => {
      let listData = await getInfoCollectionAdmin(token, false);
      await setAdminData(listData.data);
      let cardData = await getMinistryCard(token);
      await setCard(cardData);
      if (listData) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      } else {
        setData([]);
      }
    };
    // Ministry Office Information List
    const getOfficeData = async () => {
      let listData = await getInfoCollectionOffice(token, false);
      await setData(listData.data);
      if (listData) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      } else {
        setData([]);
      }
    };
    if (
      JSON.parse(localStorage.getItem("userData")).type === "local_government"
    ) {
      getLgData();
    } else if (
      JSON.parse(localStorage.getItem("userData")).type === "ministry"
    ) {
      getMinAdminData();
      getData();
    } else {
      getOfficeData();
    }
  }, [recall, updateLoading]);

  const changeAdminPage = async (fullUrl) => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    setActiveTab(false);
    let listData = await getInfoCollectionAdmin(token, fullUrl);
    setAdminData(listData.data);
    if (listData) {
      setActiveTab(true);
      window.scrollTo({ top: 100, behavior: "smooth" });
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
  };
  const changeMinistryPage = async (fullUrl) => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    let listData = await getInfoCollection(token, fullUrl);
    setData(listData.data);
    if (listData) {
      window.scrollTo({ top: 100, behavior: "smooth" });
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
  };
  const changeLgPage = async (fullUrl) => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    let listData = await getLgInfoCollection(token, fullUrl);
    setData(listData.data);
    if (listData) {
      window.scrollTo({ top: 100, behavior: "smooth" });
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
  };
  const changeOfficePage = async (fullUrl) => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    let listData = await getInfoCollectionOffice(token, fullUrl);
    setData(listData.data);
    if (listData) {
      window.scrollTo({ top: 100, behavior: "smooth" });
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
  };

  switch (JSON.parse(localStorage.getItem("userData")).type) {
    case "ministry":
      return (
        <div className="container mx-auto px-4 mt-8">
          <h1 className="capitalize text-gray-900 text-2xl font-extrabold tracking-tight mb-2">
            {JSON.parse(localStorage.getItem("userData")).name +
              " " +
              "- " +
              t("dashboard")}
          </h1>
          <nav className="flex" aria-label="Breadcrumb">
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
                  <a className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                    {t("dashboard")}
                  </a>
                </div>
              </li>
            </ol>
          </nav>
          {roleId == 2 && (
            <section className="mt-5 grid md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <Card title={"कार्यहरुको सूची"} padding="true">
                  <aside aria-label="Sidebar">
                    <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                      <ul className="space-y-2">
                        <li>
                          <Link
                            to="/information-collection-section"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              नयाँ सूचना सङ्कलन गर्नुहोस्
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/offices"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              कार्यालयहरू
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/create-user"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              प्रयोगकर्ताहरू
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/notification"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              सूचना
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </aside>
                </Card>
              </div>
              <div className="md:col-span-9">
                <section className="flex gap-6 w-full mb-5">
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      {card &&
                        changeIndexToNepali(card.data.total_ministry_user)}
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      कुल मन्त्रालयको प्रयोगकर्ता
                    </div>
                  </div>
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      {card &&
                        changeIndexToNepali(
                          card.data.total_information_collection
                        )}
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      कुल माग गरिएको सूचना
                    </div>
                  </div>
                </section>
                <section className="flex gap-6 mt-2">
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      {card &&
                        changeIndexToNepali(
                          card.data.total_information_completed
                        )}
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      कुल पूरा भएको जानकारी
                    </div>
                  </div>
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      {card &&
                        changeIndexToNepali(
                          card.data.total_information_processing
                        )}
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      कुल प्रशोधन भैरहेको जानकारी
                    </div>
                  </div>
                </section>
              </div>
            </section>
          )}
          <section className="mt-5">
            <Card padding="true" title={"हालसालै माग गरिएको सूचनाहरु "}>
              {roleId == 2 && (
                <ul className="inline-flex w-full px-1 pt-2 ">
                  <li
                    className={
                      activeTab
                        ? "cursor-pointer px-4 py-2 font-semibold text-gray-800 border-b-2 rounded-t  border-blue-400 border-b-6 bg-[#f9fafb] -mb-px"
                        : "cursor-pointer px-4 py-2 font-semibold text-gray-800 rounded-"
                    }
                  >
                    <a onClick={() => setActiveTab(true)} id="default-tab">
                      पठाएको जानकारी संग्रह
                    </a>
                  </li>
                  <li
                    className={
                      activeTab
                        ? "cursor-pointer px-4 py-2 font-semibold text-gray-800 rounded-t"
                        : "cursor-pointer px-4 py-2 font-semibold text-gray-800 bg-[#f9fafb] border-b-2 rounded-t  border-blue-400 border-b-6 -mb-px"
                    }
                  >
                    <a onClick={() => setActiveTab(false)}>
                      प्राप्त जानकारी संग्रह
                    </a>
                  </li>
                </ul>
              )}
              {roleId == 2
                ? data && (
                    <div>
                      {activeTab ? (
                        <div>
                          {adminData && (
                            <DashboardTable
                              comments={adminData.data}
                              activePage={data.current_page}
                            />
                          )}
                          {adminData && (
                            <div className="dataTables_paginate mt-5 p-4">
                              <div className="pagination flex items-center justify-end">
                                <div className="bg-white flex flex-col xs:flex-row items-center xs:justify-between">
                                  <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                      onClick={() =>
                                        changeAdminPage(adminData.prev_page_url)
                                      }
                                      className="text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-l"
                                    >
                                      Prev
                                    </button>
                                    {adminData.links
                                      .slice(1, -1)
                                      .map((item) => (
                                        <button
                                          onClick={() =>
                                            item.url !== null &&
                                            changeAdminPage(item.url)
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
                                      onClick={() =>
                                        changeAdminPage(adminData.next_page_url)
                                      }
                                      className="text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-r"
                                    >
                                      Next
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {data && (
                            <MinistryUserTable comments={data && data.data} />
                          )}
                          {data && (
                            <div className="dataTables_paginate mt-5 p-4">
                              <div className="pagination flex items-center justify-end">
                                <div className="bg-white flex flex-col xs:flex-row items-center xs:justify-between">
                                  <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                      onClick={() =>
                                        changeMinistryPage(data.prev_page_url)
                                      }
                                      className="text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-l"
                                    >
                                      Prev
                                    </button>
                                    {data.links.slice(1, -1).map((item) => (
                                      <button
                                        onClick={() =>
                                          item.url !== null &&
                                          changeMinistryPage(item.url)
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
                                      onClick={() =>
                                        changeMinistryPage(data.next_page_url)
                                      }
                                      className="text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-r"
                                    >
                                      Next
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                : data && (
                    <div>
                      {data && <MinistryUserTable comments={data.data} />}
                      {data && (
                        <div className="dataTables_paginate mt-5 p-4">
                          <div className="pagination flex items-center justify-end">
                            <div className="bg-white flex flex-col xs:flex-row items-center xs:justify-between">
                              <div className="inline-flex mt-2 xs:mt-0">
                                <button
                                  onClick={() =>
                                    changeMinistryPage(data.prev_page_url)
                                  }
                                  className="text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-l"
                                >
                                  Prev
                                </button>
                                {data.links.slice(1, -1).map((item) => (
                                  <button
                                    onClick={() =>
                                      item.url !== null &&
                                      changeMinistryPage(item.url)
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
                                  onClick={() =>
                                    changeMinistryPage(data.next_page_url)
                                  }
                                  className="text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-r"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
            </Card>
          </section>

          {/* <section className="mt-5">
          <Card title={"Map"}>
            <NepalMap className="p-0" />
          </Card>
        </section> */}
        </div>
      );
    case "local_government":
      return (
        <div className="container mx-auto px-4 mt-8">
          <h1 className="capitalize text-gray-900 text-2xl font-extrabold tracking-tight mb-2">
            {JSON.parse(localStorage.getItem("userData")).name + " "}
            ड्यासबोर्ड{" "}
          </h1>
          <nav className="flex" aria-label="Breadcrumb">
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
                  <a className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                    {t("dashboard")}
                  </a>
                </div>
              </li>
            </ol>
          </nav>
          {roleId == 8 && (
            <section className="mt-5 grid md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <Card title={"कार्यहरुको सूची"} padding="true">
                  <aside aria-label="Sidebar">
                    <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                      <ul className="space-y-2">
                        <li>
                          <Link
                            to="/create-user"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              प्रयोगकर्ताहरू
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/notification"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              सूचना
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </aside>
                </Card>
              </div>
              <div className="md:col-span-9">
                <section className="flex gap-6 w-full mb-5">
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      {card && changeIndexToNepali(card.data.total_lg_user)}
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      कुल मन्त्रालयको प्रयोगकर्ता
                    </div>
                  </div>
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      {card &&
                        changeIndexToNepali(
                          card.data.total_information_collection
                        )}
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      कुल मन्त्रालयको प्रयोगकर्ता
                    </div>
                  </div>
                </section>
                <section className="flex gap-6 mt-2">
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      {card &&
                        changeIndexToNepali(
                          card.data.total_information_completed
                        )}
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      कुल मन्त्रालयको प्रयोगकर्ता
                    </div>
                  </div>
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      {card &&
                        changeIndexToNepali(
                          card.data.total_information_processing
                        )}
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      कुल मन्त्रालयको प्रयोगकर्ता
                    </div>
                  </div>
                </section>
              </div>
            </section>
          )}
          <section className="mt-5">
            <Card padding="true" title={"हालसालै माग गरिएको सूचनाहरु "}>
              {data && <LgDashboardTable comments={data.data} />}
              {data && (
                <div className="dataTables_paginate mt-5 p-4">
                  <div className="pagination flex items-center justify-end">
                    <div className="bg-white flex flex-col xs:flex-row items-center xs:justify-between">
                      <div className="inline-flex mt-2 xs:mt-0">
                        <button
                          onClick={() => changeLgPage(data.prev_page_url)}
                          className="text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-l"
                        >
                          Prev
                        </button>
                        {data.links.slice(1, -1).map((item) => (
                          <button
                            onClick={() =>
                              item.url !== null && changeLgPage(item.url)
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
                          onClick={() => changeLgPage(data.next_page_url)}
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

          {/* <section className="mt-5">
          <Card title={"Map"}>
            <NepalMap className="p-0" />
          </Card>
        </section> */}
        </div>
      );
    case "ministry_office":
      return (
        <div className="container mx-auto px-4 mt-8">
          <h1 className="capitalize text-gray-900 text-2xl font-extrabold tracking-tight mb-2">
            {JSON.parse(localStorage.getItem("userData")).roles.map(
              (item) => item.name
            )}{" "}
            Dashboard{" "}
          </h1>
          <nav className="flex" aria-label="Breadcrumb">
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
                  <a className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                    {t("dashboard")}
                  </a>
                </div>
              </li>
            </ol>
          </nav>
          {roleId == 5 && (
            <section className="mt-5 grid md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <Card title={"कार्यहरुको सूची"} padding="true">
                  <aside aria-label="Sidebar">
                    <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                      <ul className="space-y-2">
                        {roleId == 5 ? (
                          <li>
                            <Link
                              to="/create-user"
                              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                              </svg>
                              <span className="flex-1 ml-3 whitespace-nowrap">
                                प्रयोगकर्ताहरू
                              </span>
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}
                        <li>
                          <Link
                            to="/notification"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                              सूचना
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </aside>
                </Card>
              </div>
              <div className="md:col-span-9">
                <section className="flex gap-6 w-full mb-5">
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      117
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      Total Active Users
                    </div>
                  </div>
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      117
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      Total Login Users
                    </div>
                  </div>
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      117
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      Total LGs
                    </div>
                  </div>
                </section>
                <section className="flex gap-6 mt-2">
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      117
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      Total Information Collected
                    </div>
                  </div>
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      117
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      Total Information Being Collected
                    </div>
                  </div>
                  <div className="pl-6 py-4 overflow-hidden shadow-md bg-[#E1F0FF] w-full">
                    <div className="text-4xl capitalize text-[#3699FF] pb-2 font-bold">
                      117
                    </div>
                    <div className="font-light capitalize text-[#3699FF]">
                      Total Defaults Form
                    </div>
                  </div>
                </section>
              </div>
            </section>
          )}
          <section className="mt-5">
            <Card padding="true" title={"हालसालै माग गरिएको सूचनाहरु "}>
              {data && <OfficeDashboardTable comments={data.data} />}
              {data && (
                <div className="dataTables_paginate mt-5 p-4">
                  <div className="pagination flex items-center justify-between">
                    <div className="bg-white flex flex-col xs:flex-row items-center xs:justify-between">
                      <div className="inline-flex mt-2 xs:mt-0">
                        <button
                          onClick={() => changeOfficePage(data.prev_page_url)}
                          className="text-sm bg-blue-100 hover:bg-[#2571bb] hover:text-white text-gray-800 font-semibold py-2 px-4 rounded-l"
                        >
                          Prev
                        </button>
                        {data.links.slice(1, -1).map((item) => (
                          <button
                            onClick={() =>
                              item.url !== null && changeOfficePage(item.url)
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
                          onClick={() => changeOfficePage(data.next_page_url)}
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

          {/* <section className="mt-5">
          <Card title={"Map"}>
            <NepalMap className="p-0" />
          </Card>
        </section> */}
        </div>
      );
    default:
      return <div className="p-4">कृपया एउटा कोटी चयन गर्नुहोस्।.</div>;
  }
}

export default Dashboard;
