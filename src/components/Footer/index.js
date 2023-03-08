import React from "react";
import logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";
import { useTranslation } from "react-i18next";

const style = {
  footerWrapper: `bg-[#e7e8e8] container mx-auto px-[3rem] py-[1rem] flex justify-center`,
  footerText: `text-[#5a5a5a] text-sm `,
};
export default function Footer() {
  const { t } = useTranslation();
  const [{ size, isAuthenticated, user, role }, dispatch] = useStateValue();
  const style = {
    resizableFont: `${
      size == 1 || size === null
        ? " text-base"
        : size == 2
        ? " text-lg"
        : size == 3
        ? " text-xl"
        : size == 4
        ? " text-2xl"
        : " text-3xl"
    }`,
  };
  return (
    <footer
      className="wow fadeInUp relative z-10 bg-[#2571bb] pt-10 lg:pt-[60px] mt-[5rem]"
      data-wow-delay=".15s"
      style={{ visibility: "visible", animationDelay: "0.15s" }}
    >
      <div className="container px-4 mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="flex h-[inherit] items-center w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-4/12">
            <div className="mb-10 w-full">
              <Link to="/" className="flex items-center">
                <img src={logo} className="mr-1 w-20" />
                <div className="flex flex-col mb-4">
                  <div className="ml-[0.8rem] text-[#ffffff] text-3xl w-auto">
                    {t("logo_title")}
                  </div>
                  {/* <div className=" text-base ml-[0.8rem] text-[#ffffff] text-md w-auto">
                    स्थानीय तह वित्तीय सुशासन जोखिम मूल्याङ्कन
                  </div> */}
                  <div className=" text-base ml-[0.8rem] text-[#e24333] text-md w-auto">
                    {t("logo_subtitle")}
                  </div>
                </div>
              </Link>
              <p className="mb-7 text-base text-[#f3f4fe]">
                यस प्रणालीमा प्रदेश स्थिति सबै स्थानीय तहहरूको आधिकारिक
                वेबसाइटबाट स्वचालित रूपमा सूचनाहरू संकलन गरिन्छ । स्थानीय तहको
                सूचना, समाचार, प्रकाशन, प्रगति प्रतिवेदन, संस्थागत जानकारी,
                कर्मचारीको जानकारी र अन्य स्थानीय सरकारका जानकारी यस प्रणालीमा
                एकीकृत हुन्छ ।यसरी एकीकृत गरिएको सूचना सजिलैसँग गर्न सकिने
                व्यवस्था गरिएको छ ।
              </p>
              <div className="-mx-3 flex items-center">
                <a
                  href="javascript:void(0)"
                  className="px-3 text-[#dddddd] hover:text-white"
                >
                  <svg
                    width={10}
                    height={18}
                    viewBox="0 0 10 18"
                    className="fill-current"
                  >
                    <path d="M9.00007 6.82105H7.50006H6.96434V6.27097V4.56571V4.01562H7.50006H8.62507C8.91971 4.01562 9.16078 3.79559 9.16078 3.46554V0.550085C9.16078 0.247538 8.9465 0 8.62507 0H6.66969C4.55361 0 3.08038 1.54024 3.08038 3.82309V6.21596V6.76605H2.54466H0.72322C0.348217 6.76605 0 7.06859 0 7.50866V9.48897C0 9.87402 0.294645 10.2316 0.72322 10.2316H2.49109H3.02681V10.7817V16.31C3.02681 16.6951 3.32145 17.0526 3.75003 17.0526H6.26791C6.42862 17.0526 6.56255 16.9701 6.66969 16.8601C6.77684 16.7501 6.8572 16.5576 6.8572 16.3925V10.8092V10.2591H7.4197H8.62507C8.97328 10.2591 9.24114 10.0391 9.29471 9.709V9.6815V9.65399L9.66972 7.7562C9.6965 7.56367 9.66972 7.34363 9.509 7.1236C9.45543 6.98608 9.21436 6.84856 9.00007 6.82105Z" />
                  </svg>
                </a>
                <a
                  href="javascript:void(0)"
                  className="px-3 text-[#dddddd] hover:text-white"
                >
                  <svg
                    width={19}
                    height={15}
                    viewBox="0 0 19 15"
                    className="fill-current"
                  >
                    <path d="M16.2622 3.17878L17.33 1.93293C17.6391 1.59551 17.7234 1.33595 17.7515 1.20618C16.9085 1.67337 16.1217 1.82911 15.6159 1.82911H15.4192L15.3068 1.72528C14.6324 1.18022 13.7894 0.894714 12.8902 0.894714C10.9233 0.894714 9.37779 2.40012 9.37779 4.13913C9.37779 4.24295 9.37779 4.39868 9.40589 4.5025L9.49019 5.02161L8.90009 4.99565C5.30334 4.89183 2.35288 2.03675 1.87518 1.5436C1.08839 2.84136 1.53799 4.08722 2.01568 4.86587L2.97107 6.31937L1.45369 5.54071C1.48179 6.63084 1.93138 7.48736 2.80247 8.11029L3.56116 8.62939L2.80247 8.9149C3.28017 10.2386 4.34795 10.7837 5.13474 10.9913L6.17443 11.2509L5.19094 11.8738C3.61736 12.912 1.65039 12.8342 0.779297 12.7563C2.54957 13.8983 4.65705 14.1579 6.11823 14.1579C7.21412 14.1579 8.02901 14.0541 8.2257 13.9762C16.0936 12.2631 16.4589 5.77431 16.4589 4.47655V4.29486L16.6275 4.19104C17.5829 3.36047 17.9763 2.91923 18.2011 2.65967C18.1168 2.68563 18.0044 2.73754 17.892 2.7635L16.2622 3.17878Z" />
                  </svg>
                </a>
                <a
                  href="javascript:void(0)"
                  className="px-3 text-[#dddddd] hover:text-white"
                >
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    className="fill-current"
                  >
                    <path d="M8.91688 12.4995C10.6918 12.4995 12.1306 11.0911 12.1306 9.35385C12.1306 7.61655 10.6918 6.20819 8.91688 6.20819C7.14197 6.20819 5.70312 7.61655 5.70312 9.35385C5.70312 11.0911 7.14197 12.4995 8.91688 12.4995Z" />
                    <path d="M12.4078 0.947388H5.37075C2.57257 0.947388 0.300781 3.17104 0.300781 5.90993V12.7436C0.300781 15.5367 2.57257 17.7604 5.37075 17.7604H12.3524C15.2059 17.7604 17.4777 15.5367 17.4777 12.7978V5.90993C17.4777 3.17104 15.2059 0.947388 12.4078 0.947388ZM8.91696 13.4758C6.56206 13.4758 4.70584 11.6047 4.70584 9.35389C4.70584 7.10312 6.58976 5.23199 8.91696 5.23199C11.2165 5.23199 13.1004 7.10312 13.1004 9.35389C13.1004 11.6047 11.2442 13.4758 8.91696 13.4758ZM14.735 5.61164C14.4579 5.90993 14.0423 6.07264 13.5714 6.07264C13.1558 6.07264 12.7402 5.90993 12.4078 5.61164C12.103 5.31334 11.9368 4.9337 11.9368 4.47269C11.9368 4.01169 12.103 3.65916 12.4078 3.33375C12.7125 3.00834 13.1004 2.84563 13.5714 2.84563C13.9869 2.84563 14.4302 3.00834 14.735 3.30663C15.012 3.65916 15.2059 4.06593 15.2059 4.49981C15.1782 4.9337 15.012 5.31334 14.735 5.61164Z" />
                    <path d="M13.5985 3.82184C13.2383 3.82184 12.9336 4.12013 12.9336 4.47266C12.9336 4.82519 13.2383 5.12349 13.5985 5.12349C13.9587 5.12349 14.2634 4.82519 14.2634 4.47266C14.2634 4.12013 13.9864 3.82184 13.5985 3.82184Z" />
                  </svg>
                </a>
                <a
                  href="javascript:void(0)"
                  className="px-3 text-[#dddddd] hover:text-white"
                >
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    className="fill-current"
                  >
                    <path d="M16.7821 0.947388H1.84847C1.14272 0.947388 0.578125 1.49747 0.578125 2.18508V16.7623C0.578125 17.4224 1.14272 18 1.84847 18H16.7257C17.4314 18 17.996 17.4499 17.996 16.7623V2.15757C18.0525 1.49747 17.4879 0.947388 16.7821 0.947388ZM5.7442 15.4421H3.17528V7.32837H5.7442V15.4421ZM4.44563 6.2007C3.59873 6.2007 2.94944 5.5406 2.94944 4.74297C2.94944 3.94535 3.62696 3.28525 4.44563 3.28525C5.26429 3.28525 5.94181 3.94535 5.94181 4.74297C5.94181 5.5406 5.32075 6.2007 4.44563 6.2007ZM15.4835 15.4421H12.9146V11.509C12.9146 10.5739 12.8864 9.33618 11.5596 9.33618C10.2045 9.33618 10.0069 10.3813 10.0069 11.4265V15.4421H7.438V7.32837H9.95046V8.45605H9.9787C10.3457 7.79594 11.1644 7.13584 12.4347 7.13584C15.0601 7.13584 15.54 8.7861 15.54 11.0414V15.4421H15.4835Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-3/12">
            <div className="mb-10 w-full">
              <h4
                className={
                  "mb-9 font-semibold text-white" + style.resizableFont
                }
              >
                {t("useful_links")}
              </h4>
              <ul>
                <li>
                  <a
                    href="https://ocmcm.lumbini.gov.np/"
                    target="_blank"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    मुख्यमन्त्री तथा मन्त्रिपरिषदको कार्यालय
                  </a>
                </li>

                <li>
                  <a
                    href="http://moha.gov.np/"
                    target="_blank"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    गृह मन्त्रालय
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.opmcm.gov.np/"
                    target="_blank"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    प्रधानमन्त्री तथा मन्त्रिपरिषद्को कार्यालय
                  </a>
                </li>
                <li>
                  <a
                    href="https://moeap.lumbini.gov.np/"
                    target="_blank"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    आर्थिक मामिला तथा सहकारी मन्त्रालय
                  </a>
                </li>
                <li>
                  <a
                    href="https://moics.lumbini.gov.np/"
                    target="_blank"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    उद्योग, वाणिज्य तथा आपूर्ति मन्त्रालय
                  </a>
                </li>
                <li>
                  <a
                    href="https://mosd.lumbini.gov.np/"
                    target="_blank"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    शिक्षा, विज्ञान, युवा तथा खेलकुद मन्त्रालय
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-3/12">
            <div className="mb-10 w-full">
              <h4
                className={
                  "mb-9 font-semibold text-white" + style.resizableFont
                }
              >
                {t("useful_links")}
              </h4>
              <ul>
                <li>
                  <a
                    href="https://molmac.lumbini.gov.np/"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    कृषि, खाद्य प्रविधि तथा भूमि व्यवस्था मन्त्रालय
                  </a>
                </li>
                <li>
                  <a
                    href="http://nepal.gov.np/"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    नेपाल सरकारको आधिकारिक पोर्टल
                  </a>
                </li>
                <li>
                  <a
                    href="https://moial.lumbini.gov.np/"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    आन्तरिक मामिला तथा संचार मन्त्रालय
                  </a>
                </li>
                <li>
                  <a
                    href="http://pradeshsabha.p5.gov.np/"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    प्रदेश सभा सचिवालय, लुम्बिनी प्रदेश
                  </a>
                </li>
                <li>
                  <a
                    href="http://ocos.p5.gov.np/"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    प्रदेश प्रमुखको कार्यालय, लुम्बिनी प्रदेश
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-2/12">
            <div className="mb-10 w-full">
              <h4
                className={
                  "mb-9 font-semibold text-white" + style.resizableFont
                }
              >
                {t("contact")}
              </h4>
              <ul>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    {t("logo_subtitle")}
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    मुकाम: बुटवल, नेपाल
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    फोन: +९७७-०७१-५५०६१०
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-2 inline-block text-base leading-loose text-[#f3f4fe] hover:text-primary hover:underline"
                  >
                    इमेल: info.ocmcm@lumbini.gov.np
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center p-4 bg-[#1359a0]">
        <span className="text-white">© 2021 Copyright: </span>
        <a className="text-white font-semibold" href="#">
          {t("logo_title")}
        </a>
      </div>{" "}
    </footer>
  );
}
