import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { singleDocument } from "../../api";
import Slider from "react-slick";
import { useStateValue } from "../../utils/StateProvider";
import Card from "../../components/Card";
import logo from "../../assets/logo.svg";

export default function SingleDocument() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 9000,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: null,
    // prevArrow: <SamplePrevArrow />,
    // nextArrow: <SampleNextArrow />,
  };
  const [data, setData] = useState();
  const [{ loading }, dispatch] = useStateValue();
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      let articleData = await singleDocument(id);
      setData(articleData.data);
      if (articleData) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };

    getData();
    let str =
      '<img typeof="foaf:Image" src="https://nisdimun.gov.np/sites/nisdimun.gov.np/files/IMG_2897.JPG" width="1365" height="910" alt="" />, <img typeof="foaf:Image" src="https://nisdimun.gov.np/sites/nisdimun.gov.np/files/IMG_2999.JPG" width="1365" height="910" alt="" />, <img typeof="foaf:Image" src="https://nisdimun.gov.np/sites/nisdimun.gov.np/files/IMG_3043.JPG" width="1365" height="910" alt="" />';

    console.log(str.split(","));
    if (document.querySelectorAll(".document-file")) {
      var linkList = document.querySelectorAll(".document-file a");
      for (let i = 0; i < linkList.length; i++) {
        linkList[i].setAttribute("target", "_blank");
        linkList[i].setAttribute("class", "hover:underline-offset-1");
      }
    }
  }, [id]);
  const splittingFunc = (val) => {
    let newVal;
    newVal = val.replace(/['"]+/g, "");
    newVal = newVal.slice(128);
    newVal = newVal.split(" ")[0];
    return newVal;
  };

  if (document.querySelectorAll(".document-file")) {
    var linkList = document.querySelectorAll(".document-file a");
    for (let i = 0; i < linkList.length; i++) {
      linkList[i].setAttribute("target", "_blank");
    }
  }

  return (
    <div className="container mx-auto mt-5">
      <nav className="flex" aria-label="Breadcrumb" className="mb-5">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              to="/"
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
                कागजातहरू
              </a>
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
                {data && data.document.map((item) => item.title)}
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="grid md:grid-cols-12 gap-5 mt-5">
        <div className="md:col-span-9 px-6 overflow-hidden shadow-md">
          {data &&
            data.document.map((item) => (
              <main className="">
                <div className="mb-4 pt-6 md:mb-0 w-full mx-auto relative">
                  {item.image !== "" ? (
                    <Slider
                      {...settings}
                      className="carousel-inner w-full max-h-fit relative w-full overflow-hidden article-slider max-h-80"
                    >
                      {item.image.split(",").map((item) => (
                        <div
                          className="w-full object-cover lg:rounded mt-5 article-img"
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                        />
                      ))}
                    </Slider>
                  ) : (
                    ""
                  )}
                  <div className="px-4 mt-5 lg:px-0">
                    <p className="mb-2 lg:text-sm text-xs text-gray-600 dark:text-gray-300 font-medium leading-none">
                      {item.localgovernment_name} (
                      <a
                        className="hover:text-[#276fb9] hover:underline"
                        href={item.source}
                        target="_blank"
                      >
                        {item.source}
                      </a>
                      )
                    </p>
                    <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                      {item.title}
                    </h2>
                    <div className="text-xs inline-flex mt-5 items-center font-bold leading-sm uppercase px-3 py-1 bg-[#276fb9] text-white rounded-full">
                      {item.document_type}
                    </div>
                  </div>
                  {item.documents && (
                    <div className="mt-4 items-center inline-flex relative block text-sm font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow">
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div
                        className="document-file"
                        dangerouslySetInnerHTML={{
                          __html: item.documents,
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col lg:flex-row lg:space-x-12">
                  <div className="px-4 lg:px-0 mt-5 text-gray-700 text-lg leading-relaxed w-full lg:w-4/4">
                    <iframe
                      className="w-full h-[30rem]"
                      src={splittingFunc(item.documents)}
                      title={item.title}
                    ></iframe>
                  </div>
                </div>
              </main>
            ))}
        </div>
        <div className="md:col-span-3 sticky inset-x-0 top-14 left-0">
          <Card title="सम्बन्धित कागजातहरू">
            <div className="divide-y">
              {data &&
                data.related_documents.map((item) => (
                  <div className="grid grid-cols-12 gap-2 py-2">
                    <div className="col-span-4">
                      <div className="h-[3rem] border overflow-hidden">
                        {item.image === "" ? (
                          <img src={logo} className="h-full mx-auto" />
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
                        <Link to={`/document/${item.id}`}>{item.title}</Link>
                      </h1>
                      <p className="text-sm truncate">{item.body}</p>

                      <span className="text-sm">{item.document_type}</span>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
