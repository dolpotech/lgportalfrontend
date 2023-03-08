import React from "react";

export default function MapCard(props) {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
        {props.icon}
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {props.title}
        </p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {props.number}
        </p>
      </div>
    </div>
  );
}
