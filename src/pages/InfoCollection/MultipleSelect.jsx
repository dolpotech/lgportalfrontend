import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

export default function MultipleSelect({ options }) {
  const [data, setData] = useState("LG");
  const onSelect = (selectedList, selectedItem) => {
    setData(selectedList);
    console.log(data);
  };
  return (
    <Multiselect
      onSelect={onSelect}
      options={options} // Options to display in the dropdown
      displayValue="name" // Property name to display in the dropdown options
    />
  );
}
