import React, { useEffect, useState, useMemo } from "react";
import Card from "../../components/Card";
import { getLgRelatedData } from "../../api";
import { Link } from "react-router-dom";
import HeaderTable from "../../components/DataTable/HeaderTable";
import SearchTable from "../../components/DataTable/Search";
import logo from "../../assets/logo.svg";
import { useStateValue } from "../../utils/StateProvider";
import ShowMoreText from "react-show-more-text";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function AdvanceSearch(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [comments, setComments] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [toggleTable, setToggleTable] = useState(true);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [{ loading }, dispatch] = useStateValue();
  const ITEMS_PER_PAGE = 30;
  const headers = [];
  useEffect(() => {
    setHeaderData(headers);

    console.log(currentPage);
  }, []);

  const goToNextPage = async (fullUrl, url) => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    setComments(await getLgRelatedData(fullUrl, url));
    setCurrentPage(comments.current_page);
    if (comments) {
      dispatch({
        type: "SET_LOADING",
        item: false,
      });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    props.type == "staff" &&
      headers.push(
        {
          name: "कर्मचारी को नाम",
          field: "name",
          sortable: false,
        },
        {
          name: "कर्मचारी को पदनाम",
          field: "designation",
          sortable: false,
        },
        { name: "इमेल", field: "email", sortable: false },
        { name: "फोन", field: "phone", sortable: false },
        { name: "स्थानीय सरकार", field: "lgname", sortable: false }
      );
    props.type == "elected_representative" &&
      headers.push(
        {
          name: "निर्वाचित प्रतिनिधि",
          field: "name",
          sortable: false,
        },
        { name: "इमेल", field: "email", sortable: false },
        { name: "फोन", field: "phone", sortable: false },
        { name: "स्थानीय सरकार", field: "lgname", sortable: false }
      );
    props.type == "website_directory" &&
      headers.push(
        { name: "जिल्ला", field: "district", sortable: false },
        { name: "वेबसाइट को नाम", field: "name", sortable: false },
        { name: "प्रकार", field: "type", sortable: false },
        { name: "वेबसाइट", field: "website", sortable: false }
      );
    props.type == "document" &&
      headers.push(
        { name: "कागजात को नाम", field: "name", sortable: false },
        { name: "स्थानीयतह", field: "lg", sortable: false },
        { name: "कागजात को प्रकार", field: "type", sortable: false },
        { name: "कागजात", field: "doc", sortable: false }
      );
    props.type == "service" &&
      headers.push(
        { name: "सेवाको नाम", field: "name", sortable: false },
        { name: "सेवा कार्यालय", field: "office", sortable: false },
        { name: "सेवाको समय", field: "time", sortable: false },
        { name: "सेवा को प्रकार", field: "lg", sortable: false },
        { name: "सेवा शुल्क", field: "doc", sortable: false },
        { name: "जिम्मेवार अधिकारी", field: "doc", sortable: false },
        { name: "आवश्यक कागजातहरू", field: "doc", sortable: false }
      );
    props.type == "contact" &&
      headers.push(
        { name: "स्थानीयतह", field: "name", sortable: false },
        { name: "टेलिफोन", field: "office", sortable: false },
        { name: "इमेल", field: "lg", sortable: false },
        { name: "ठेगाना", field: "doc", sortable: false }
      );
    props.type == "resource_map" &&
      headers.push(
        { name: "शीर्षक", field: "name", sortable: false },

        { name: "स्थानीयतह", field: "time", sortable: false },
        { name: "थप जानकारी", field: "office", sortable: false }
      );
    props.type == "article" &&
      headers.push(
        { name: "सूचना तथा समाचारको श्रीषक", field: "name", sortable: false },

        { name: "प्रकार", field: "type", sortable: false },
        { name: "स्थानीयतह", field: "time", sortable: false },
        { name: "थप जानकारी", field: "office", sortable: false }
      );
    if (document.querySelectorAll(".document-file")) {
      var linkList = document.querySelectorAll(".document-file a");
      for (let i = 0; i < linkList.length; i++) {
        linkList[i].setAttribute("target", "_blank");
        linkList[i].setAttribute("class", "text-blue-500 hover:text-blue-400");
      }
    }
    setHeaderData(headers);
  }, [props.type]);
  useEffect(() => {
    if (document.querySelectorAll(".document-file")) {
      var linkList = document.querySelectorAll(".document-file a");
      for (let i = 0; i < linkList.length; i++) {
        linkList[i].setAttribute("target", "_blank");
        linkList[i].setAttribute("class", "text-blue-500 hover:text-blue-400");
      }
    }
  }, [loading]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  function isFloat(n) {
    return n === +n && n !== (n | 0);
  }

  function roundNumber(n) {
    if (n > 0 && comments.per_page > 0) return Math.ceil(n);
    if (isFloat(n)) {
      let numberToRound = parseInt(n);
      return numberToRound + 1;
    } else {
      return parseInt(n);
    }
  }
  const splittingFunc = (val) => {
    let newVal;
    newVal = val.replace(/['"]+/g, "");
    newVal = newVal.slice(27);
    return newVal;
  };
  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  };

  switch (props.type) {
    case "staff":
      return (
        <div className="mt-5">
          <div className="flex justify-between items-center mb-4 mt-4 px-4">
            <div className="list-grid-toggle">
              <div
                onClick={() => setToggleTable(!toggleTable)}
                className={toggleTable ? "icon" : "icon icon icon-grid"}
              >
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
              </div>
              <span className="label">List</span>
            </div>
          </div>

          {props.comments.data == "" ? (
            ""
          ) : toggleTable ? (
            <table id="staffTable" className="info-table table-auto w-full">
              <HeaderTable
                headers={headerData}
                onSorting={(field, order) => setSorting({ field, order })}
              />
              <tbody>
                {props.comments.data &&
                  props.comments.data.map((value, i) => (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-base">{value.title}</p>
                      </td>
                      <td className="px-6 py-4">{value.designation}</td>
                      <td className="px-6 py-4">{value.email}</td>
                      <td className="px-6 py-4">{value.phone}</td>
                      <td className="px-6 py-4">
                        <Link
                          className="text-blue-700 hover:text-blue-500"
                          to={`/lg-glance/${value.lg_id}`}
                        >
                          {value.localgovernment_name}
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="flexgrid grid-cols-6 gap-4 px-4">
              {props.comments.data &&
                props.comments.data.map((value) => (
                  <div className="col-span-6 md:col-span-4">
                    <Card>
                      <div className="mb-2">
                        <div className="w-full rounded">
                          {value.photo === "" ? (
                            <img
                              src={logo}
                              alt=""
                              className="w-full h-full h-[11rem]"
                            />
                          ) : (
                            <div
                              className="w-full h-full overflow-hidden innerHtmlWrapper h-[11rem]"
                              dangerouslySetInnerHTML={{
                                __html: value.photo,
                              }}
                            />
                          )}
                        </div>
                        <div className="flex w-full items-center justify-between pt-6 pb-1">
                          <p className="text-xl font-normal text-gray-800 dark:text-white ">
                            {value.title}
                          </p>
                        </div>
                        <p className="text-base text-gray-600 dark:text-gray-200 pb-3">
                          {value.designation}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
          )}
        </div>
      );
    case "elected_representative":
      return (
        <div className="mt-5">
          <div className="flex justify-between items-center mb-4 mt-4 px-4">
            <div className="list-grid-toggle">
              <div
                onClick={() => setToggleTable(!toggleTable)}
                className={toggleTable ? "icon" : "icon icon icon-grid"}
              >
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
              </div>
              <span className="label">List</span>
            </div>
          </div>
          {props.comments.data == "" ? (
            ""
          ) : toggleTable ? (
            <table id="electedTable" className="info-table table-auto w-full">
              <HeaderTable
                headers={headerData}
                onSorting={(field, order) => setSorting({ field, order })}
              />
              <tbody>
                {props.comments.data &&
                  props.comments.data.map((value, i) => (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm">
                          <div className="relative hidden mr-3 rounded-full md:block">
                            <div
                              className="w-10"
                              dangerouslySetInnerHTML={{
                                __html: value.photo,
                              }}
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <p className="font-semibold text-base">
                              {value.title}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {value.designation}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{value.email}</td>
                      <td className="px-6 py-4">{value.phone}</td>
                      <td className="px-6 py-4">
                        <Link
                          className="text-blue-700 hover:text-blue-500"
                          to={`/lg-glance/${value.lg_id}`}
                        >
                          {value.localgovernment_name}
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-6 gap-4 px-4">
              {props.comments.data &&
                props.comments.data.map((value) => (
                  <div className="col-span-6 md:col-span-1">
                    <Card>
                      <div className="mb-2">
                        <div className="w-full rounded">
                          {value.photo === "" ? (
                            <img
                              src={logo}
                              alt=""
                              className="w-full h-full h-[11rem]"
                            />
                          ) : (
                            <div
                              className="w-full h-full overflow-hidden innerHtmlWrapper h-[11rem]"
                              dangerouslySetInnerHTML={{
                                __html: value.photo,
                              }}
                            />
                          )}
                        </div>
                        <div className="flex w-full items-center justify-between pt-6 pb-1">
                          <p className="text-xl font-normal text-gray-800 dark:text-white ">
                            {value.title}
                          </p>
                        </div>
                        <p className="text-base text-gray-600 dark:text-gray-200 pb-3">
                          {value.designation}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
          )}
        </div>
      );
    case "website_directory":
      return (
        <div className="mt-5">
          <div className="flex justify-between items-center mb-4 mt-4 px-4"></div>
          <table id="websiteTable" className="info-table table-auto w-full">
            <HeaderTable
              headers={headerData}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {props.comments.data &&
                props.comments.data.map((value, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{value.district_nep}</td>
                    <td className="px-6 py-4">{value.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
                        {value.type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={value.website}
                        className="text-blue-700 hover:text-blue-500"
                        target="_blank"
                      >
                        <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-4 py-1 bg-gray-200 text-gray-700 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          वेबसाइट मा जानुहोस्
                        </div>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    case "document":
      return (
        <div className="mt-5">
          <div className="flex justify-between items-center mb-4 mt-4 px-4">
            <div className="list-grid-toggle">
              <div
                onClick={() => setToggleTable(!toggleTable)}
                className={toggleTable ? "icon" : "icon icon icon-grid"}
              >
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
              </div>
              <span className="label">List</span>
            </div>
          </div>
          {props.comments.data == "" ? (
            ""
          ) : toggleTable ? (
            <table id="documentTable" className="info-table table-auto w-full">
              <HeaderTable
                headers={headerData}
                onSorting={(field, order) => setSorting({ field, order })}
              />
              <tbody>
                {props.comments.data &&
                  props.comments.data.map((value, i) => (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        <Link to={`/document/${value.id}`}>{value.title}</Link>
                      </td>

                      <td className="px-6 py-4">
                        {value.localgovernment_name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full truncate">
                          {value.document_type}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {value.documents !== "" ? (
                          <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-4 py-1 bg-gray-200 text-gray-700 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            <div
                              className="document-file"
                              dangerouslySetInnerHTML={{
                                __html: value.documents,
                              }}
                            />
                          </div>
                        ) : (
                          "कुनै कागजात छैन"
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-6 gap-4 px-4">
              {props.comments.data &&
                props.comments.data.map((value) => (
                  <div className="col-span-6 md:col-span-1">
                    <Card>
                      <div className="mb-2">
                        <div className="w-full rounded">
                          {value.photo === "" ? (
                            <img
                              src={logo}
                              alt=""
                              className="w-full h-full h-[11rem]"
                            />
                          ) : (
                            <div
                              className="w-full h-full overflow-hidden innerHtmlWrapper h-[11rem]"
                              dangerouslySetInnerHTML={{
                                __html: value.photo,
                              }}
                            />
                          )}
                        </div>
                        <div className="flex w-full items-center justify-between pt-6 pb-1">
                          <p className="text-xl font-normal text-gray-800 dark:text-white ">
                            {value.title}
                          </p>
                        </div>
                        <p className="text-base text-gray-600 dark:text-gray-200 pb-3">
                          {value.designation}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
          )}
        </div>
      );
    case "service":
      return (
        <div className="mt-5">
          <div className="flex justify-between items-center mb-4 mt-4 px-4"></div>
          <table id="serviceTable" className="info-table table-auto w-full">
            <HeaderTable
              headers={headerData}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {props.comments.data &&
                props.comments.data.map((value, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{value.title}</td>
                    <td className="px-6 py-4">{value.service_office}</td>
                    <td className="px-6 py-4">{value.service_time}</td>

                    <td className="px-6 py-4">
                      <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full truncate">
                        {value.service_type}
                      </div>
                    </td>

                    <td className="px-6 py-4">{value.service_fee}</td>

                    <td className="px-6 py-4">{value.responsible_officer}</td>
                    <td className="px-6 py-4">
                      {value.documents !== "" ? (
                        <ShowMoreText
                          /* Default options */
                          lines={2}
                          more="थप देखाउनुहोस्"
                          less="कम देखाउनुहोस्"
                          anchorClass="text-[#2572bc]"
                          onClick={executeOnClick}
                          expanded={false}
                          truncatedEndingComponent={"... "}
                        >
                          <div
                            className="document-file"
                            dangerouslySetInnerHTML={{
                              __html: value.required_documents,
                            }}
                          />
                        </ShowMoreText>
                      ) : (
                        "कुनै कागजात आवश्यक छैन"
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    case "contact":
      return (
        <div className="mt-5">
          <div className="flex justify-between items-center mb-4 mt-4 px-4"></div>
          <table id="contactTable" className="info-table table-auto w-full">
            <HeaderTable
              headers={headerData}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {props.comments.data &&
                props.comments.data.map((value, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{value.localgovernment_name}</td>
                    <td className="px-6 py-4">{value.telephone}</td>
                    <td className="px-6 py-4">{value.email}</td>

                    <td className="px-6 py-4">{value.address}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    case "resource_map":
      return (
        <div className="mt-5">
          <div className="flex justify-between items-center mb-4 mt-4 px-4"></div>
          <table id="mapTable" className="info-table table-auto w-full">
            <HeaderTable
              headers={headerData}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {props.comments.data &&
                props.comments.data.map((value, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{value.title}</td>
                    <td className="px-6 py-4">
                      <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full truncate">
                        {value.localgovernment_name}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <ShowMoreText
                        /* Default options */
                        lines={2}
                        more="थप देखाउनुहोस्"
                        less="कम देखाउनुहोस्"
                        anchorClass="text-[#2572bc]"
                        onClick={executeOnClick}
                        expanded={false}
                        truncatedEndingComponent={"... "}
                      >
                        <div
                          className=""
                          dangerouslySetInnerHTML={{
                            __html: value.body,
                          }}
                        />
                      </ShowMoreText>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    case "article":
      return (
        <div className="mt-5">
          <div className="flex justify-between items-center mb-4 mt-4 px-4">
            <div className="list-grid-toggle">
              <div
                onClick={() => setToggleTable(!toggleTable)}
                className={toggleTable ? "icon" : "icon icon icon-grid"}
              >
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
                <div className="icon-bar"></div>
              </div>
              <span className="label">List</span>
            </div>
          </div>
          {toggleTable ? (
            <table id="articleTable" className="info-table table-auto w-full">
              <HeaderTable
                headers={headerData}
                onSorting={(field, order) => setSorting({ field, order })}
              />
              <tbody>
                {props.comments.data &&
                  props.comments.data.map((value, i) => (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">{value.title}</td>
                      <td className="px-6 py-4">
                        <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full truncate">
                          {value.tags}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full truncate">
                          {value.localgovernment_name}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          className="flex justify-center"
                          to={`/article/${value.id}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-6 gap-4 px-4">
              {props.comments.data &&
                props.comments.data.map((value) => (
                  <div className="col-span-6 md:col-span-1">
                    <Card>
                      <div className="mb-2">
                        <div className="w-full rounded">
                          {value.photo === "" ? (
                            <img
                              src={logo}
                              alt=""
                              className="w-full h-full h-[11rem]"
                            />
                          ) : (
                            <div
                              className="w-full h-full overflow-hidden innerHtmlWrapper h-[11rem]"
                              dangerouslySetInnerHTML={{
                                __html: value.image,
                              }}
                            />
                          )}
                        </div>
                        <Link
                          to={`/article/${value.id}`}
                          className="flex w-full items-center justify-between pt-6 pb-1"
                        >
                          <p className="text-xl font-normal text-gray-800 dark:text-white truncate">
                            {value.title}
                          </p>
                        </Link>
                        <p className="text-base text-gray-600 dark:text-gray-200 pb-3 truncate">
                          {value.tags}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
          )}
        </div>
      );

    default:
      return <div className="p-4">कृपया एउटा कोटी चयन गर्नुहोस्।.</div>;
  }
}

export default AdvanceSearch;
