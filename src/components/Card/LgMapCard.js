import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Slider from "react-slick";

export default function LgMapCard(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 9000,
    slidesToScroll: 1,
    // prevArrow: <SamplePrevArrow />,
    // nextArrow: <SampleNextArrow />,
  };
  return (
    <div className="col-cpan-12 px-6 overflow-hidden shadow-md mb-4 py-10">
      <div className="dark:bg-gray-900">
        <div className="mx-auto container w-full flex items-center md:flex-row gap-6 flex-col justify-between px-6 lg:px-0">
          <div className="relative flex flex-col justify-start items-start lg:w-4/6 px-2 lg:px-0">
            <div className="group w-full bg-white rounded-sm py-6">
              <div></div>
              <p className="text-2xl font-bold text-gray-700 ">{props.name}</p>
              <p className="text-2xl font-bold text-gray-700 ">
                <div className="mt-4 leading-6">
                  <p className="text-base font-semibold text-gray-700 mt-2">
                    Email:{" "}
                    <span className="font-semibold md:font-medium">
                      {props.contact && props.contact.email}
                    </span>
                  </p>
                  <p className="text-base font-semibold text-gray-700 mt-2">
                    Phone:{" "}
                    <span className="font-semibold md:font-medium">
                      {props.contact && props.contact.phone}
                    </span>
                  </p>
                </div>
              </p>
            </div>
            <Link
              to={`/lg-glance/${props.lgId}`}
              className="mt-6 inline-flex relative block text-sm font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow"
            >
              स्थानीय तहको पृष्ठमा जानुहोस्
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="m-auto ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
          <div className="flex justify-center items-center lg:w-2/6 map-card-slider mt-10 md:mt-0">
            <Slider
              {...settings}
              className="carousel-inner relative w-full overflow-hidden"
            >
              {props.representative &&
                props.representative !== "No data" &&
                props.representative.map((item) => (
                  <div className="w-full max-w-sm">
                    <div className="w-full h-full h-[8rem] overflow-hidden">
                      {item && item.photo === "" ? (
                        <img
                          src={logo}
                          alt=""
                          className="w-full h-full h-[8rem]"
                        />
                      ) : (
                        <div
                          className="w-full h-full h-[8rem] overflow-hidden"
                          dangerouslySetInnerHTML={{
                            __html: item.photo,
                          }}
                        />
                      )}
                    </div>
                    <div className="bg-white shadow-sm p-4">
                      <h2 className="text-center text-gray-800 text-md font-bold pt-1 truncate">
                        {item.title}
                      </h2>
                      <div className="w-5/6 m-auto">
                        <p className="text-center text-gray-500 pt-1 truncate">
                          {item.position}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
