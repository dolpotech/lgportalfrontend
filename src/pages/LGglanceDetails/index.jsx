import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import NepalMap from "../../components/NepalMap";
import Map from "../../assets/map.jpeg";
import { getLgDetails, getDistrict, getLgByDistrict } from "../../api";
import logo from "../../assets/logo.svg";
import lumbini from "../../assets/Lumbini.jpeg";
import HeaderTable from "../../components/DataTable/HeaderTable";
import { useStateValue } from "../../utils/StateProvider";
import ShowMoreText from "react-show-more-text";
import documentImg from "../../assets/document.png";
import articleImg from "../../assets/article.png";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function LGglanceDetails(props) {
  const [{}, dispatch] = useStateValue();
  let navigate = useNavigate();
  const { lgId } = useParams();
  const [districts, setDistricts] = useState();
  const [lgs, setLgs] = useState();
  const [allData, setData] = useState([]);
  const [electedOfficials, setOfficials] = useState([]);
  useEffect(() => {
    const getData = async () => {
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      let districtData = await getDistrict();
      await setDistricts(districtData.data);
      let data = await getLgDetails(lgId);
      await setData(data);
      if (data) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    getData();
  }, [lgId]);
  const handelDistrictChange = async (e) => {
    let lgData = await getLgByDistrict(e.target.value);
    await setLgs(lgData);
  };
  const handelLgChange = (e) => {
    navigate(`/lg-glance/${e.target.value}`);
  };
  const splittingFunc = (val) => {
    let newVal;
    newVal = val.replace(/['"]+/g, "");
    newVal = newVal.slice(27);
    newVal = newVal.split(" ")[0];
    return newVal;
  };

  const headers = [
    { name: "S.N", field: "sn", sortable: false },
    { name: "Title", field: "title", sortable: false },
    { name: "Population", field: "pop", sortable: false },
    { name: "Contact", field: "con", sortable: false },
    { name: "Body", field: "body", sortable: false },
  ];

  const headerEmergency = [
    { name: "S.N", field: "sn", sortable: false },
    { name: "Name", field: "Name", sortable: false },
    { name: "Address", field: "Address", sortable: false },
    { name: "Phone Number", field: "phone number", sortable: false },
  ];
  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  };
  return (
    <div>
      <section className="m-6 container px-4 overflow-scroll lg:px-0 mx-auto">
        <div className="flex justify-between flex-col md:flex-row">
          <div>
            <h1 className="text-gray-900 text-2xl font-extrabold tracking-tight mb-2">
              {allData.introduction &&
                allData.introduction.map((item) => item.title)}
            </h1>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    href="#"
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
                    गृह पृष्ठ
                  </a>
                </li>
                <li>
                  <Link to="/lg-glance">
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
                        एक नजरमा स्थानीय तह
                      </a>
                    </div>
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
                    <a
                      href="#"
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      {allData.introduction &&
                        allData.introduction.map((item) => item.title)}
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex flex-col  gap-4 mt-5 md:gap-0 md:mt-0 md:flex-row">
            <select
              onChange={handelDistrictChange}
              className="form-select block h-max w-max px-3 py-1.5 pr-14 ml-4 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200"
            >
              <option disabled selected>
                जिल्ला चयन गर्नुहोस्
              </option>
              {districts &&
                districts.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
            </select>
            <select
              onChange={handelLgChange}
              className="form-select block h-max w-max px-3 py-1.5 pr-14 ml-4 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200"
            >
              <option disabled selected>
                स्थानीय सरकार चयन गर्नुहोस्
              </option>
              {lgs &&
                lgs.map((item) => <option value={item.id}>{item.name}</option>)}
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-5 mt-5">
          <div className="col md:col-span-9">
            <div className="col-cpan-12 px-6 overflow-hidden shadow-md mb-4">
              {allData.introduction &&
                allData.introduction.map((item) => (
                  <div className="dark:bg-gray-900">
                    <div className="mx-auto container w-full flex items-center md:flex-row gap-6 flex-col justify-between px-6 lg:px-0">
                      <div className="relative flex flex-col justify-start items-start lg:w-4/6 px-2 lg:px-0">
                        <div className="group w-full bg-white rounded-sm py-6">
                          <div>
                            <p className="lg:text-sm text-xs text-gray-600 dark:text-gray-300 font-medium leading-none">
                              {allData.local_gov.map(
                                (item) => item.district_name
                              )}
                            </p>
                          </div>
                          <p className="text-2xl font-bold text-gray-700 ">
                            {item.title}
                          </p>
                        </div>
                        {allData.lg_contact !== "No data" &&
                          allData.lg_contact.map((item) => (
                            <div className=" leading-6">
                              <p className="text-base font-semibold text-gray-700 mt-2">
                                Email:{" "}
                                <span className="font-semibold md:font-medium">
                                  {item.email}
                                </span>
                              </p>
                              <p className="text-base font-semibold text-gray-700 mt-2">
                                Phone:{" "}
                                <span className="font-semibold md:font-medium">
                                  {item.phone}
                                </span>
                              </p>
                            </div>
                          ))}
                        {allData.local_gov && (
                          <a
                            href={allData.local_gov.map((item) => item.website)}
                            target="_blank"
                            className="mt-6 inline-flex relative block text-sm font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow"
                          >
                            वेबसाइट भ्रमण गर्नुहोस्
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="m-auto ml-2 h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                      <div className="flex justify-center items-center lg:w-2/6 mt-10 md:mt-0">
                        <div className="grid grid-cols-6 gap-4">
                          <div className="md:mt-3 col-span-6">
                            <p className="text-gray-800 text-center dark:text-white bg-blue-100 lg:text-2xl text-xl font-bold leading-9 p-1">
                              जनप्रतिनिधि
                            </p>
                          </div>
                          {allData.pravakta &&
                            allData.pravakta.map((item) => (
                              <div className="col-span-3">
                                <div className="h-full">
                                  <div className="w-full max-w-sm">
                                    {item.photo === "" ? (
                                      <img
                                        src={logo}
                                        alt=""
                                        className="w-full h-[5rem] md:h-[8rem]"
                                      />
                                    ) : (
                                      <div
                                        className="w-full h-[5rem] md:h-[8rem] overflow-hidden"
                                        dangerouslySetInnerHTML={{
                                          __html: item.photo,
                                        }}
                                      />
                                    )}
                                    <div className="bg-white shadow-sm p-4">
                                      <h2 className="text-center text-gray-800 text-md font-bold pt-1">
                                        {item.title}
                                      </h2>
                                      <div className="w-5/6 m-auto">
                                        <p className="text-center text-gray-500 pt-1">
                                          {item.designation}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto container w-full flex xl:flex-row flex-col justify-between items-start mt-6 mb-6 px-6 lg:px-0">
                      <div className="flex flex-col justify-start items-start xl:w-4/4">
                        <div className="">
                          <ShowMoreText
                            /* Default options */
                            lines={4}
                            more="Show more"
                            less="Show less"
                            className="content-css"
                            anchorClass="text-[#2572bc]"
                            onClick={executeOnClick}
                            expanded={false}
                            truncatedEndingComponent={"... "}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.body,
                              }}
                            />
                          </ShowMoreText>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {/* Elected Official */}
            {allData.elected_officials &&
              allData.elected_officials.length !== 0 && (
                <Card
                  icon={"true"}
                  defaultOpen={true}
                  title="Elected Officials"
                  className="mb-4 max-w-max"
                >
                  <div className="grid grid-cols-12 gap-1">
                    {allData.elected_officials &&
                      allData.elected_officials.map((value) => (
                        <div className="col-span-6 md:col-span-2">
                          <div className="">
                            <div className="w-full max-w-sm">
                              {value.photo === "" ? (
                                <img
                                  src={logo}
                                  alt=""
                                  className="w-full h-[5rem] md:h-[8rem]"
                                />
                              ) : (
                                <img
                                  src={value && splittingFunc(value.photo)}
                                  className="w-full h-full h-[10rem]"
                                />
                              )}
                              <div className="bg-white shadow-sm p-4">
                                <h2 className="text-center text-gray-800 text-md font-bold pt-1">
                                  {value.title}
                                </h2>
                                <div className="w-5/6 m-auto">
                                  <p className="text-center text-gray-500 pt-1">
                                    {value.designation}
                                  </p>
                                </div>
                                <div className="w-5/6 m-auto">
                                  <p className="text-center text-gray-500 pt-1">
                                    {value.phone}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>
              )}
            {allData.staffs && (
              <Card
                icon={"true"}
                title="Important Contacts"
                className="mb-4 max-w-max"
              >
                <div className="grid grid-cols-12 gap-1">
                  {allData.staffs &&
                    allData.staffs.map((value) => (
                      <div className="col-span-6 md:col-span-4">
                        <div className="h-full">
                          <div className="w-full max-w-sm">
                            {value.photo === "" ? (
                              <img
                                src={logo}
                                alt=""
                                className="w-full h-[5rem] md:h-[8rem]"
                              />
                            ) : (
                              <img
                                src={value && splittingFunc(value.photo)}
                                className="w-full h-full h-[10rem]"
                              />
                            )}
                            <div className="bg-white shadow-sm p-4">
                              <h2 className="text-center text-gray-800 text-md font-bold pt-1">
                                {value.title}
                              </h2>
                              <div className="w-5/6 m-auto">
                                <p className="text-center text-gray-500 pt-1">
                                  {value.designation}
                                </p>
                              </div>
                              <div className="w-5/6 m-auto">
                                <p className="text-center text-gray-500 pt-1">
                                  {value.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            )}

            {/* Elected Official end */}
            {/* table card */}
            {allData.ward_info && allData.ward_info.length !== 0 && (
              <Card
                icon={"true"}
                title="Ward Information"
                padding="true"
                className="mb-4 max-w-max"
              >
                <table className="info-table table-responsive w-full">
                  <HeaderTable headers={headers} />
                  <tbody>
                    {allData.ward_info &&
                      allData.ward_info.map((item, i) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4">{1 + i++}</td>
                          <td className="px-6 py-4">{item.title}</td>
                          <td className="px-6 py-4">{item.population}</td>
                          <td className="px-6 py-4">{item.phone}</td>
                          <td className="px-6 py-4">
                            <ShowMoreText
                              /* Default options */
                              lines={3}
                              more="Show more"
                              less="Show less"
                              className="content-css"
                              anchorClass="text-[#2572bc]"
                              onClick={executeOnClick}
                              expanded={false}
                              truncatedEndingComponent={"... "}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.body,
                                }}
                              />
                            </ShowMoreText>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Card>
            )}
            {/* table card end */}
            {allData.emergency_numbers &&
              allData.emergency_numbers.length !== 0 && (
                <Card
                  icon={"true"}
                  padding="true"
                  title="Emergency Numbers"
                  className="mb-4 max-w-max"
                >
                  <table className="info-table table-responsible w-full">
                    <HeaderTable headers={headerEmergency} />
                    <tbody>
                      {allData.emergency_numbers &&
                        allData.emergency_numbers.map((item, i) => (
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="">{1 + i++}</td>
                            <td>{item.title}</td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Card>
              )}
          </div>

          <div className="md:col-span-3">
            {allData.services && allData.services.length !== 0 && (
              <Card
                icon={"true"}
                defaultOpen={true}
                title="Services"
                className="mb-4 divide-y"
              >
                <div className="divide-y">
                  {allData.services &&
                    allData.services.slice(0, 10).map((x, i) => (
                      <div className="grid grid-cols-12 gap-2 mb-2 py-2">
                        <div className="col-span-12">
                          <h1
                            className="font-medium text-lg truncate"
                            title={x.title}
                          >
                            <p>{x.title}</p>
                          </h1>
                          {x.service_type !== "" && (
                            <div className="text-xs block w-max items-center leading-sm uppercase px-2 py-1 text-blue-500 bg-blue-100 rounded-full">
                              {x.service_type}
                            </div>
                          )}
                          <span className="text-sm">{x.service_time}</span>
                          <span className="text-sm">{x.service_office}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            )}
            {allData.articles && (
              <Card
                icon={"true"}
                title="Recent Post"
                className="mb-4 max-w-max divide-y"
              >
                <div className="divide-y">
                  {allData.articles &&
                    allData.articles.slice(0, 10).map((x, i) => (
                      <div className="grid grid-cols-12 gap-2 mb-2 py-2">
                        <div className="col-span-6 md:col-span-4">
                          <div className="h-[4rem] border overflow-hidden">
                            {x.image === "" ? (
                              <img
                                src={articleImg}
                                className="h-full mx-auto py-2"
                              />
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: x.image && x.image,
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-span-8">
                          <h1
                            className="font-medium text-lg truncate"
                            title={x.title}
                          >
                            <Link to={`/article/${x.id}`}>{x.title}</Link>
                          </h1>
                          <p className="text-sm truncate">{x.body}</p>
                          <span className="text-sm">{x.tags}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            )}
            {allData.documents && (
              <Card icon={"true"} className="max-w-max" title="Recent Document">
                <div className="divide-y">
                  {allData.documents &&
                    allData.documents.slice(0, 10).map((item) => (
                      <div className="grid grid-cols-12 gap-2 mb-2 py-2">
                        <div className="col-span-6 md:col-span-2">
                          <div className="h-[4rem] border overflow-hidden">
                            {item.image === "" ? (
                              <img
                                src={documentImg}
                                className="h-full mx-auto py-2"
                              />
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.image && item.image,
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-span-8">
                          <h1
                            title={item.title}
                            className="font-medium text-lg truncate"
                          >
                            <Link to={`/document/${item.id}`}>
                              {item.title}
                            </Link>
                          </h1>
                          <p className="text-sm truncate">{item.body}</p>
                          <span className="text-sm">{item.document_type}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
