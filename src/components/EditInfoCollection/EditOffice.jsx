import React, { useState } from "react";
import ModalComponent from "../ModalComponent";
import UseInput from "../../utils/UseInput";
import { updateOffice } from "../../api";
import { useStateValue } from "../../utils/StateProvider";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";

export default function EditOffice(props) {
  const [{}, dispatch] = useStateValue();
  const {
    value: title,
    bind: bindTitle,
    reset: resetTitle,
  } = UseInput(props.title);

  const {
    value: email,
    bind: bindEmail,
    reset: resetEmail,
  } = UseInput(props.email);
  const {
    value: address,
    bind: bindAddress,
    reset: resetAddress,
  } = UseInput(props.address);
  const {
    value: phone,
    bind: bindPhone,
    reset: resetPhone,
  } = UseInput(props.phone_no);
  var formData = new FormData();
  formData.append("name", title);
  formData.append("email", email);
  formData.append("address", address);
  formData.append("phone_no", phone);
  formData.append("status", props.status);
  formData.append("mo_id", props.mo_id);
  const handleInfoCollectionUpdate = async (e) => {
    dispatch({
      type: "SET_UPDATE_LOADING",
      item: true,
    });
    e.preventDefault();
    let userData = await updateOffice(formData);
    if (userData) {
      dispatch({
        type: "SET_UPDATE_LOADING",
        item: false,
      });
    }
    if (userData === "error") {
      dispatch({
        type: "SET_UPDATE_LOADING",
        item: false,
      });
    }
  };
  return (
    <ModalComponent
      customButton={"true"}
      svg={
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      }
    >
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="md:mt-0 md:col-span-2">
          <form onSubmit={handleInfoCollectionUpdate}>
            <div className=" max-h-[80vh] w-[50vw] p-4 sm:rounded-md">
              <div className="px-2 py-2 bg-white">
                <div className="grid grid-cols-4 gap-6">
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      कार्यालयको नाम
                    </label>
                    <input
                      type="text"
                      required
                      name="title"
                      id="title"
                      defaultValue={props.title}
                      {...bindTitle}
                      placeholder="कार्यालयको नाम"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      कार्यालयको इमेल
                    </label>
                    <input
                      type="email"
                      required
                      name="Email"
                      id="email"
                      defaultValue={props.email}
                      {...bindEmail}
                      placeholder="कार्यालयको इमेल"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      कार्यालयको फोन नं.
                    </label>
                    <input
                      type="number"
                      required
                      name="phone"
                      id="phone"
                      defaultValue={props.phone_no}
                      {...bindPhone}
                      placeholder="कार्यालयको फोन नं."
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      कार्यालयको ठेगाना
                    </label>
                    <input
                      type="text"
                      required
                      name="address"
                      id="address"
                      defaultValue={props.address}
                      {...bindAddress}
                      placeholder="कार्यालयको ठेगाना प्रविष्ट गर्नुहोस्"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex relative block text-sm font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow"
                >
                  डाटा अनुरोध गर्नुहोस्
                </button>
              </div>
            </div>
          </form>{" "}
        </div>
      </div>
    </ModalComponent>
  );
}
