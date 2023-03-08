import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Link, Navigate } from "react-router-dom";
import UseInput from "../../utils/UseInput";
import { adminLogin } from "../../api";
import { useStateValue } from "../../utils/StateProvider";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const [{ language, size, isAuthenticated }, dispatch] = useStateValue();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { value: email, bind: bindEmail, reset: resetEmail } = UseInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = UseInput("");
  // Data To Post
  let dataToPost = {
    email: email,
    password: password,
  };
  const postData = async (e) => {
    setLoading(true);
    setData(await adminLogin(dataToPost));
    if (data === "error") {
      setLoading(false);
    }
    console.log(data);
  };
  useEffect(() => {
    if (data && data.status) {
      dispatch({
        type: "CHANGE_LOGIN_STATE",
        item: data.status === "success" ? true : false,
      });
      data && setLoading(false);
      console.log(data);
      data && localStorage.setItem("userData", JSON.stringify(data.data.user));
      data && localStorage.setItem("token", JSON.stringify(data.data.token));
    } else if (data === "error") {
      dispatch({
        type: "CHANGE_LOGIN_STATE",
        item: false,
      });
    }
  }, [data, dispatch]);
  return (
    <section className="w-full min-h-[7vh] flex items-center">
      {data && <Navigate to="/dashboard" replace />}
      {isAuthenticated && <Navigate to="/dashboard" replace />}
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4 pt-[2rem]">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 mt-[1rem] font-bold flex justify-center w-full">
                  <img className="w-20 p-1" src={logo} />
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    postData();
                  }}
                >
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      प्रयोगकर्ता नाम
                    </label>
                    <input
                      type="email"
                      {...bindEmail}
                      required
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder="Email"
                      style={{ transition: "all 0.15s ease 0s" }}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      पासवर्ड
                    </label>
                    <input
                      {...bindPassword}
                      type="password"
                      required
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                      placeholder="Password"
                      style={{ transition: "all 0.15s ease 0s" }}
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className={
                        (loading
                          ? "cursor-not-allowed focus:outline-none disabled:opacity-75 "
                          : "") +
                        "w-full relative block text-sm font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow"
                      }
                      type="submit"
                      disabled={loading ? "disabled" : ""}
                      style={{ transition: "all 0.15s ease 0s" }}
                    >
                      {loading ? <div className="load2"></div> : ""}
                      {loading ? "Please Wait.." : t("log_in")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
