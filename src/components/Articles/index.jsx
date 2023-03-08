import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { getArticle } from "../../api";
import { useStateValue } from "../../utils/StateProvider";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import articleImg from "../../assets/article.png";
import { useTranslation } from "react-i18next";

export default function Articles() {
  const { t } = useTranslation();
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
  const [articleData, setData] = useState();
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    const getData = async () => {
      let data = await getArticle();

      if (data) {
        setData(data);
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    getData();
  }, []);
  const splittingFunc = (val) => {
    let newVal;
    newVal = val.replace(/['"]+/g, "");
    newVal = newVal.slice(27);
    newVal = newVal.split(" ")[0];
    return newVal;
  };
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="overflow-hidden shadow">
        <div
          className={
            "pl-3 py-4 bg-blue-100 text-center block font-base font-bold capitalize "
          }
        >
          {t("whats_new")}
        </div>
        <div className="grid md:grid-cols-12">
          <div className="col-span-3 p-4">
            <img src={articleImg} alt="" className="w-full m-auto" />
          </div>
          <Slider
            {...settings}
            className="carousel-inner relative w-full overflow-hidden article-slider col-span-9"
          >
            {articleData &&
              articleData.recent.map((item) => (
                <div className="w-full">
                  <div className="bg-white overflow-hidden mb-2">
                    <div className="p-4">
                      <h3>
                        <Link
                          to={`/article/${item.id}`}
                          className="font-semibold text-dark text-base my-2 block hover:text-primary truncate"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <div className="text-xs inline-flex items-center leading-sm uppercase px-2 py-1 text-blue-500 bg-blue-100 rounded-full">
                        {item.tags}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
      <div className="overflow-hidden shadow">
        <div
          className={
            "pl-3 py-4 bg-blue-100 text-center block font-base font-bold capitalize "
          }
        >
          {t("most_viewed")}
        </div>
        <div className="grid md:grid-cols-12">
          <div className="col-span-3 p-4">
            <img src={articleImg} alt="" className="w-full m-auto" />
          </div>
          <Slider
            {...settings}
            className="carousel-inner relative w-full overflow-hidden article-slider col-span-9"
          >
            {articleData &&
              articleData.most_viewed.map((item) => (
                <div className="w-full">
                  <div className="bg-white overflow-hidden mb-2">
                    <div className="p-4">
                      <h3>
                        <Link
                          to={`/article/${item.id}`}
                          className=" font-semibold text-dark text-base my-2 block hover:text-primary truncate"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <div>{item.updated_at}</div>
                      <div className="text-xs inline-flex items-center leading-sm uppercase px-2 py-1 text-blue-500 bg-blue-100 rounded-full">
                        {item.tags}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>

      <div className="overflow-hidden shadow">
        <div
          className={
            "pl-3 py-4 bg-blue-100 text-center block font-base font-bold capitalize "
          }
        >
          {t("most_searched")}
        </div>
        <div className="grid md:grid-cols-12">
          <div className="col-span-3 p-4">
            <img src={articleImg} alt="" className="w-full m-auto" />
          </div>
          <Slider
            {...settings}
            className="carousel-inner relative w-full overflow-hidden article-slider col-span-9"
          >
            {articleData &&
              articleData.most_searched.map((item) => (
                <div className="w-full">
                  <div className="bg-white overflow-hidden mb-2">
                    <div className="p-4">
                      <h3>
                        <Link
                          to={`/article/${item.id}`}
                          className=" font-semibold text-dark text-base  my-2 block hover:text-primary truncate"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <div className="text-xs inline-flex items-center leading-sm uppercase px-2 py-1 text-blue-500 bg-blue-100 rounded-full">
                        {item.tags}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
