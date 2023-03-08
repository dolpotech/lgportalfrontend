import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";
import { useTranslation } from "react-i18next";

export default function CategoryCard(props) {
  const { t } = useTranslation();
  const [{ size }] = useStateValue();
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
  return (
    <div className="relative group bg-white divide-x divide-y transition hover:z-[1] hover:shadow-lg">
      <Link to={`/advance_search?category=${props.data.category}`}>
        <div className="relative p-8 space-y-8 grid grid-cols-6">
          <div className="space-y-2 col-span-4">
            <p
              className={
                style.resizableFont + " text-gray-700 font-bold truncate"
              }
            >
              {" "}
              {props.data.title}{" "}
            </p>
            <p className={style.resizableFont + " text-gray-500 mt-4"}>
              {props.data.desc}
            </p>
            <a className="flex justify-between w-max items-center group-hover:text-[#2571bb]">
              <span className={style.resizableFont}>{t("go_to_category")}</span>
              <span className="-translate-x-4 opacity-0 text-xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                →
              </span>
            </a>
          </div>
          <div className="col-span-2 h-max w-full p-4 rounded-xl bg-blue-100 text-blue-500">
            <img
              className="w-20"
              src={props.data.image}
              alt={props.data.title}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
