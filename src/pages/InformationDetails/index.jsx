import React, { useState, useEffect } from "react";
import SingleComment from "../../components/Comments/SingleComment";
import {
  getInformationDetailAdmin,
  getInformationDetailLg,
  getInformationDetailOffice,
  postCommentLg,
  getPdf,
  approveInformationCollection,
  getInformationDetailMinistry,
} from "../../api";
import { useStateValue } from "../../utils/StateProvider";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { changeIndexToNepali } from "../../utils";
import UseInput from "../../utils/UseInput";
import UploadDocumentModal from "../../components/UploadDocumentModal";
import ModalComponent from "../../components/ModalComponent";

export default function InformationDetails() {
  const { t } = useTranslation();
  const [{ recall }, dispatch] = useStateValue();
  const [data, setData] = useState([]);
  const [commentPosted, setCommentPosted] = useState(false);
  const { value: text, bind: bindText, reset: resetText } = UseInput("");
  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  const userType = JSON.parse(localStorage.getItem("userData")).type;
  let roleId = "";
  if (localStorage.getItem("userData")) {
    roleId = JSON.parse(localStorage.getItem("userData")).roles.map(
      (item) => item.pivot.role_id
    );
  }
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const { id } = useParams();
  const postData = async (e) => {
    let formData = {
      information_id: id,
      comment: text,
    };
    await postCommentLg(formData, token);
    setCommentPosted(true);
    resetText();
  };
  const approveDocument = async () => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    let dataToPost = {
      info_receiver_id: data.info_receiver_id,
    };
    let response = await approveInformationCollection(dataToPost, token);
    if (response) {
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
      dispatch({
        type: "SET_RECALL",
        item: true,
      });
    }
  };
  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    const getData = async () => {
      setCommentPosted(false);
      dispatch({
        type: "SET_RECALL",
        item: false,
      });
      let data = await getInformationDetailAdmin(token, id);
      await setData(data);
      if (data) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    const getDataLg = async () => {
      dispatch({
        type: "SET_RECALL",
        item: false,
      });
      setCommentPosted(false);
      let data = await getInformationDetailLg(token, id);
      await setData(data);
      if (data) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    const getDataOffice = async () => {
      dispatch({
        type: "SET_RECALL",
        item: false,
      });
      setCommentPosted(false);
      let data = await getInformationDetailOffice(token, id);
      await setData(data);
      if (data) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    const getDataMinistryUser = async () => {
      dispatch({
        type: "SET_RECALL",
        item: false,
      });
      setCommentPosted(false);
      let data = await getInformationDetailMinistry(token, id);
      await setData(data);
      if (data) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    if (userType === "local_government") {
      getDataLg();
    } else if (userType === "ministry") {
      if (roleId == 2) {
        getData();
      } else {
        getDataMinistryUser();
      }
    } else {
      getDataOffice();
    }
  }, [commentPosted, recall]);
  return (
    <section className="m-6 container mx-auto">
      <div className="flex justify-between">
        <div>
          <h1 className="text-gray-900 text-2xl font-extrabold tracking-tight mb-2">
            सूचनाको विवरण पृष्ठ
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
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  {t("header_home")}
                </Link>
              </li>
              <li className="inline-flex items-center">
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
                  />
                </svg>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {t("dashboard")}
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
                    />
                  </svg>
                  <a
                    href="#"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    सूचनाको विवरण पृष्ठ
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="shadow-md divide-y px-6 pb-8 my-4">
        <div className="py-6 mt-5 lg:px-0">
          <div className="relative">
            <p className="mb-2 lg:text-sm text-xs text-gray-600 dark:text-gray-300 font-medium leading-none">
              {`${data.creator && data.creator.name} (${t(data.type)})`}
            </p>
            <h2 className="text-3xl font-semibold text-gray-800 leading-tight">
              {data.title}
            </h2>
            {roleId == 2 && (
              <Link
                to={`/information-collection-detail/list/${data.information_id}`}
                className="mt-4 text-sm bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow absolute flex items-center cursor-pointer top-0 right-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                सूचना माग गरिएको निकायहरुको सुची हेर्नुहोस
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 ml-1 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            )}
            {roleId == 8 || roleId == 2 || roleId == 5 ? (
              " "
            ) : data.type === "information_collection" ? (
              <Link
                to={`/self-assessment-form/${data.info_receiver_id}`}
                className="mt-4 font-sm bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow absolute flex items-center  cursor-pointer top-0 right-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
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
                आत्म-मूल्यांकन फारममा जानुहोस्
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 ml-1 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            ) : data.type === "invitational" ? (
              data.receiver_main_doc_path === null ? (
                <div className="mt-4 font-sm bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow absolute flex items-center  cursor-pointer top-0 right-0">
                  <UploadDocumentModal data={data} />
                </div>
              ) : (
                <div className="absolute top-0 right-0 justify-end">
                  <div
                    className={
                      data.receiver_main_doc_path !== null
                        ? "flex justify-end cursor-pointer gap-4"
                        : "flex justify-center cursor-pointer gap-4"
                    }
                  >
                    {data.info_receiver_status !== "completed" &&
                      (roleId == 9 || roleId == 6 || roleId == 3) && (
                        <ModalComponent buttonName={"कागजात अनुमोदन गर्नुहोस्"}>
                          <div className="p-6 text-center">
                            <svg
                              className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                              के तपाइँ यो कागजात अनुमोदन गर्न निश्चित हुनुहुन्छ?
                            </h3>
                            <div
                              className="mt-4 cursor-pointer font-sm bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow "
                              onClick={() => approveDocument()}
                            >
                              कागजात अनुमोदन गर्नुहोस्
                            </div>
                          </div>
                        </ModalComponent>
                      )}

                    <ModalComponent
                      className="inline-flex relative block text-sm font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow"
                      icon={
                        <div className="flex items-center">
                          <p>कागजात हेर्नुहोस्</p>
                          {data.info_receiver_status === "completed" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 ml-2"
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
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 ml-2"
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
                          )}
                        </div>
                      }
                    >
                      <div className="md:grid md:grid-cols-1 md:gap-6  w-[50vw]">
                        <div className="md:mt-0 md:col-span-2">
                          {data.main_doc_type == "pdf" ||
                          data.main_doc_type == "csv" ||
                          data.main_doc_type == "xls" ||
                          data.main_doc_type == "xlsx" ? (
                            <iframe
                              className="w-full h-[40rem]"
                              src={
                                data.information_url + "/" + data.main_doc_path
                              }
                              title={data.title}
                            />
                          ) : (
                            <img
                              src={
                                data.information_url + "/" + data.main_doc_path
                              }
                            />
                          )}
                        </div>
                      </div>
                    </ModalComponent>
                  </div>
                  {data.info_receiver_status === "processing" &&
                    data.receiver_main_doc_path !== null && (
                      <p className="mt-2">
                        तपाईंले अपलोड गर्नुभएको कागजात स्वीकृत हुन बाँकी छ *
                      </p>
                    )}
                  {data.info_receiver_status === "completed" &&
                    data.receiver_main_doc_path !== null && (
                      <p className="mt-2">यो कागजात स्वीकृत भएको छ *</p>
                    )}
                </div>
              )
            ) : (
              ""
            )}
          </div>
          <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
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
            {changeIndexToNepali(data.start_date)}{" "}
            {data.submission_date !== null &&
              `देखि ${changeIndexToNepali(data.submission_date)} सम्म`}
          </div>
          <p className="text-gray-600 text-base mt-2 flex py-1">
            <span className="text-gray-600 text-base font-semibold mb-2 block">
              जारी गरिएका निकायहरु:‎‎‎‎‏‏‎ ‎
            </span>
            {data.agency_type === "ministry_office" ? (
              <p>
                मन्त्रालयको कार्यालय:‏‏‎ ‎
                {data.count_summary &&
                  changeIndexToNepali(data.count_summary.office_count)}
              </p>
            ) : data.agency_type === "local_government" ? (
              <p>
                स्थानीय तह:‏‏‎ ‎
                {data.count_summary &&
                  changeIndexToNepali(data.count_summary.lg_count)}
              </p>
            ) : (
              <p>
                मन्त्रालय:‏‏‎ ‎
                {data.count_summary &&
                  changeIndexToNepali(data.count_summary.ministry_count)}
              </p>
            )}
          </p>
          <p className="text-gray-600 text-base mt-2 flex py-1">
            {data.description}
          </p>
        </div>
        <div className="divide-y">
          <div className="mb-5">
            <h3 className="text-gray-900 mt-4 text-xl font-semibold tracking-tight">
              मुख्य कागजात
            </h3>
            <div className="mt-4 items-center inline-flex relative block text-base font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
              <div className="document-file">
                <span className="file">
                  <a
                    className="text-sm"
                    href={data.information_url + "/" + data.main_doc_path}
                    type="application/pdf; length=328774"
                    target="_blank"
                  >
                    {data.main_doc}
                  </a>
                </span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-12">
              <div className="px-4 lg:px-0 mt-5 text-gray-700 text-lg leading-relaxed w-full lg:w-4/4">
                {data.main_doc_type === "pdf" ||
                data.main_doc_type == "pdf" ||
                data.main_doc_type == "csv" ||
                data.main_doc_type == "xls" ||
                data.main_doc_type == "xlsx" ? (
                  <iframe
                    className="w-full h-[40rem]"
                    src={data.information_url + "/" + data.main_doc_path}
                    title="स्थानीय वन ऐनका लागि नमूना वन विधेयक मस्यौदाका आधारहरु"
                  />
                ) : (
                  <img src={data.information_url + "/" + data.main_doc_path} />
                )}
              </div>
            </div>
          </div>
          {data.supporting_doc !== null && (
            <div className="mb-5">
              <h3 className="text-gray-900 mt-4 text-xl font-semibold tracking-tight">
                थप कागजात
              </h3>
              <div className="mt-4 items-center inline-flex relative block text-base font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
                <div className="document-file">
                  <span className="file">
                    <a
                      className="text-sm"
                      href={data.information_url + "/" + data.supporting_doc}
                      type="application/pdf; length=328774"
                      target="_blank"
                    >
                      {data.supporting_doc}
                    </a>
                  </span>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:space-x-12">
                <div className="px-4 lg:px-0 mt-5 text-gray-700 text-lg leading-relaxed w-full lg:w-4/4">
                  {data.supporting_doc_type === "pdf" ||
                  data.main_doc_type == "pdf" ||
                  data.main_doc_type == "csv" ||
                  data.main_doc_type == "xls" ||
                  data.main_doc_type == "xlsx" ? (
                    <iframe
                      className="w-full h-[40rem]"
                      src={
                        data.information_url + "/" + data.supporting_doc_path
                      }
                      title="स्थानीय वन ऐनका लागि नमूना वन विधेयक मस्यौदाका आधारहरु"
                    />
                  ) : (
                    <img
                      src={
                        data.information_url + "/" + data.supporting_doc_path
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="divide-y">
          <h3 class="text-gray-900 mt-4 text-xl font-semibold tracking-tight mb-2">
            टिप्पणीहरूको सूची:
          </h3>
          {data.comments && data.comments.length === 0 ? (
            <p className="py-4">कुनै टिप्पणी गरिएको छैन...</p>
          ) : (
            data.comments &&
            data.comments.map((item) => (
              <SingleComment creator={data.creator} data={item} />
            ))
          )}
        </div>
        <div>
          {roleId != 2 && (
            <from className="pb-8 mt-5 bg-indigo-lightest p-2 border-t border-grey-darkest border-solid">
              <div>
                <h3 class="text-gray-900 mt-4 text-xl font-semibold tracking-tight mb-2">
                  सवाल जवाफ / जिज्ञासाहरु :
                </h3>
                <label>
                  <strong>तपाईको प्रतिकृया:*</strong>
                  <br />
                  <span>
                    पत्र हेरिएको जानकारी मन्त्रालयमा भईसकेको छ, कुनै जिज्ञासा
                    भएमा मात्र प्रतिकृया राख्नहुन अनुरोध छ ।
                  </span>
                </label>
              </div>
              <textarea
                id="message"
                rows={4}
                {...bindText}
                className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="वर्णन लेख्नुहोस्..."
                defaultValue={""}
              />
              <button
                type="submit"
                onClick={() => postData()}
                className="flex my-2 text-white bg-[#276fb9] hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                टिप्पणी (Comment) पेश गर्नुहोस
              </button>
            </from>
          )}
        </div>
      </div>
    </section>
  );
}
