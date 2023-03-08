import React, { useState } from "react";

const SearchTable = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <input
      type="text"
      className="form-control border-gray-300 focus:text-gray-700  focus:border-indigo-200 focus:ring-indigo-200"
      style={{ width: "240px" }}
      placeholder="यहाँ खोज्नुहोस्"
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
};

export default SearchTable;
