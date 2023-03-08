import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ShowMoreText from "react-show-more-text";
import Highlighter from "react-highlight-words";

export default function SingleResult(props) {
  const { t } = useTranslation();
  const [category, setCategory] = useState("all");
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();
  console.log(props.options);
  const changeType = (tag) => {
    if (tag === "all") {
      navigate(`/results?keyword=${searchParams.get("keyword")}`);
    } else {
      navigate(`/results?keyword=${searchParams.get("keyword")}&type=${tag}`);
    }
  };
  const categoryData = [
    {
      name: "all",
      tag: "all",
      total: null,
    },
  ];
  const arrangeString = (str) => {
    let newStr = str.replace(/&.*;/g, "");
    let trimmed;
    let endVal;
    if (str.includes(searchParams.get("keyword"))) {
      trimmed = str.indexOf(searchParams.get("keyword"));
      endVal = newStr.length - trimmed;
    } else {
      trimmed = 0;
      endVal = 250;
    }
    console.log(str.includes(searchParams.get("keyword")));
    let shortStr = newStr.slice(trimmed, endVal);
    if (shortStr.length > 400) {
      shortStr = shortStr.slice(0, 250);
    }
    return shortStr;
  };
  const makeArray = (srt) => {
    srt = srt.split(" ");
    return srt;
  };
  props.options.map((item) => categoryData.push(item));
  console.log(props.comments.data.map((item) => item.body));
  return (
    <div>
      <div className="text-base font-medium text-center text-gray-700 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {categoryData.map((item, i) => (
            <li
              onClick={() => changeType(item.tag)}
              className={`mr-2 cursor-pointer`}
              key={i++}
            >
              <a
                className={`flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300${
                  searchParams.get("type") === item.tag &&
                  "text-blue-500 border-blue-500 hover:text-blue-500 hover:border-blue-500"
                } ${
                  searchParams.get("type") === null &&
                  i === 0 &&
                  " border-blue-500"
                }`}
                aria-current="page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700 group-hover:text-blue-500 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {t(item.tag)}
                {item.total !== null && (
                  <span className="badge relative flex left-2 items-center w-6 h-6 justify-center bg-[#276eb9] rounded-full px-2 py-1 text-center text-white text-xs mr-1">
                    {item.total}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 divide-y px-2">
        {props.comments.data &&
          props.comments.data.map((item) => (
            <div className="h-full py-2 flex items-center justify-start container mx-auto">
              <div className="w-max">
                <div className="grid relative">
                  <div className="group w-full bg-white rounded-sm">
                    <p className="text-sm capitalize">
                      {t(item.type) + " "} ( {item.lg.name} )
                      <a
                        href={item.lg.website}
                        target="_blank"
                        className="capitalize"
                      >
                        {" "}
                        <span className="text-lg">›</span>
                        <span className="lowercase hover:underline">
                          {" "}
                          {item.lg.website}
                        </span>
                      </a>
                    </p>
                    {item.type === "articles" || item.type === "documents" ? (
                      <Link
                        to={`/${
                          item.type === "articles"
                            ? "article"
                            : item.type === "documents"
                            ? "document"
                            : ""
                        }/${item.id}`}
                        className="text-xl font-bold text-lg hover:underline dark:text-blue-300 text-blue-700"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.title,
                          }}
                        />
                      </Link>
                    ) : (
                      <div
                        className="text-xl font-bold text-lg hover:underline dark:text-blue-300 text-blue-700"
                        dangerouslySetInnerHTML={{
                          __html: item.title,
                        }}
                      />
                    )}
                    {item.type === "services" && (
                      <div className="pl-1 mt-1">
                        <div className="col-span-9">
                          <p className="text-sm capitalize">
                            <span className="font-semibold">
                              {t("services")}:{" "}
                            </span>
                            {item.service_type}
                          </p>
                          <p className="text-sm capitalize">
                            <span className="font-semibold">
                              {t("service_office")}:{" "}
                            </span>
                            {item.service_office}
                          </p>
                          <p className="text-sm capitalize">
                            <span className="font-semibold">
                              {t("service_fee")}:{" "}
                            </span>
                            {item.service_fee}
                          </p>
                          <p className="text-sm capitalize">
                            <span className="font-semibold">
                              {t("service_time")}:{" "}
                            </span>
                            {item.service_time}
                          </p>
                          <p className="text-sm capitalize">
                            <span className="font-semibold">
                              {t("responsible_officer")}:{" "}
                            </span>
                            {item.responsible_officer}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="">
                      <p className="text-sm capitalize font-semibold">
                        {item.designation}
                      </p>
                      <p>
                        <Highlighter
                          activeClassName="bg-blue-100"
                          highlightClassName="font-semibold bg-blue-100"
                          searchWords={makeArray(searchParams.get("keyword"))}
                          textToHighlight={arrangeString(item.body)}
                        />
                      </p>
                      {item.type === "staffs" ||
                      item.type === "elected_officials" ? (
                        <div className="grid grid-cols-12 items-center gap-2 mb-2">
                          {item.photo !== "" && (
                            <div className="col-span-3">
                              <div className="overflow-hidden">
                                <div className="p-2 w-28 m-auto">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: item.photo,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="col-span-9">
                            <p className="text-sm capitalize">
                              <span className="font-semibold">
                                {t("email")}:{" "}
                              </span>
                              {item.email}
                            </p>
                            <p className="text-sm capitalize">
                              <span className="font-semibold">
                                {t("phone")}:{" "}
                              </span>
                              {item.phone}
                            </p>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
