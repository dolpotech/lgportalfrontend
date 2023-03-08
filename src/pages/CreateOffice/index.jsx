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
  getMinistry,
  createOffice,
  getOfficeList,
} from "../../api";
import { Link } from "react-router-dom";
import UseInput from "../../utils/UseInput";
import UserTable from "../../components/UserTable";
import { useStateValue } from "../../utils/StateProvider";
import ModalComponent from "../../components/ModalComponent";
import { t } from "i18next";
import OfficeTable from "../../components/OfficeTable";

function CreateOffice(props) {
  const [{ updateLoading }, dispatch] = useStateValue();
  const [roleId, setRoleId] = useState();
  const [lgUserData, setLgUser] = useState();
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
  const { value: phone, bind: bindPhone, reset: resetPhone } = UseInput("");

  // Post Form Data

  const postData = async (e) => {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem("userData")).type === "ministry") {
      let dataToPost = {
        name: firstName,
        email: email,
        address: address,
        phone_no: phone,
      };
      let response = await createOffice(dataToPost);
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
      { name: "CAO Palika", id: 6 },
      { name: "Information Officer", id: 7 },
    ];
  } else {
    defaultRole = [
      { name: "User", id: 4 },
      { name: "Information Officer", id: 3 },
    ];
  }

  // Validations

  // API functions

  useEffect(() => {
    const getMinistryUserData = async () => {
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      let userData = await getOfficeList(token);
      setLgUser(userData.data);
      if (userData || userData === "error") {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    if (JSON.parse(localStorage.getItem("userData")).type === "ministry") {
      getMinistryUserData();
    }
  }, [updateLoading]);

  // On page Functions

  const handleSelectRole = (e) => {
    setRoleId(e.target.value);
  };
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-gray-900 text-2xl font-extrabold tracking-tight mb-2">
        कार्यालय
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
                कार्यालय
              </a>
            </div>
          </li>
        </ol>
        <ModalComponent buttonName={"कार्यालयहरू सिर्जना गर्नुहोस्"}>
          <div className="md:grid md:grid-cols-1 md:gap-6  w-[50vw]">
            <div className="md:mt-0 md:col-span-2">
              <form onSubmit={postData} autocomplete="off">
                <div className="overflow-hidden sm:rounded-md p-4">
                  <div className="px-2 py-2 bg-white">
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          कार्यालयको नाम
                        </label>
                        <input
                          {...bindFname}
                          type="text"
                          required
                          name="name"
                          id="name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="new-email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          कार्यालय इमेल
                        </label>
                        <input
                          {...bindEmail}
                          required
                          type="email"
                          name="new-email-address"
                          id="new-email-address"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="phone-number"
                          className="block text-sm font-medium text-gray-700"
                        >
                          कार्यालयको फोन नम्बर
                        </label>
                        <input
                          {...bindPhone}
                          type="number"
                          name="phone-number"
                          id="phone-number"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          कार्यालयको ठेगाना
                        </label>
                        <input
                          {...bindAddress}
                          type="text"
                          required
                          name="address"
                          id="address"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex relative block text-sm font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ModalComponent>
      </nav>
      <section className="mt-5">
        <Card padding="true" title={"कार्यालयहरूको सूची"}>
          {lgUserData && <OfficeTable comments={lgUserData} />}
        </Card>
      </section>
    </div>
  );
}

export default CreateOffice;
