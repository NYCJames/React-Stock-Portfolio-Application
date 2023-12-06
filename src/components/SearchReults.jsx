import React from "react";
import useGlobalContext from "../Context";

function SearchReults({ name, symbol, setQuery }) {
  const { stockList, addToStockList } = useGlobalContext();

  function handleSelectStock() {
    // console.log(event.target.id);

    // addToStockList(event.target.id);
    addToStockList(symbol);
    // console.log(stockList);

    setQuery(``);
  }

  return (
    <li id={symbol} className="dropdown-item" onClick={handleSelectStock}>
      {name} ({symbol})
    </li>
  );
}

export default SearchReults;
