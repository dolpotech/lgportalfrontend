import React, { useState, useEffect, useRef } from "react";
import Card from "../../components/Card";
import DashboardTable from "../../components/DashboardTable";
import NepalMap from "../../components/NepalMap";
import { Link, useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import {
  getLgByDistrict,
  getDistrict,
  postInfoCollection,
  getMinistry,
  getTemplateList,
  getMinistryOffice,
} from "../../api";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";

import MultipleSelect from "./MultipleSelect";
import UseInput from "../../utils/UseInput";
import { useStateValue } from "../../utils/StateProvider";
import { useTranslation } from "react-i18next";
import { data } from "autoprefixer";

function InfoCollection(props) {
  let navigate = useNavigate();
  const [{}, dispatch] = useStateValue();
  const { t } = useTranslation();
  const multiselectRef = useRef(null);
  const [districts, setDistricts] = useState();
  const [lg, setLg] = useState();
  const [districtId, setDistrictId] = useState();
  const [ministryId, setMinistryId] = useState();
  const [type, setType] = useState("ministry_office");
  const [selectedAgency, setSelectedAgency] = useState([]);
  const [ministry, setMinistry] = useState();
  const [ministryForOffice, setMinistryForOffice] = useState();
  const [template, setTemplate] = useState();
  const [templateType, setTemplateType] = useState();
  const [templateId, setTemplateId] = useState("");
  const [priority, setPriority] = useState();
  const [selectedFile, setFile] = useState();
  const [selectedFile2, setFile2] = useState("");
  const [officeList, setOfficeList] = useState();
  const [selectAllLgs, setSelectAllLgs] = useState(true);
  const [selectAllOffices, setSelectAllOffices] = useState(true);
  const [selectByDistrict, setSelectByDistrict] = useState(true);
  const [selectByMinistry, setSelectByMinistry] = useState(true);
  const [selectAllMinistry, setSelectAllMinistry] = useState(true);
  const [sendSms, setSendSms] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  const [nepaliDate, setNepaliDate] = useState("");
  const [nepaliDateEnd, setNepaliDateEnd] = useState("");

  const token = localStorage.getItem("token").replace(/['"]+/g, "");

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  // Form Inputs
  const { value: title, bind: bindTitle, reset: resetTitle } = UseInput("");

  const { value: desc, bind: bindDesc, reset: resetDesc } = UseInput("");

  let loggedInMinistryId = JSON.parse(
    localStorage.getItem("userData")
  ).ministry_id;

  var formData = new FormData();
  formData.append("title", title);
  formData.append("type", templateType);
  if (templateId !== "") {
    formData.append("template_id", templateId);
  }
  formData.append("main_doc", selectedFile);
  formData.append("start_date", nepaliDate);
  if (selectedFile2 !== "") {
    formData.append("supporting_doc", selectedFile2);
  }
  formData.append("description", desc);
  formData.append("priority", priority);
  formData.append("submission_date", nepaliDateEnd);
  formData.append("document_type[0]", "jpg");
  formData.append("document_type[1]", "pdf");
  formData.append("document_type[2]", "png");
  formData.append("document_type[3]", "jpeg");
  formData.append("document_type[4]", "xls");
  formData.append("document_type[5]", "gif");
  formData.append("document_type[6]", "xlsx");
  formData.append("document_type[7]", "csv");
  formData.append("province_id", 5);
  formData.append("to_sms", sendSms ? 1 : 0);
  formData.append("to_mail", sendMail ? 1 : 0);
  if (selectAllLgs === false) {
    formData.append("select_all", "lg_by_province");
    formData.append("province_id", 5);
  }
  if (selectAllOffices === false) {
    formData.append("select_all", "ministry_office_by_province");
    formData.append("province_id", 5);
  }
  if (selectByDistrict === false) {
    formData.append("select_all", "lg_by_district");
    formData.append("district_id", districtId);
  }
  if (selectByMinistry === false) {
    formData.append("select_all", "ministry_office_by_ministry");
    formData.append("ministry_id", ministryId);
  }
  if (selectAllMinistry === false) {
    formData.append("select_all", "ministry_by_province");
    formData.append("ministry_id", ministryId);
  }
  if (type === "ministry_office") {
    for (var i = 0; i < selectedAgency.length; i++) {
      formData.append(`ministry_ids[${i}]`, selectedAgency[i]);
    }
  }
  if (type === "ministry") {
    for (var i = 0; i < selectedAgency.length; i++) {
      formData.append(`ministry_office_ids[${i}]`, selectedAgency[i]);
    }
  }
  if (type === "local_government") {
    for (var i = 0; i < selectedAgency.length; i++) {
      formData.append(`lg_ids[${i}]`, selectedAgency[i]);
    }
  }
  const handleSlectAllLgs = () => {
    setSelectAllLgs(!selectAllLgs);
  };
  const handleSetSms = () => {
    setSendSms(!sendSms);
  };
  const handleSetMail = () => {
    setSendMail(!sendMail);
  };
  const handleSlectAllOffices = () => {
    setSelectAllOffices(!selectAllOffices);
  };
  const handleSlectByDistrict = () => {
    setSelectByDistrict(!selectByDistrict);
  };
  const handleSlectAllMinistries = () => {
    setSelectAllMinistry(!selectAllMinistry);
  };
  const handleSlectByMinistry = () => {
    setSelectByMinistry(!selectByMinistry);
  };
  const handleSelectDistrict = async (e) => {
    setLg(await getLgByDistrict(e.target.value));
    setDistrictId(e.target.value);
  };
  const handleMinistryChange = async (e) => {
    let officeData = await getMinistryOffice(e.target.value);
    setOfficeList(officeData.data);
    setMinistryId(e.target.value);
  };

  const handleSubmitInfo = async (e) => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    e.preventDefault();
    let userData = await postInfoCollection(formData);
    if (userData) {
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
      // window.location.reload();
      navigate(`/information-collection-detail/${userData.data.id}`);
    }
    if (userData === "error") {
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
  };
  const resetValues = async () => {
    await multiselectRef.current.resetSelectedValues();
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedAgency([]);
    let newSelectedList = [];
    selectedList.map((item) => newSelectedList.push(item.id));
    setSelectedAgency(newSelectedList);
    console.log(newSelectedList);
  };
  const onSelect2 = (selectedList, selectedItem) => {
    setSelectedAgency([]);
    let newSelectedList = [];
    selectedList.map((item) => newSelectedList.push(item.id));
    setSelectedAgency(newSelectedList);
    console.log(selectedAgency);
  };
  const onSelect3 = (selectedList, selectedItem) => {
    setSelectedAgency([]);
    let newSelectedList = [];
    selectedList.map((item) => newSelectedList.push(item.id));
    setSelectedAgency(newSelectedList);
    console.log(selectedAgency);
  };
  const handleTypeChange = (e) => {
    setTemplateType(e.target.value);
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const handleSelectType = (e) => {
    resetValues();
    if (e.target.value === "local_government") {
      setSelectAllOffices(true);
    }
    if (e.target.value === "ministry") {
      setSelectAllLgs(true);
    }
    setType(e.target.value);
  };
  const handleTemplateChange = (e) => {
    setTemplateId(e.target.value);
  };
  const handleSelectFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSelectFile2 = (e) => {
    setFile2(e.target.files[0]);
  };
  useEffect(() => {
    // const getMinistryDefault = async () => {
    //   let officeData = await getMinistryOffice(loggedInMinistryId);
    //   setOfficeList(officeData.data);
    //   setMinistryId(loggedInMinistryId);
    // };
    // getMinistryDefault();
    const getData = async () => {
      let districtData = await getDistrict();
      setDistricts(districtData.data);
    };
    getData();

    const getTemplate = async () => {
      let templateData = await getTemplateList(token);
      setTemplate(templateData.data);
    };
    getTemplate();

    const getMinistyList = async () => {
      let ministryData = await getMinistry();
      const indexOfObject = ministryData.data.findIndex((object) => {
        return object.id === loggedInMinistryId;
      });

      ministryData.data.splice(indexOfObject, 1);
      setMinistry(ministryData.data);
    };
    const getMinistyListForOffice = async () => {
      let ministryData = await getMinistry();

      setMinistryForOffice(ministryData.data);
    };
    getMinistyListForOffice();
    getMinistyList();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="order-1 text-gray-700 text-2xl font-extrabold tracking-tight mb-2">
        नयाँ सूचना संग्रह सिर्जना गर्नुहोस्
      </h1>
      <nav className="flex" aria-label="Breadcrumb">
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
                नयाँ सूचना संग्रह
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <Card className="mt-5" title="विवरण">
        <form onSubmit={handleSubmitInfo}>
          <div className="overflow-hidden sm:rounded-md">
            <div className="px-2 py-2 bg-white">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    सुचनाको शिर्षक
                  </label>
                  <input
                    type="text"
                    required
                    name="title"
                    {...bindTitle}
                    id="title"
                    placeholder="जानकारी शीर्षक प्रविष्ट गर्नुहोस्"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    for="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    सम्प्रेषणको प्रकार चयन गर्नुहोस्
                  </label>
                  <select
                    id="countries"
                    required
                    onChange={handleTypeChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">सम्प्रेषणको प्रकार चयन गर्नुहोस्</option>
                    <option value="circular">जानकारी</option>
                    <option value="invitational">पत्रचार</option>
                    <option value="information_collection">सूचना संकलन</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label
                    for="priority"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    प्राथमिकता चयन गर्नुहोस्
                  </label>
                  <select
                    id="priority"
                    required
                    onChange={handlePriorityChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">प्राथमिकता चयन गर्नुहोस्</option>
                    <option value="medium">मध्यम</option>
                    <option value="high">उच्च</option>
                  </select>
                </div>
                {(templateType === "information_collection" ||
                  templateType === "invitational") && (
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      for="start_date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      सुरु मिति चयन गर्नुहोस्
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>

                      <NepaliDatePicker
                        required={true}
                        inputClassName="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                        onChange={(value) => setNepaliDate(value)}
                        options={{ calenderLocale: "ne" }}
                      />
                    </div>
                  </div>
                )}
                {(templateType === "information_collection" ||
                  templateType === "invitational") && (
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      for="end_date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      आन्तिम मिति चयन गर्नुहोस्
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <NepaliDatePicker
                        inputClassName="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                        onChange={(value) => setNepaliDateEnd(value)}
                        options={{ calenderLocale: "ne" }}
                      />
                    </div>
                  </div>
                )}
                {templateType === "information_collection" && (
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      for="template"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      सूचना संकलनको टेम्प्लेट चयन गर्नुहोस्
                    </label>
                    <select
                      id="template"
                      onChange={handleTemplateChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled={
                        templateType === "information_collection" ? false : true
                      }
                      required
                    >
                      <option value="">
                        सूचना संकलनको टेम्प्लेट चयन गर्नुहोस्
                      </option>
                      {template &&
                        template.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                    </select>
                  </div>
                )}
                <div className="mt-2 col-span-6 sm:col-span-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    for="main_doc"
                  >
                    मुख्य कागजात
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="main_doc"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg,application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .csv"
                    required
                    onChange={handleSelectFile}
                  />
                  <div
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="user_avatar_help"
                  >
                    मुख्य कागजात चयन गर्नुहोस् (पत्र)
                  </div>
                </div>

                <div className="mt-2 col-span-6 sm:col-span-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    for="sup_doc"
                  >
                    थप कागजात
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="sup_doc"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg,application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .csv"
                    onChange={handleSelectFile2}
                  />
                  <div
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="user_avatar_help"
                  >
                    थप कागजात चयन गर्नुहोस् (Supporting Document)
                  </div>
                </div>
              </div>
              <div className="col-span-12 mt-6 sm:col-span-12">
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    विवरण
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...bindDesc}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="वर्णन लेख्नुहोस्..."
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6">
                <div className="mt-6 col-span-6 sm:col-span-12">
                  <label
                    for="destination-min-office"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    पत्रचार गर्ने निकाय छनौट गर्नुहोस
                  </label>
                  <select
                    onChange={handleSelectType}
                    id="destination-min-office"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="ministry_office">मन्त्रालयतह</option>
                    <option value="ministry">
                      मन्त्रालय अन्तर्गतका कार्यालयहरु
                    </option>
                    <option value="local_government">स्थानीयतह </option>
                  </select>
                </div>
                {type == "ministry_office" && (
                  <div className="col-span-6 sm:col-span-12 flex">
                    <div className="flex items-center h-5">
                      <input
                        id="selectMinistry"
                        name="selectMinistry"
                        type="checkbox"
                        onChange={handleSlectAllMinistries}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="selectMinistry"
                        className="font-medium text-gray-700"
                      >
                        सबै मन्त्रालयहरु कार्यालयहरुमा पठाउनुहोस
                      </label>
                    </div>
                  </div>
                )}
                {type == "local_government" && (
                  <div className="col-span-6 sm:col-span-12 flex">
                    <div className="flex items-center h-5">
                      <input
                        id="selectLgs"
                        name="selectLgs"
                        type="checkbox"
                        onChange={handleSlectAllLgs}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="selectLgs"
                        className="font-medium text-gray-700"
                      >
                        सबै स्थानीय तहहरुमा पठाउनुहोस
                      </label>
                    </div>
                  </div>
                )}

                {type == "ministry" && (
                  <div className="col-span-6 sm:col-span-12 flex">
                    <div className="flex items-center h-5">
                      <input
                        id="selectMinistry"
                        name="selectMinistry"
                        type="checkbox"
                        onChange={handleSlectAllOffices}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="selectMinistry"
                        className="font-medium text-gray-700"
                      >
                        सबै मन्त्रालयहरु कार्यालयहरुमा पठाउनुहोस
                      </label>
                    </div>
                  </div>
                )}
                {selectAllMinistry && type == "ministry_office" && (
                  <div className="col-span-12">
                    {selectAllMinistry && (
                      <div className=" col-span-6 sm:col-span-3">
                        <label
                          for="minstry"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                        >
                          मन्त्रालयहरु
                        </label>
                        <Multiselect
                          id="minstry"
                          onSelect={onSelect3}
                          ref={multiselectRef}
                          options={ministry} // Options to display in the dropdown
                          displayValue="name" // Property name to display in the dropdown options
                        />
                      </div>
                    )}
                  </div>
                )}
                {selectAllLgs && type == "local_government" && (
                  <div className="col-span-12">
                    <div className="mt-2 col-span-6 sm:col-span-3">
                      <label
                        for="district"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        जिल्ला चयन गर्नुहोस्
                      </label>
                      <select
                        id="district"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleSelectDistrict}
                        required
                      >
                        <option value="">जिल्ला चयन गर्नुहोस्</option>
                        {districts &&
                          districts.map((value, i) => (
                            <option value={value.id}>{value.name}</option>
                          ))}
                      </select>
                    </div>
                    {type == "local_government" && (
                      <div className="col-span-6 mt-2 sm:col-span-12 flex">
                        <div className="flex items-center h-5">
                          <input
                            id="selectMinistry"
                            name="selectMinistry"
                            type="checkbox"
                            onChange={handleSlectByDistrict}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="selectMinistry"
                            className="font-medium text-gray-700"
                          >
                            जिल्लाका सबै स्थानीय तहहरुमा पठाउनुहोस
                          </label>
                        </div>
                      </div>
                    )}
                    {selectByDistrict && (
                      <div className="mt-6 col-span-6 sm:col-span-3">
                        <label
                          for="lg"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                        >
                          स्थानीय तह चयन गर्नुहोस्
                        </label>
                        <Multiselect
                          onSelect={onSelect2}
                          id="lg"
                          ref={multiselectRef}
                          options={lg} // Options to display in the dropdown
                          displayValue="name" // Property name to display in the dropdown options
                        />
                      </div>
                    )}
                  </div>
                )}
                {selectAllOffices && type == "ministry" && (
                  <div className="col-span-12">
                    <div className="mt-2 col-span-6 sm:col-span-3">
                      <label
                        for="district"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        मन्त्रालय चयन गर्नुहोस्
                      </label>
                      <select
                        id="district"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleMinistryChange}
                        required
                      >
                        <option value="">मन्त्रालय चयन गर्नुहोस्</option>
                        {ministryForOffice &&
                          ministryForOffice.map((value, i) => (
                            <option value={value.id}>{value.name}</option>
                          ))}
                      </select>
                    </div>
                    {type == "ministry" && (
                      <div className="col-span-6 mt-2 sm:col-span-12 flex">
                        <div className="flex items-center h-5">
                          <input
                            id="selectMinistry"
                            name="selectMinistry"
                            type="checkbox"
                            onChange={handleSlectByMinistry}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="selectMinistry"
                            className="font-medium text-gray-700"
                          >
                            सबै मन्त्रालयहरु कार्यालयहरुमा पठाउनुहोस
                          </label>
                        </div>
                      </div>
                    )}
                    {selectByMinistry && (
                      <div className="mt-6 col-span-6 sm:col-span-3">
                        <label
                          for="minstry"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                        >
                          मन्त्रालय अन्तर्गतका कार्यालयहरु
                        </label>
                        <Multiselect
                          id="minstry"
                          onSelect={onSelect}
                          ref={multiselectRef}
                          options={officeList} // Options to display in the dropdown
                          displayValue="name" // Property name to display in the dropdown options
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="px-4 py-3 bg-white space-y-6">
              <fieldset>
                <legend className="sr-only">
                  जानकारी दिने माध्यमहरु चयन गर्नुहोस
                </legend>
                <div
                  className="text-sm font-medium text-gray-900"
                  aria-hidden="true"
                >
                  जानकारी दिने माध्यमहरु चयन गर्नुहोस
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        onClick={handleSetMail}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                      >
                        एस.एम.एस द्वारा
                      </label>
                      <p className="text-gray-500">
                        तोकिएको निकायहरुलाई एसएमएस द्वारा सूचित गरिनेछ
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        onClick={handleSetMail}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-700"
                      >
                        इमेल बाट
                      </label>
                      <p className="text-gray-500">
                        तोकिएको निकायहरुलाई इमेलद्वारा सूचित गरिनेछ
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex relative block text-sm font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow"
              >
                पठाउनुहोस | Send
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex items-center rotate-90 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default InfoCollection;
