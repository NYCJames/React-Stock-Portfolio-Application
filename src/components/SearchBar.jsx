import React, { useEffect, useState } from "react";
import FinnHub from "../apis/FinnHub";
import SearchReults from "./SearchReults";

function SearchBar() {
  const [query, setQuery] = useState(``);
  const [results, setResults] = useState([]);

  function renderSearchResults() {
    return results.length > 0 ? "show" : "";
  }

  function handleQueryChange(event) {
    // console.log(event.currentTarget.value);
    setQuery(event.target.value);
  }

  useEffect(
    function () {
      let isMounted = true;

      async function fetchResults() {
        try {
          if (!query) {
            // console.log(`no query`);

            setResults([]);
            // console.log(!results);
            return;
          }

          const response = await FinnHub.get(`/search`, {
            params: {
              q: query,
            },
          });

          //   console.log(response.data.result);

          if (!isMounted) {
            return;
          }
          setResults(response.data.result);
          //   console.log(results);
        } catch (error) {
          console.log(error);
        }
      }

      fetchResults();

      return function () {
        isMounted = false;
      };
    },
    [query]
  );

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
        <ul
          className={`dropdown-menu ${renderSearchResults()}`}
          style={{
            height: `500px`,
            overflowY: `scroll`,
            overflowX: `hide`,
            cursor: `pointer`,
          }}
        >
          {results.map(function (value) {
            return (
              <SearchReults
                key={value.symbol}
                name={value.description}
                symbol={value.symbol}
                setQuery={setQuery}
              ></SearchReults>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
