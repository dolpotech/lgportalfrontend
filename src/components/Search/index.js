import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaKeyboard, FaExternalLinkAlt } from "react-icons/fa";
import { useStateValue } from "../../utils/StateProvider";
import UseInput from "../../utils/UseInput";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import electedImg from "../../assets/elected.png";
import documentImg from "../../assets/document.png";
import websiteImg from "../../assets/website.png";
import contactImg from "../../assets/contact.png";
import staffImg from "../../assets/staff.png";
import serviceImg from "../../assets/service.png";
import articleImg from "../../assets/article.png";
import { searchCard } from "../../api/";
import { changeIndexToNepali } from "../../utils";
import i18next from "i18next";
import { toast } from "react-toastify";

export default function Search() {
  const [card, setCard] = useState();
  const { t } = useTranslation();
  const [{ size }, dispatch] = useStateValue();
  const { value: text, bind: bindText, reset: resetText } = UseInput("");
  const [data, setData] = useState();
  const style = {
    resizableFont: `${
      size == 1 || size === null
        ? " text-sm"
        : size == 2
        ? " text-base"
        : size == 3
        ? " text-lg"
        : size == 4
        ? " text-xl"
        : " text-2xl"
    }`,
  };
  let navigate = useNavigate();

  const searchText = async (e) => {
    e.preventDefault();
    if (text.length > 3) {
      navigate(`/results?keyword=${text}`);
    } else {
      toast.error("कृपया कम्तिमा ३ अक्षरहरू प्रविष्ट गर्नुहोस्!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const categoryData = [
    {
      title: t("elected_official"),
      count: card && card.electedofficial,
      category: "elected_representative",
      image: electedImg,
    },
    {
      title: t("staffs"),
      count: card && card.staff,
      category: "staff",
      image: staffImg,
    },
    {
      title: t("website_directory"),
      count: card && card.websitedirctory,
      category: "website_directory",
      image: websiteImg,
    },
    {
      title: t("documents"),
      count: card && card.documents,
      category: "document",
      image: documentImg,
    },
    {
      title: t("services"),
      count: card && card.services,
      category: "service",
      image: serviceImg,
    },
    {
      title: t("article"),
      count: card && card.articles,
      category: "contact",
      image: articleImg,
    },
  ];
  useEffect(() => {
    const getData = async () => {
      dispatch({
        type: "SET_LOADING",
        item: true,
      });
      let data = await searchCard();
      await setCard(data.data);
      if (data) {
        dispatch({
          type: "SET_LOADING",
          item: false,
        });
      }
    };
    getData();
  }, []);
  return (
    <div className="absolute top-0 z-10 w-full flex flex-row h-full justify-center items-center">
      <div className="max-w-6xl absolute md:bottom-[-6rem] bg-white shadow p-4 rounded-2xl mx-auto">
        <div className="flex justify-between mb-2 px-2">
          <h3 className="text-gray-600 text-lg font-semibold mb-2 block">
            पोर्टल भर खोज्नुहोस्
          </h3>
          <Link
            to="/advance_search"
            className={
              style.resizableFont +
              "hover:underline px-4 py-1 flex items-center hover:underline"
            }
          >
            <FaExternalLinkAlt className="text-[.75rem] mr-2" />
            {t("advance_search")}
          </Link>
        </div>

        <form onSubmit={searchText}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            {t("search")}
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <FaKeyboard className="text-[#2571bb] text-[1.5rem]" />{" "}
            </div>
            <input
              {...bindText}
              type="search"
              id="default-search"
              className="block p-4 pl-12 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={"खोज्न यहाँ टाइप गर्नुहोस्"}
              required
            />
            <button
              type="submit"
              className="flex text-white absolute right-2.5 bottom-2.5 bg-[#276fb9] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {" "}
              <FaSearch className="text-[#fff] relative top-[3px] right-[3px]" />
              {t("search")}
            </button>
          </div>
        </form>
        <div className="flex items-center hidden md:block">
          <div className="mt-1 w-full">
            <div className="grid grid-cols-12 gap-2 bg-white shadow-sm rounded">
              {categoryData.map((item) => (
                <div className="col-span-12  sm:col-span-4 md:col-span-2">
                  <div className="flex flex-row  py-4 px-2">
                    <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                      <img src={item.image} className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col flex-grow ml-4">
                      <Link
                        to={`/advance_search?category=${item.category}`}
                        className="text-sm text-gray-500 truncate"
                      >
                        {item.title}
                      </Link>
                      <div className="font-bold text-lg">
                        {i18next.language === "np"
                          ? changeIndexToNepali(item.count)
                          : item.count}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
