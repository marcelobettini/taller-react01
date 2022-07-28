import React from "react";

const Filter = ({ filter_items, setFilter }) => {
  const handleFilter = (e) => {
    setFilter((prevState) => (prevState = e.target.value));
  };
  return (
    <div className="select">
      <select
        onChange={handleFilter}
        className="custom-select"
        aria-label="Filter countries by subregion"
      >
        <option value="">Todos</option>
        {filter_items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <span className="focus"></span>
    </div>
  );
};

export default Filter;
