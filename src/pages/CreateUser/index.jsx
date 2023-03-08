import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import DashboardTable from "../../components/DashboardTable";
import {
  getDistrict,
  getLgByDistrict,
  createUserLg,
  createUserMinistry,
  getUserListLg,
  getUserListMinistry,
  getOfficeUserList,
  createUserOffice,
  getOfficeList,
} from "../../api";
import { Link } from "react-router-dom";
import UseInput from "../../utils/UseInput";
import UserTable from "../../components/UserTable";
import { useStateValue } from "../../utils/StateProvider";
import ModalComponent from "../../components/ModalComponent";
import { t } from "i18next";

function CreateUser(props) {
  const [{}, dispatch] = useStateValue();
  const [roleId, setRoleId] = useState("0");
  const [officeId, setOfficeId] = useState();
  const [lgUserData, setLgUser] = useState();
  const [officeList, setOffice] = useState();
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  // Input Bind

  const { value: firstName, bind: bindFname, reset: resetFname } = UseInput("");
  const { value: email, bind: bindEmail, reset: resetEmail } = UseInput("");
  const {
    value: address,
    bind: bindAddress,
    reset: resetAddress,
  } = UseInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = UseInput("");
  const {
    value: passwordConfirm,
    bind: bindPasswordConfirm,
    reset: resetPasswordConfirm,
  } = UseInput("");
  const { value: phone, bind: bindPhone, reset: resetPhone } = UseInput("");

  // Post Form Data

  const postData = async (e) => {
    e.preventDefault();
    if (
      JSON.parse(localStorage.getItem("userData")).type === "local_government"
    ) {
      let dataToPost = {
        first_name: firstName,
        email: email,
        password: password,
        password_confirmation: password,
        status: 1,
        addresss: address,
        phone_no: phone,
        role_id: roleId,
        user_type: JSON.parse(localStorage.getItem("userData")).type,
        lg_id: JSON.parse(localStorage.getItem("userData")).lg_id,
      };
      let response = await createUserLg(dataToPost);
      if (response) {
        window.location.reload();
      }
    } else if (
      JSON.parse(localStorage.getItem("userData")).type === "ministry"
    ) {
      let dataToPost = {
        first_name: firstName,
        email: email,
        password: password,
        password_confirmation: password,
        status: 1,
        addresss: address,
        office_id: officeId,
        phone_no: phone,
        role_id: roleId,
        user_type:
          roleId == 5
            ? "ministry_office"
            : JSON.parse(localStorage.getItem("userData")).type,
        ministry_id: JSON.parse(localStorage.getItem("userData")).ministry_id,
      };
      let response = await createUserMinistry(dataToPost);
      if (response) {
        window.location.reload();
      }
    } else {
      let dataToPost = {
        first_name: firstName,
        email: email,
        password: password,
        password_confirmation: password,
        status: 1,
        addresss: address,
        phone_no: phone,
        role_id: roleId,
        user_type: "ministry_office",
        office_id: JSON.parse(localStorage.getItem("userData")).office_id,
      };
      let response = await createUserOffice(dataToPost);
      if (response) {
        window.location.reload();
      }
    }
  };

  // Roles

  let defaultRole = [];
  if (
    JSON.parse(localStorage.getItem("userData")).type === "local_government"
  ) {
    defaultRole = [
      { name: "प्रमुख प्रशासनिक अधिकारी", id: 9 },
      { name: "सूचना अधिकारी", id: 10 },
    ];
  } else if (JSON.parse(localStorage.getItem("userData")).type === "ministry") {
    defaultRole = [
      { name: "मन्त्रालयको कार्यालय प्रशासक", id: 5 },
      { name: "सूचना अधिकारी", id: 3 },
      { name: "मन्त्रालयको प्रयोगकर्ता", id: 4 },
    ];
  } else {
    defaultRole = [
      { name: "मन्त्रालयको कार्यालय प्रमुख प्रशासनिक अधिकारी", id: 6 },
      { name: "मन्त्रालयको कार्यालयका अधिकारी", id: 7 },
    ];
  }

  // Validations

  const ConfirmPassword = () => {
    if (password !== passwordConfirm) {
      setError(true);
    } else if (password == passwordConfirm || password.length === 0) {
      setError(false);
    }
  };

  // API functions

  useEffect(() => {
    const getLgUserData = async () => {
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      let userData = await getUserListLg(token);
      setLgUser(userData.data);
      if (userData || userData === "error") {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    const getMinistryUserData = async () => {
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      let userData = await getUserListMinistry(token);
      setLgUser(userData.data);
      if (userData || userData === "error") {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    const getOfficeListToCreate = async () => {
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      let userData = await getOfficeList(token);
      setOffice(userData.data);
      if (userData || userData === "error") {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    const getOfficesList = async () => {
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      let userData = await getOfficeUserList(token);
      setLgUser(userData.data);
      if (userData || userData === "error") {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    if (
      JSON.parse(localStorage.getItem("userData")).type === "local_government"
    ) {
      getLgUserData();
    } else if (
      JSON.parse(localStorage.getItem("userData")).type === "ministry"
    ) {
      getMinistryUserData();
      getOfficeListToCreate();
    } else {
      getOfficesList();
    }
  }, []);
  useEffect(() => {
    ConfirmPassword();
  }, [passwordConfirm]);

  // On page Functions

  const handleSelectRole = (e) => {
    setRoleId(e.target.value);
    console.log(e.target.value);
  };
  const handleSelectOffice = (e) => {
    setOfficeId(e.target.value);
  };
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-gray-900 text-2xl font-extrabold tracking-tight mb-2">
        प्रयोगकर्ताहरू
      </h1>
      <nav className="flex justify-between" aria-label="Breadcrumb">
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
                प्रयोगकर्ता सिर्जना गर्नुहोस्
              </a>
            </div>
          </li>
        </ol>
        <ModalComponent buttonName={"प्रयोगकर्ता सिर्जना गर्नुहोस्"}>
          <div className="md:grid md:grid-cols-1 md:gap-6">
            <div className="md:mt-0 md:col-span-2">
              <form onSubmit={postData} autocomplete="off">
                <div className="overflow-scroll w-[50vw] sm:rounded-md p-4">
                  <div className="px-2 py-2 bg-white">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          प्रयोगकर्ताको नाम
                        </label>
                        <input
                          {...bindFname}
                          type="text"
                          required
                          name="firstName"
                          id="first-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="new-email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          {...bindEmail}
                          required
                          type="email"
                          name="new-email-address"
                          id="new-email-address"
                          autoComplete="new-email-address"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="phone-number"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone number
                        </label>
                        <input
                          {...bindPhone}
                          type="tel"
                          name="phone-number"
                          id="phone-number"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="phone-number"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ठेगाना
                        </label>
                        <input
                          {...bindAddress}
                          type="tel"
                          name="phone-number"
                          id="phone-number"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div
                        className={
                          JSON.parse(localStorage.getItem("userData")).type ===
                          "ministry"
                            ? "col-span-6 sm:col-span-3"
                            : "col-span-6 sm:col-span-6"
                        }
                      >
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          प्रयोगकर्ताको भूमिका चयन गर्नुहोस्
                        </label>
                        <select
                          className="form-select mt-1 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200"
                          onChange={handleSelectRole}
                          required
                        >
                          <option value="">भूमिका चयन गर्नुहोस्</option>
                          {true &&
                            defaultRole.map((value) => (
                              <option value={value.id}>{value.name}</option>
                            ))}
                        </select>
                      </div>
                      {JSON.parse(localStorage.getItem("userData")).type ===
                        "ministry" && (
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700"
                          >
                            प्रयोगकर्ताको कार्यालय चयन गर्नुहोस्
                          </label>
                          <select
                            className="form-select mt-1 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200"
                            onChange={handleSelectOffice}
                            required
                            disabled={roleId != 5 ? "disabled" : ""}
                          >
                            <option value="">प्कार्यालय चयन गर्नुहोस्</option>
                            {officeList &&
                              officeList.map((value) => (
                                <option value={value.id}>{value.name}</option>
                              ))}
                          </select>
                        </div>
                      )}
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="new-password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          प्रयोगकर्ताको पासवर्ड
                        </label>
                        <input
                          {...bindPassword}
                          type="password"
                          required
                          name="new-password"
                          id="new-password"
                          autocomplete="new-password"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="confirm-password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          पासवर्ड सुनिश्चित गर्नुहोस
                          <span className="text-xs text-red-500 ml-1">
                            {error ? "Password dosen't match*" : ""}
                          </span>
                        </label>
                        <input
                          {...bindPasswordConfirm}
                          type="password"
                          required
                          name="confirm-password"
                          id="confirm-password"
                          className={
                            error
                              ? "mt-1 focus:ring-red-500 ring-red-500 focus:border-red-500 border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              : "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex relative block text-sm font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow"
                    >
                      सिर्जना गर्नुहोस्
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ModalComponent>
      </nav>
      <section className="mt-5">
        <Card padding="true" title={"प्रयोगकर्ताहरूको सूची"}>
          {lgUserData && <UserTable comments={lgUserData} />}
        </Card>
      </section>
    </div>
  );
}

export default CreateUser;
