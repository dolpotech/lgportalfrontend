import React, { useState } from "react";
import ModalComponent from "../ModalComponent";
import UseInput from "../../utils/UseInput";
import { useStateValue } from "../../utils/StateProvider";
import {
  uploadDocument,
  uploadDocumentOffice,
  uploadDocumentMinistry,
} from "../../api";
import documentImg from "../../assets/document.png";
import Dropzone from "react-dropzone";

export default function UploadDocumentModal(props) {
  const [fileNames, setFileNames] = useState([]);
  const [file, setFile] = useState([]);
  const [{}, dispatch] = useStateValue();
  const userType = JSON.parse(localStorage.getItem("userData")).type;
  var formData = new FormData();
  formData.append("info_receiver_id", props.data.info_receiver_id);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async (e) => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    e.preventDefault();
    formData.append("main_doc", file);
    let data;
    if (userType === "local_government") {
      data = await uploadDocument(formData);
    } else if (userType === "ministry_office") {
      data = await uploadDocumentOffice(formData);
    } else {
      data = await uploadDocumentMinistry(formData);
    }

    if (data) {
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      dispatch({
        type: "SET_RECALL",
        item: true,
      });
    }
  };

  return (
    <ModalComponent
      customButton={"true"}
      title={"यहाँ कागजातहरू अपलोड गर्नुहोस्"}
      svg={
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          कृपया कागजात अपलोड गर्नुहोस्
        </div>
      }
    >
      <form onSubmit={handleUpload} className="w-[50vw] p-4">
        <div className="col-span-6 sm:col-span-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            for="min_doc"
          >
            मुख्य कागजातहरू चयन गर्नुहोस्
          </label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="main_doc"
            type="file"
            accept="image/x-png,image/gif,image/jpeg,application/pdf, application/vnd.ms-excel"
            required
            onChange={handleFileChange}
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            अनुरोध पत्र वा अन्य कागजातहरू अपलोड गर्नुहोस्,
          </div>
        </div>
        <button
          className="mt-4 font-sm bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow"
          type="submit"
        >
          पेश गर्नुहोस्
        </button>
      </form>
    </ModalComponent>
  );
}
