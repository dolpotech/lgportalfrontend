import React, { useEffect, useState, useMemo } from "react";
import { startCollectionInformation } from "../../api";
import ModalComponent from "../ModalComponent";
import { useStateValue } from "../../utils/StateProvider";

export default function Comment({ information_id, status }) {
  const [{}, dispatch] = useStateValue();
  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  const startData = async (information_id) => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    let dataToPost = {
      information_id: information_id,
    };
    let response = await startCollectionInformation(dataToPost, token);
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

  const closeModal = () => {
    dispatch({
      type: "SET_MODAL",
      item: false,
    });
  };
  return (
    <ModalComponent
      noHeader={"true"}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={"h-6 w-6"}
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
      }
    >
      {/* This example requires Tailwind CSS v2.0+ */}
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-[#276fb9] sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Start Information Collection Process
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to Start collection information? Your
                    Officer will be notified and will start populating
                    Assessment Form.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => startData(information_id)}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#276fb9] text-gray-200 hover:bg-green-400 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Start
            </button>
            <button
              type="button"
              onClick={() => closeModal()}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ModalComponent>
  );
}
