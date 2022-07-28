import React from "react";

const Search = ({ setQuery }) => {
  const handleQuery = (e) => setQuery(e.target.value);
  return (
    <form className="search-wrapper">
      <label htmlFor="search-form">
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          placeholder="Search for..."
          onChange={handleQuery}
        />
      </label>
    </form>
  );
};

export default Search;
