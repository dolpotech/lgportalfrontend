import React from "react";
import Slider from "react-slick";
import Search from "../Search";
import image1 from "../../assets/lumbini.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
// const style = {
//   wrapper: `relative`,
//   container: `bg-gray-900 text-gray-300 sm:flex overflow-hidden lg:overflow-visible`,
//   contentWrapper: `relative sm:max-w-md lg:max-w-xl sm:flex-none p-6 sm:py-10 sm:pl-8 lg:py-12 lg:pl-14 xl:pt-14 xl:pb-16`,
//   title: `text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4`,
//   description: `mb-8 sm:mb-10 leading-relaxed`,
//   input: `block w-full px-4 py-3 sm:text-sm bg-gray-700 text-gray-200 rounded-lg placeholder-gray-400 focus:bg-white focus:text-gray-900 focus:outline-none`,
//   actionContainer: `flex w-full `,
//   accentedButton: `relative w-full sm:w-auto block text-sm font-semibold bg-[#2572bc] rounded-lg text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc]`,
//   button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
// };
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="slick-arrow slick-next"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <FaAngleRight />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="slick-arrow slick-prev"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <FaAngleLeft />
    </div>
  );
}
export default function Banner() {
  const settings = {
    dots: false,
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
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide relative"
      data-bs-ride="carousel"
    >
      <Search />
      <Slider
        {...settings}
        className="fixed carousel-inner relative w-full overflow-hidden"
      >
        <div className="fixed imageStyle carousel-item active relative float-left w-full h-[50vh] md:h-auto overflow-hidden">
          <img
            src={image1}
            className="block w-full h-[50vh] md:h-auto"
            alt="Wild Landscape"
          />
        </div>
        <div className="imageStyle carousel-item relative float-left w-full h-[50vh] md:h-auto overflow-hidden">
          <img
            src={image1}
            className="block w-full h-[50vh] md:h-auto"
            alt="Camera"
          />
        </div>
      </Slider>
    </div>
  );
}
