import React, { useState } from "react";
import ModalComponent from "../ModalComponent";
import UseInput from "../../utils/UseInput";
import { updateInfoCollection } from "../../api";
import { useStateValue } from "../../utils/StateProvider";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";

export default function EditInfoCollection(props) {
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const [priority, setPriority] = useState(props.priority);
  const [{}, dispatch] = useStateValue();
  const {
    value: title,
    bind: bindTitle,
    reset: resetTitle,
  } = UseInput(props.title);

  const {
    value: desc,
    bind: bindDesc,
    reset: resetDesc,
  } = UseInput(props.description);
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  var formData = new FormData();
  formData.append("title", title);
  formData.append("description", desc);
  formData.append("priority", priority);
  formData.append("start_date", startDate);

  formData.append("submission_date", endDate);

  formData.append("information_id", props.information_id);
  formData.append("type", props.type);
  const handleInfoCollectionUpdate = async (e) => {
    dispatch({
      type: "SET_UPDATE_LOADING",
      item: true,
    });
    e.preventDefault();
    let userData = await updateInfoCollection(formData);
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
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      जानकारी शीर्षक
                    </label>
                    <input
                      type="text"
                      required
                      name="title"
                      id="title"
                      defaultValue={props.title}
                      {...bindTitle}
                      placeholder="जानकारी शीर्षक प्रविष्ट गर्नुहोस्"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      htmlFor="start_date"
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
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <NepaliDatePicker
                        required={true}
                        value={props.startDate}
                        inputClassName="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                        onChange={(value) => setStartDate(value)}
                        options={{ calenderLocale: "ne" }}
                      />
                    </div>
                  </div>

                  {props.type !== "circular" && (
                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="end_date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        म्याद चयन गर्नुहोस्
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
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <NepaliDatePicker
                          required={true}
                          value={props.endDate}
                          inputClassName="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
                          onChange={(value) => setEndDate(value)}
                          options={{ calenderLocale: "ne" }}
                        />
                      </div>
                    </div>
                  )}
                  <div
                    onChange={handlePriorityChange}
                    className="col-span-6 sm:col-span-2"
                  >
                    <label
                      htmlFor="priority"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      प्राथमिकता चयन गर्नुहोस्
                    </label>
                    <select
                      id="priority"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value>प्राथमिकता चयन गर्नुहोस्</option>
                      <option
                        selected={props.priority === "medium" && true}
                        value="medium"
                      >
                        मध्यम
                      </option>
                      <option
                        selected={props.priority === "high" && true}
                        value="high"
                      >
                        उच्च
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-span-12 mt-2 sm:col-span-12">
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
                      defaultValue={props.description}
                    />
                  </div>
                </div>{" "}
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
