import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useStateValue } from "../../utils/StateProvider";
import { toast } from "react-toastify";
import { useDetectOutsideClick } from "../../utils/Helpers/useDetectOutsideClick";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Header = () => {
  const { t } = useTranslation();
  const [scroll, setScroll] = useState(false);
  const [{ size, isAuthenticated, user, role }, dispatch] = useStateValue();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const dropdownToggle = () => setIsActive(!isActive);

  const setSize = (size) => {
    dispatch({
      type: "SET_SIZE",
      item: parseInt(size),
    });
  };
  const logOut = () => {
    localStorage.clear();
    dispatch({
      type: "CHANGE_LOGIN_STATE",
      item: false,
    });
    toast.success("Logged out sucessfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 1);
    });
  }, []);
  // useEffect(() => {
  //   window.location.reload();
  // }, [i18next.language]);
  const [showDp, setShowDp] = useState(false);
  const handlePlusFont = () => {
    if (size < 4) {
      setSize(size + 1);
    }
  };

  const handleMinusFont = () => {
    if (size > 1) {
      setSize(size - 1);
    }
  };
  const handleResetFont = () => {
    setSize(2);
  };

  const style = {
    wrapper: `bg-[#ffff] w-full py-[1rem] container mx-auto flex `,
    logoContainer: `flex items-center cursor-pointer h-20`,
    textWrapper: `flex flex-col`,
    logoMainText: `ml-[0.8rem] text-[#676767] text-2xl w-auto`,
    logoText: ` ml-[0.8rem] text-[#2572bc] text-md w-auto`,
    logoSubText: ` ml-[0.8rem] text-[#e24333] text-md w-auto`,
    headerItems: ` flex flex-1 items-center justify-end`,
    headerItem: `text-white px-4 text-[#0e0e0ecc] hover:text-[#2572bc] cursor-pointer`,
    menuItem: `block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-[#276fb9] md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`,
    accentedButton: `block p-2 bg-[#2572bc] text-white rounded-lg`,
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
  let roleId = "";
  if (localStorage.getItem("userData")) {
    roleId = JSON.parse(localStorage.getItem("userData")).roles.map(
      (item) => item.pivot.role_id
    );
  }

  return (
    <>
      <nav
        className={
          "shadow-navbar-custom transition-all duration-100 ease-linear delay-75 sticky top-0 z-[1001] bg-white border-gray-200 sm:px-4 dark:bg-gray-800 py-4"
        }
      >
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-1 w-20" />
            {/* <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"> */}
            <div className={style.textWrapper}>
              <div className={style.logoMainText}>{t("logo_title")}</div>
              <div className={style.resizableFont + style.logoText}>
                {t("logo_subtitle")}
              </div>
              <div className={style.resizableFont + style.logoSubText}>
                {t("logo_subtitle_r")}
              </div>
            </div>
            {/* </span> */}
          </Link>
          {/* For Mobile View */}
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <div className={"flex justify-end"}>
              <ul className="flex mb-3">
                {/* laguage switcher */}
                <div className="mr-5">
                  <a
                    className={`${
                      i18next.language === "np" && "font-semibold "
                    }text-gray-700 text-sm hover:underline select-none cursor-pointer`}
                    onClick={() => i18next.changeLanguage("np")}
                  >
                    नेपाली
                  </a>
                  <span className="text-gray-700"> |</span>{" "}
                  <a
                    className={`${
                      i18next.language === "en" && "font-semibold "
                    }text-gray-700 text-sm hover:underline select-none cursor-pointer`}
                    onClick={() => i18next.changeLanguage("en")}
                  >
                    English
                  </a>
                </div>
                {/* laguage switcher end */}
                <li className="mr-1">
                  <a
                    className="w-[22px] p-[0.2rem] cursor-pointer hover:underline hover:text-white"
                    onClick={handlePlusFont}
                  >
                    <span className="text-gray-700 text-sm font-semibold select-none">
                      A+
                    </span>
                  </a>
                </li>
                <li className="mr-1">
                  <a
                    className="w-[22px] p-[0.2rem] cursor-pointer hover:underline hover:text-white"
                    onClick={handleResetFont}
                  >
                    <span className="text-gray-700 text-sm font-semibold select-none">
                      A
                    </span>
                  </a>
                </li>
                <li className="mr-1">
                  <a
                    className="w-[22px] p-[0.2rem] cursor-pointer hover:underline hover:text-white"
                    onClick={handleMinusFont}
                  >
                    <span className="text-gray-700 text-sm font-semibold select-none">
                      A-
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            {/* Main Navigation */}
            <ul className="flex flex-col items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link
                  to="/"
                  className={
                    location.pathname === "/"
                      ? "text-[#276fb9] " + style.menuItem + style.resizableFont
                      : style.menuItem + style.resizableFont
                  }
                  aria-current="page"
                >
                  {t("header_home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/lg-glance"
                  className={
                    location.pathname === "/lg-glance"
                      ? "text-[#276fb9] " + style.menuItem + style.resizableFont
                      : style.menuItem + style.resizableFont
                  }
                  id="increase"
                >
                  {t("header_glance")}
                </Link>
              </li>
              <li>
                <Link
                  to="/advance_search"
                  className={
                    location.pathname === "/advance_search"
                      ? "text-[#276fb9] " + style.menuItem + style.resizableFont
                      : style.menuItem + style.resizableFont
                  }
                  id="increase"
                >
                  {t("header_search")}
                </Link>
              </li>
              {/* Logged In User Navigation */}
              {isAuthenticated ? (
                <li className="relative">
                  <button
                    type="button"
                    onClick={dropdownToggle}
                    className="flex flex-row justify-center"
                  >
                    <div className="w-8 h-8 relative flex justify-center items-center rounded-full bg-[#2670ba] text-l text-white uppercase">
                      {JSON.parse(localStorage.getItem("userData")).name.slice(
                        0,
                        1
                      )}
                    </div>
                  </button>

                  {isActive && (
                    <div
                      ref={dropdownRef}
                      id="dropdown"
                      className="absolute w-52 z-20 bg-white divide-y divide-gray-100 rounded transform-none shadow dark:bg-gray-700 dropdown-force"
                    >
                      <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                        <div className="font-semibold">
                          {JSON.parse(localStorage.getItem("userData")).name}
                        </div>
                        <span className="text-sm font-semibold">
                          {JSON.parse(
                            localStorage.getItem("userData")
                          ).roles.map((item) => item.name)}
                        </span>
                        <div className="font-medium truncate">
                          {JSON.parse(localStorage.getItem("userData")).email}
                        </div>
                      </div>
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefault"
                      >
                        <Link
                          to="/dashboard"
                          onClick={() => setIsActive(false)}
                          className="dropdown-menu-item block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {t("dashboard")}
                        </Link>
                        {/* For Ministry Admin Only */}
                        {roleId == 2 && (
                          <Link
                            to="/information-collection-section"
                            onClick={() => setIsActive(false)}
                            className="dropdown-menu-item block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            नयाँ जानकारी सङ्कलन गर्नुहोस्
                          </Link>
                        )}
                        {/* For Ministry Admin Only */}
                        {roleId == 2 && (
                          <Link
                            to="/offices"
                            onClick={() => setIsActive(false)}
                            className="dropdown-menu-item block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            कार्यालयहरू
                          </Link>
                        )}
                        {/* For Admins Only */}
                        {roleId == 2 || roleId == 8 || roleId == 5 ? (
                          <Link
                            to="/create-user"
                            onClick={() => setIsActive(false)}
                            className="dropdown-menu-item block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            {t("create_users")}
                          </Link>
                        ) : (
                          ""
                        )}
                        <Link
                          to="/notification"
                          onClick={() => setIsActive(false)}
                          className="dropdown-menu-item block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {t("notifications")}
                        </Link>
                      </ul>
                      <div className="py-1">
                        <a
                          onClick={() => {
                            logOut();
                            setIsActive(false);
                          }}
                          href="#"
                          className="flex items-center py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          {t("log_out")}
                        </a>
                      </div>
                    </div>
                  )}
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className={style.accentedButton + style.resizableFont}
                  >
                    लगइन
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
