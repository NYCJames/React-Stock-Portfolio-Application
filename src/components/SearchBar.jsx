import React, { useEffect, useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState(``);

  function handleQueryChange(event) {
    // console.log(event.currentTarget.value);
    setQuery(event.target.value);
  }

  useEffect(function () {}, [query]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          className="form-control"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="Search"
          style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
          value={query}
          onChange={handleQueryChange}
        ></input>
        <label htmlFor="search">Search</label>
        <ul className="dropdown-menu">
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
