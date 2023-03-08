import React, { useState, useEffect } from "react";
import { useStateValue } from "../../utils/StateProvider";

function Card({
  defaultOpen,
  icon,
  padding,
  title,
  children,
  grid,
  ...otherProps
}) {
  const [{ size }] = useStateValue();
  const [toggle, setToggle] = useState(false);
  defaultOpen = true;
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
  useEffect(() => {
    if (defaultOpen) {
      setToggle(false);
    } else if (icon === "true") {
      setToggle(true);
    }
  }, []);
  return (
    <div className="container mx-auto" {...otherProps}>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        {title && (
          <div
            className={
              style.resizableFont +
              ` flex justify-between pl-3 py-4 bg-blue-100 block font-base font-bold capitalize${
                icon && " cursor-pointer"
              }`
            }
            onClick={() => icon && setToggle(!toggle)}
          >
            {title}
            {icon && (
              <div className="mr-4">
                <a>
                  <svg
                    className={
                      toggle
                        ? "svg-circleplus h-[2rem] stroke-[#000]"
                        : "rotate-[130deg] svg-circleplus h-[2rem] stroke-[#000]"
                    }
                    viewBox="0 0 100 100"
                  >
                    <line
                      x1="32.5"
                      y1="50"
                      x2="67.5"
                      y2="50"
                      strokeWidth="5"
                    ></line>
                    <line
                      x1="50"
                      y1="32.5"
                      x2="50"
                      y2="67.5"
                      strokeWidth="5"
                    ></line>
                  </svg>
                </a>
              </div>
            )}
          </div>
        )}

        <div
          className={
            toggle
              ? "px-3 py-3 bg-white border-b border-gray-200 hidden"
              : padding === "true"
              ? "bg-white border-b border-gray-200"
              : "px-3 py-3 bg-white border-b border-gray-200"
          }
        >
          {/* Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;
