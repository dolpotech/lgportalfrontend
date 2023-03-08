import React from "react";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 dark:text-indigo-600 font-bold text-2xl">
                पृष्ठ फेला परेन माफ गर्नुहोस्
              </h1>
              <p className="my-2 text-gray-800 dark:text-indigo-600">
                यसको लागि माफ गर्नुहोस्! जारी राख्न कृपया होमपेजमा जानुहोस्।
              </p>
              <Link
                to="/"
                className="mt-4 text-sm flex w-max items-center bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow"
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
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                गृह पृष्ठमा जानुहोस्
              </Link>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
}

export default NotFound;
