import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import NepalMap from "../../components/NepalMap";
import { Link } from "react-router-dom";
import Map from "../../assets/map.jpeg";
import electedImg from "../../assets/elected.png";
import documentImg from "../../assets/document.png";
import websiteImg from "../../assets/website.png";
import contactImg from "../../assets/contact.png";
import staffImg from "../../assets/staff.png";
import serviceImg from "../../assets/service.png";
import telephoneImg from "../../assets/telephone.png";
import articleImg from "../../assets/article.png";
import mapImg from "../../assets/map.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTreeCity,
  faMountainCity,
  faHouseChimney,
  faChartArea,
  faUsers,
  faCity,
} from "@fortawesome/free-solid-svg-icons";
import { getDistrict, getLgByDistrict, getMapData } from "../../api";
import { useStateValue } from "../../utils/StateProvider";
import Articles from "../../components/Articles";
import CategoryCard from "../../components/Card/CategoryCard";
import MapCard from "../../components/Card/MapCard";
import { changeIndexToNepali, changeNepaliIndexToEnglish } from "../../utils";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import LgMapCard from "../../components/Card/LgMapCard";

export default function Home() {
  const { t } = useTranslation();
  const [{ lgIds, localId }, dispatch] = useStateValue();
  const [districts, setDistricts] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("district");
  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    const getDataForMap = async () => {
      let data = await getMapData(`?district_id=${lgIds}`);
      setMapData(data.data);
      if (data) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    getDataForMap();
  }, [lgIds]);
  useEffect(() => {
    dispatch({
      type: "SET_LGID",
      item: "",
    });
    dispatch({
      type: "SET_LG_ID",
      item: "",
    });
  }, [window.history]);

  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      item: true,
    });
    const getLgData = async () => {
      try {
        let data;
        if (lgIds === 0) {
          data = await getMapData(`?lg_id=${localId}`);
        } else {
          data = await getMapData(`?lg_id=${localId}`);
        }
        setMapData(data.data);
        if (data) {
          dispatch({
            type: "SET_LOADING",
            item: false,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (localId !== "") {
      getLgData();
    }
  }, [localId]);
  const mapNewData = [
    {
      title: t("metropolitan"),
      number: mapData.metropolitan,
      icon: <FontAwesomeIcon icon={faCity} />,
    },
    {
      title: t("sub_municipality"),
      number: mapData.submetropolitan,
      icon: <FontAwesomeIcon icon={faMountainCity} />,
    },
    {
      title: t("municipality"),
      number: mapData.municipality,
      icon: <FontAwesomeIcon icon={faTreeCity} />,
    },
    {
      title: t("village_municipality"),
      number: mapData.ruralmunicipality,
      icon: <FontAwesomeIcon icon={faHouseChimney} />,
    },
    {
      title: t("total_mun_vil"),
      number: mapData.local_governments,
      icon: <FontAwesomeIcon icon={faChartArea} />,
    },
    {
      title: t("total_district"),
      number: mapData.district,
      icon: <FontAwesomeIcon icon={faChartArea} />,
    },
    {
      title: t("total_ward"),
      number: mapData.totalwards,
      icon: <FontAwesomeIcon icon={faChartArea} />,
    },
    {
      title: t("total_population"),
      number: mapData.population,
      icon: <FontAwesomeIcon icon={faUsers} />,
    },
  ];

  const categoryData = [
    {
      title: t("elected_official"),
      desc: "नाम, सम्पर्क विवरण, तस्विर",
      category: "elected_representative",
      image: electedImg,
    },
    {
      title: t("staffs"),
      desc: "नाम, सम्पर्क विवरण, तस्विर",
      category: "staff",
      image: staffImg,
    },
    {
      title: t("website_directory"),
      desc: "पालिकाको वेबसाइट ठेगाना",
      category: "website_directory",
      image: websiteImg,
    },
    {
      title: t("documents"),
      desc: " ऐन कानुन निर्देशिका, प्रकाशन, प्रतिवेदन",
      category: "document",
      image: documentImg,
    },
    {
      title: t("services"),
      desc: "सिफारिश, घट्ना दर्ता, दर्ता",
      category: "service",
      image: serviceImg,
    },
    {
      title: t("articles"),
      desc: "सूचना तथा समाचार",
      category: "article",
      image: articleImg,
    },
    {
      title: t("resource_map_images"),
      desc: "पालिकाको श्रोत नक्सा",
      category: "resource_map",
      image: mapImg,
    },
    // {
    //   title: "टेलिफोन निर्देशिका",
    //   desc: "Lorem lipsum",
    //   category: "telephone",
    //   image: telephoneImg,
    // },
  ];
  return (
    <div>
      <Banner />
      {/* component */}
      <div className="py-16 bg-gray-50 overflow-hidden pt-40">
        <div className="container lg:px-0 px-4 mx-auto space-y-8 text-gray-500">
          <div>
            <span className="text-gray-600 text-lg font-semibold text-center block">
              {t("sub_dataset")}
            </span>
            <h2 className="mt-1 text-2xl text-gray-900 font-bold md:text-4xl text-center">
              {t("title_dataset")}
            </h2>
          </div>
          <div className="mt-16 grid overflow-hidden gap-4 sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4 py-4">
            {categoryData.map((item) => (
              <CategoryCard data={item} />
            ))}
            <div className="relative group items-center flex divide-x divide-y transition hover:z-[1]">
              <div>
                <div className="relative p-8 space-y-8 grid grid-cols-6">
                  <div className="space-y-2 col-span-4">
                    <p className={" text-gray-700 font-bold "}> +२ थप </p>
                    <Link
                      Link
                      to="/advance_search"
                      className="flex justify-between w-max items-center group-hover:text-[#2571bb]"
                    >
                      <span>{t("see_all")}</span>
                      <span className="-translate-x-4 opacity-0 text-xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container lg:px-0 px-4 mx-auto">
        <div className="mt-16">
          <span className="text-gray-600 text-lg font-semibold text-center block">
            {t("sub_map")}
          </span>
          <h2 className="mt-1 text-2xl text-gray-900 font-bold md:text-4xl text-center">
            {t("title_map")}
          </h2>
        </div>
        <section className="mt-16 grid md:grid-cols-12 gap-4">
          <div className="lg:col-span-8 md:col-span-12">
            <NepalMap />
          </div>
          <div className="lg:col-span-4 md:col-span-12">
            <h3 className="text-xl text-center mb-4 font-semibold text-gray-800 dark:text-gray-200">
              {mapData.district_name ? mapData.district_name : t("logo_title")}
            </h3>
            {/* Cards */}
            {localId === "" ? (
              <div className="grid gap-2 mb-8 md:grid-cols-2 xl:grid-cols-2">
                {mapNewData.map((item) => (
                  <MapCard
                    title={item.title}
                    number={
                      i18next.language === "np"
                        ? changeIndexToNepali(item.number)
                        : item.number
                    }
                    icon={item.icon}
                  />
                ))}
              </div>
            ) : (
              <LgMapCard
                name={mapData && mapData.lg_name}
                contact={mapData.contact_data && mapData.contact_data}
                representative={mapData && mapData.representative}
                lgId={localId}
              />
            )}
          </div>
        </section>
        <div className="mx-auto px-4 lg:px-0 container mt-2">
          <Articles />
        </div>
      </div>
    </div>
  );
}
