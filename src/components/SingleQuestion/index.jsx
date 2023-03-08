import React, { useState } from "react";
import Card from "../../components/Card";
import {
  getAssessmentData,
  postAssessmentForm,
  approveInformationCollection,
  postAssessmentFormOffice,
  postAssessmentFormMinistry,
} from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";
import { useTranslation } from "react-i18next";

export default function SingleQuestion(props) {
  const [data, setData] = useState({});
  const [feildId, setFid] = useState();
  const [{ loading }, dispatch] = useStateValue();
  const [posting, setPosting] = useState();
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
    setPosting(true);
    let dataToPost = {
      info_receiver_id: information_id,
      field_id: id,
      answer: answer,
    };
    if (answer !== "") {
      if (userType === "ministry_office") {
        let response = await postAssessmentFormOffice(dataToPost, token);
        if (response) {
          dispatch({
            type: "SET_LOADING",
            item: false,
          });
          setPosting(false);
          dispatch({
            type: "SET_RECALL",
            item: true,
          });
        }
      } else if (userType === "local_government") {
        let response = await postAssessmentForm(dataToPost, token);
        if (response) {
          dispatch({
            type: "SET_LOADING",
            item: false,
          });
          setPosting(false);
          dispatch({
            type: "SET_RECALL",
            item: true,
          });
        }
      } else {
        let response = await postAssessmentFormMinistry(dataToPost, token);
        if (response) {
          dispatch({
            type: "SET_LOADING",
            item: false,
          });
          setPosting(false);
          dispatch({
            type: "SET_RECALL",
            item: true,
          });
        }
      }
    }
  };
  const onInputChange = async (e) => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    const { value } = e.target;
    let dataToPost = {
      info_receiver_id: information_id,
      field_id: feildId,
      answer: value,
    };
    if (userType === "ministry_office") {
      let response = await postAssessmentFormOffice(dataToPost, token);
      if (response) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
        setPosting(false);
        dispatch({
          type: "SET_RECALL",
          item: true,
        });
      }
    } else if (userType === "local_government") {
      let response = await postAssessmentForm(dataToPost, token);
      if (response) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
        setPosting(false);
        dispatch({
          type: "SET_RECALL",
          item: true,
        });
      }
    } else {
      let response = await postAssessmentFormMinistry(dataToPost, token);
      if (response) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
        setPosting(false);
        dispatch({
          type: "SET_RECALL",
          item: true,
        });
      }
    }
  };
  switch (props.item.field_type) {
    case "radio":
      return (
        <Card>
          <div className="col-span-6 p-2 sm:col-span-3 relative">
            <label
              htmlFor="first-name"
              className="contents text-base font-medium text-gray-900"
            >
              {props.i + ". " + props.item.field_name}
            </label>
            {props.item.answer !== null && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 pointer-events-none text-green-500 absolute top-5 transform -translate-y-1/2 right-4"
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
            )}
            <fieldset>
              <div className="mt-4 space-y-4">
                {props.item.options.map((value, i) => (
                  <div className="flex items-center">
                    <input
                      id={`item-${props.item.field_id}`}
                      name={`item-${props.item.field_id}`}
                      type="radio"
                      onClick={() => postData(props.item.field_id, value.value)}
                      defaultChecked={
                        value.value == props.item.answer && "checked"
                      }
                      disabled={props.status === "completed" ? "disabled" : ""}
                      className={
                        "focus:ring-[#276fb9] h-4 w-4 text-[#276fb9] border-gray-300"
                      }
                    />
                    <label
                      htmlFor={`item-${props.item.field_id}`}
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      {value.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </Card>
      );
    case "number":
      return (
        <Card>
          <div className="col-span-6 p-2 sm:col-span-3 relative">
            <label
              htmlFor={props.item.field_name}
              className="mb-2 text-base font-medium text-gray-900"
            >
              {props.i + ". " + props.item.field_name}
            </label>
            {props.item.answer !== null && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 pointer-events-none text-green-500 absolute top-5 transform -translate-y-1/2 right-2"
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
            )}
            <input
              type="number"
              onBlur={onInputChange}
              name={props.item.field_name}
              id={props.item.field_name}
              defaultValue={props.item.answer}
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </Card>
      );
    case "text":
      return (
        <Card>
          <div className="col-span-6 p-2 sm:col-span-3 relative">
            <label
              htmlFor={props.item.field_name}
              className="mb-2 text-base font-medium text-gray-900"
            >
              {props.i + ". " + props.item.field_name}
            </label>
            {props.item.answer !== null && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 pointer-events-none text-green-500 absolute top-5 transform -translate-y-1/2 right-4"
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
            )}

            {posting == true && (
              <div class="load2 pointer-events-none absolute top-12 right-5"></div>
            )}
            <input
              type="text"
              onBlur={onInputChange}
              onInput={() => setFid(props.item.field_id)}
              name={props.item.field_name}
              id={props.item.field_name}
              placeholder={""}
              defaultValue={props.item.answer}
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </Card>
      );
    case "textarea":
      return (
        <Card>
          <div className="col-span-6 p-2 sm:col-span-3 relative">
            <label
              htmlFor={props.item.field_name}
              className="mb-2 text-base font-medium text-gray-900"
            >
              {props.i + ". " + props.item.field_name}
            </label>
            {props.item.answer !== null && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 pointer-events-none text-green-500 absolute top-5 transform -translate-y-1/2 right-4"
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
            )}
            <textarea
              id="message"
              rows={4}
              onBlur={onInputChange}
              onInput={() => setFid(props.item.field_id)}
              name={props.item.field_name}
              id={props.item.field_name}
              defaultValue={props.item.answer}
              className="mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </Card>
      );
    case "select":
      return (
        <Card>
          <div className="col-span-6 p-2 sm:col-span-3 relative">
            <label
              htmlFor={props.item.field_name}
              className="mb-2 text-base font-medium text-gray-900"
            >
              {props.i + ". " + props.item.field_name}
            </label>

            {props.item.answer !== null && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 pointer-events-none text-green-500 absolute top-5 transform -translate-y-1/2 right-4"
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
            )}
            <select
              id="priority"
              required
              onChange={onInputChange}
              onInput={() => setFid(props.item.field_id)}
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>{props.item.field_name}</option>
              {props.item.options.map((item) => (
                <option value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
        </Card>
      );
    case "checkbox":
      return (
        <Card>
          <div className="col-span-6 p-2 sm:col-span-3 relative">
            <fieldset>
              <legend className="sr-only">
                {props.i + ". " + props.item.field_name}
              </legend>
              <div
                className="text-base font-medium text-gray-900"
                aria-hidden="true"
              >
                {props.i + ". " + props.item.field_name}
              </div>
              {props.item.answer !== null && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 pointer-events-none text-green-500 absolute top-5 transform -translate-y-1/2 right-4"
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
              )}
              <div className="mt-4 space-y-4">
                {props.item.options.map((value) => (
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        defaultChecked={
                          value.value == props.item.answer && "checked"
                        }
                        onClick={() =>
                          postData(props.item.field_id, value.value)
                        }
                        className="focus:ring-[#276fb9] h-4 w-4 text-[#276fb9] border-gray-300"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {value.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </Card>
      );
    case "date":
      return (
        <Card>
          <div className="col-span-6 p-2 sm:col-span-3 relative">
            <label
              htmlFor={props.item.field_name}
              className="mb-2 text-base font-medium text-gray-900"
            >
              {props.i + ". " + props.item.field_name}
            </label>
            {props.item.answer !== null && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 pointer-events-none text-green-500 absolute top-5 transform -translate-y-1/2 right-4"
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
            )}
            <input
              required
              id="start_date"
              type="date"
              onBlur={onInputChange}
              onInput={() => setFid(props.item.field_id)}
              value={props.item.answer}
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input"
              placeholder="सुरु मिति चयन गर्नुहोस्"
              defaultValue
            />
          </div>
        </Card>
      );
    case "file":
      return (
        <Card>
          <div className="col-span-6 p-2 sm:col-span-3">
            <label
              htmlFor={props.item.field_name}
              className="mb-2 text-base font-medium text-gray-900"
            >
              {props.i + ". " + props.item.field_name}
            </label>
            <input
              className="mt-2 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              id="main_doc"
              type="file"
              accept="image/x-png,image/gif,image/jpeg,application/pdf, application/vnd.ms-excel"
              required
            />
          </div>
        </Card>
      );
    case "email":
      return (
        <Card>
          <div className="col-span-6 p-2 sm:col-span-3 relative">
            <label
              htmlFor={props.item.field_name}
              className="mb-2 text-base font-medium text-gray-900"
            >
              {props.i + ". " + props.item.field_name}
            </label>
            {props.item.answer !== null && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 pointer-events-none text-green-500 absolute top-5 transform -translate-y-1/2 right-4"
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
            )}
            <input
              type="email"
              name={props.item.field_name}
              id={props.item.field_name}
              onBlur={onInputChange}
              onInput={() => setFid(props.item.field_id)}
              defaultValue={props.item.answer}
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </Card>
      );
    case "phone":
      return (
        <Card>
          <div className="col-span-6 p-2 sm:col-span-3 relative">
            <label
              htmlFor={props.item.field_name}
              className="mb-2 text-base font-medium text-gray-900"
            >
              {props.i + ". " + props.item.field_name}
            </label>
            {props.item.answer !== null && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 pointer-events-none text-green-500 absolute top-5 transform -translate-y-1/2 right-4"
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
            )}
            <input
              type="number"
              name={props.item.field_name}
              id={props.item.field_name}
              onBlur={onInputChange}
              onInput={() => setFid(props.item.field_id)}
              defaultValue={props.item.answer}
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </Card>
      );

    default:
      return <div className="p-4">कृपया एउटा कोटी चयन गर्नुहोस्।.</div>;
  }
}
