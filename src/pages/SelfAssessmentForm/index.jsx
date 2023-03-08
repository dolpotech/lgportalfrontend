import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import {
  getAssessmentData,
  postAssessmentForm,
  approveInformationCollection,
  getAssessmentDataOffice,
  getAssessmentDataMinistry,
} from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";
import { useTranslation } from "react-i18next";
import SingleQuestion from "../../components/SingleQuestion";
import ModalComponent from "../../components/ModalComponent";

export default function SelfAssessmentForm() {
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [{ loading, recall }, dispatch] = useStateValue();
  const { information_id } = useParams();
  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  const userType = JSON.parse(localStorage.getItem("userData")).type;
  let roleId = "";
  if (localStorage.getItem("userData")) {
    roleId = JSON.parse(localStorage.getItem("userData")).roles.map(
      (item) => item.pivot.role_id
    );
  }
  const postData = async (id, answer) => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    let dataToPost = {
      info_receiver_id: information_id,
      field_id: id,
      answer: answer,
    };
    let response = await postAssessmentForm(dataToPost, token);
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
  const approveData = async (id, answer) => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    let dataToPost = {
      info_receiver_id: information_id,
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
    console.log(userType);
    const getData = async () => {
      dispatch({
        type: "SET_RECALL",
        item: false,
      });
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      let data = await getAssessmentData(information_id, token);
      await setData(data.data);

      if (data) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    const getOfficeData = async () => {
      dispatch({
        type: "SET_RECALL",
        item: false,
      });
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      let data = await getAssessmentDataOffice(information_id, token);
      await setData(data.data);
      if (data) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    const getMinistryData = async () => {
      dispatch({
        type: "SET_RECALL",
        item: false,
      });
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      let data = await getAssessmentDataMinistry(information_id, token);
      await setData(data.data);
      if (data) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    if (userType == "ministry_office") {
      getOfficeData();
    } else if (userType == "local_government") {
      getData();
    } else {
      getMinistryData();
    }
  }, [recall]);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between h-auto">
        <div>
          <h1 className="text-gray-900 text-2xl font-extrabold tracking-tight mb-2">
            स्व-मूल्याङ्कन फारम
          </h1>
          <nav className="flex" aria-label="Breadcrumb" className="mb-5">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a
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
                  {t("header_home")}
                </a>
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
                  <Link
                    to="/dashboard"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    {t("dashboard")}
                  </Link>
                </div>
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
                    स्व-मूल्याङ्कन फारम
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        {data && data.info_receiver_status == "processing" && (
          <div>
            {(roleId == 9 || 6 || 3) && (
              <ModalComponent buttonName={" विवरण अनुमोदन गरि पठाउनुहोस"}>
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
                  <div className="mt-4 cursor-pointer items-center inline-flex relative h-max block text-sm font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="document-file">
                      <span className="file">
                        <img
                          className="file-icon"
                          alt="PDF icon"
                          title="application/pdf"
                          src="/modules/file/icons/application-pdf.png"
                        />{" "}
                        <a onClick={() => approveData()}>
                          विवरण अनुमोदन गरि पठाउनुहोस
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </ModalComponent>
            )}
          </div>
        )}
        {data && data.info_receiver_status == "completed" && (
          <p className="p-6 ">यो जानकारी संग्रह स्वीकृत भएको छ*</p>
        )}
      </div>
      <div>
        <div>
          <div>
            <form action="#" method="POST">
              <div className="sm:overflow-hidden">
                <div className="px-1 py-5 bg-white space-y-6">
                  {data &&
                    data.documents.map((item, i = 1) => (
                      <SingleQuestion
                        status={data.info_receiver_status}
                        item={item}
                        i={i + 1}
                      />
                    ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
