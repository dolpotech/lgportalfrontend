import React, { useState, useEffect } from "react";
import { useStateValue } from "../../utils/StateProvider";

const HeaderTable = ({ headers, onSorting, isOld }) => {
  const [{ size }] = useStateValue();
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const style = {
    resizableFont: `${
      size == 1 || size === null
        ? " text-xs"
        : size == 2
        ? " text-sm"
        : size == 3
        ? " text-base"
        : size == 4
        ? " text-lg"
        : " text-xl"
    }`,
  };

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };
  let today = new Date();
  today = today.getDate();
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {headers.map(({ name, field, sortable, day, i }) => (
          <th
            key={i++}
            onClick={() => (sortable ? onSortingChange(field) : null)}
            className={
              isOld || day <= today
                ? `active-col px-6 py-3 ${style.resizableFont}`
                : `px-6 py-3 ${style.resizableFont}`
            }
            scope="col"
          >
            {name}

            {sortingField &&
              sortingField === field && {
                ...(sortingOrder === "asc" ? "arrow-down" : "arrow-up"),
              }}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default HeaderTable;
